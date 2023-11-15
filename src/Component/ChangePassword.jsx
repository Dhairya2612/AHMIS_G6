import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ForgotPassword/Fpass.css";
import sha256 from "js-sha256";

const Tesseract = require("tesseract.js");

function ChangePassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [oldPassword, setOldPassword] = useState("");
  const [Password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaImageUrl, setCaptchaImageUrl] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);


  const fetchCaptchaImage = () => {
    axios
      .get("http://localhost:8082/auth/captcha-image", { responseType: "blob" })
      .then((response) => {
        if (response.status === 200) {
          const reader = new FileReader();
          reader.onload = function () {
            const captchaImage = reader.result;
            Tesseract.recognize(captchaImage, "eng").then(
              ({ data: { text } }) => {
                sessionStorage.setItem("captchaText", text);
                setCaptchaValue(text);

                const url = URL.createObjectURL(
                  new Blob([captchaImage], { type: "image/jpeg" })
                );
                setCaptchaImageUrl(url);
              }
            );
          };
          reader.readAsArrayBuffer(response.data);
        } else {
          throw new Error("Failed to retrieve captcha image");
        }
      })
      .catch((error) => {
        console.error("Error fetching CAPTCHA image:", error);
      });
  };

  useEffect(() => {
    fetchCaptchaImage();
  }, []);

  const handleOldPasswordSubmit = () => {
    const hashedPassword = sha256(oldPassword);
    alert("hashedPassword =>"+hashedPassword)
    
    axios.post("http://localhost:8082/auth/verifyoldpassword", { hashedPassword })
      .then((response) => {
        if (response.status === 200) {
          console.log("verifyoldpassword"+response.data);
          alert("verifyoldpassword"+response.data);
         
          setCurrentStep(2);
        } else {

          setError("Old password is incorrect.");
        }
      })
      .catch((error) => {
        console.error("Error verifying old password:", error);
        
      });
  };
  
  const handlePasswordUpdate = () => {
    if (Password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
   
    const hashedPassword = sha256(Password);
  
    axios
      .post("http://localhost:8082/auth/updatepassword", { hashedPassword })
      .then((response) => {
        if (response.status === 200) {
          setPasswordChangeSuccess(true); // Set success state to true
           setError(""); // Clear any previous error
        } else {
          setError("Failed to update the password.");
        }
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        // Handle the error here
      });
  };
  
  return (
    <div id="forgot-password-container">
   
      <div className="forgot-password-form" style={{ marginTop: "-25px", border:'1px solid green' }}>
        <h2 style={{textAlign:'left', marginTop:'-50px'}} className="fs-title">Change Password</h2>
         <br/>
        {currentStep === 1 && (
          <div className="forgot-password-step"  >
            <div style={{textAlign:'center'}}>
            <label htmlFor="">
              <h4 style={{marginLeft:'-220px' ,fontWeight: "500" }}>
                Old Password<span style={{ color: "red" }}>*</span>
              </h4>
            </label>

            <input
            style={{width:'25%'}}
              type="password"
              placeholder="Old Password"
              className="forgot-password-input"
              value={oldPassword}
              minLength={8}
              maxLength={15}
              title="Right here your old password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            </div>
            <button
              onClick={handleOldPasswordSubmit}
              className="forgot-password-button"
            >
              Verify{" "}
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <>
           <div   style={{ display: "flex", justifyContent:'center',gap:'50px' ,width:'50%',marginRight:'25%',marginLeft:'25%'}}>
            <div className="forgot-password-step">
              <label htmlFor="">
                <h4 style={{ textAlign: "left", fontWeight: "500" }}>
                  New Password<span style={{ color: "red" }}>*</span>
                </h4>
              </label>
              <input
                style={{ display: "flex", maxWidth:'100%'}}
                type="password"
                placeholder=" Enter new password"
                minLength={8}
                maxLength={15}
                
                className="forgot-password-input"
                value={Password}
                title="Minimum 8 characters 1 upper case 1 lower case 1 digit and 1 special character"
                onChange={(e) => {
                  const sanitizedInput = e.target.value.replace(
                    /[^A-Za-z0-9@]/g,
                    ""
                  );
                  setNewPassword(sanitizedInput);
                }}
              />
              {Password.length > 0 && (
                <div style={{ color: "red" }}>
                  {Password.length < 8 &&
                    "Password should be at least 8 characters. "}
                  {!/[A-Z]/.test(Password) &&
                    "Must include at least one uppercase letter. "}
                  {!/[a-z]/.test(Password) &&
                    "Must include at least one lowercase letter. "}
                  {!/\d/.test(Password) && "Must include at least one digit. "}
                  {!/[!@#$%&*]/.test(Password) &&
                    "Must include at least one special character (!@#$%&*)."}
                </div>
              )}
            </div>
         
            <div className="forgot-password-step">
              <label htmlFor="">
                <h4 style={{ textAlign: "left", fontWeight: "500" }}>
                  Confirm Password<span style={{ color: "red" }}>*</span>
                </h4>
              </label>
              <input
                style={{ display: "flex", maxWidth:'100%'}}
                type="password"
                placeholder="Enter confirm password"
                minLength={8}
                maxLength={15}
                className="forgot-password-input"
                value={confirmPassword}
                title="Should be equal to new Password"
                onChange={(e) => {
                  const sanitizedInput = e.target.value.replace(
                    /[^A-Za-z0-9@#$%]/g,
                    ""
                  );
                  setConfirmPassword(sanitizedInput);
                }}
              />
              {Password !== confirmPassword ? (
                <div style={{ color: "red" }}>Passwords do not match.</div>
              ) : null}
            </div>
            </div>
            <div   style={{ display: "flex",justifyContent:'center',gap:'50px',width:'50%',marginRight:'25%',marginLeft:'25%' }}>
            <div className="forgot-password-step">
              <label htmlFor="">
                <h4 style={{ textAlign: "left", fontWeight: "500" }}>
                  Enter Captcha<span style={{ color: "red" }}>*</span>
                </h4>
              </label>
              <input
                type="text"
                placeholder="Enter captcha"
                className="forgot-password-input"
                value={captchaCode}
                name="captchaCode"
                required
                maxLength={5}
                onInput={(e) => {
                  const sanitizedInput = e.target.value.replace(
                    /[^A-Za-z0-9]/g,
                    ""
                  );
                  e.target.value = sanitizedInput;
                  setCaptchaCode(sanitizedInput);
                }}
                onChange={(e) => {
                  setCaptchaCode(e.target.value);
                  setCaptchaError(""); // Clear any previous error when input changes
                }}
              />
            </div>

            {captchaError && <p className="error-message">{captchaError}</p>}

            <div
              id="captcha"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                margin: "1rem",
                
              }}
            >
              <img
                src={captchaImageUrl}
                alt="Captcha"
                style={{
                  maxWidth: "65%",
                  height: "auto",
                  borderRadius: "11px",
                }}
              />
              <button
                onClick={fetchCaptchaImage}
                style={{
                  width:'3px',
                  color: "black",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "2rem",
                  marginInline: "2rem",
                  backgroundColor: "white",
                }}
              >
                <i className="fas fa-redo-alt"></i>
              </button>
            </div>
            </div>

            <div className="forgot-password-step">
              <button
                onClick={handlePasswordUpdate}
                className="forgot-password-button"
              >
                Update Password
              </button>
                {passwordChangeSuccess && (
                       <div className="success-message">Password changed successfully!</div>
                )}
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
