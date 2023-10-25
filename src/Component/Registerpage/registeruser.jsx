import React, { useState, useEffect } from "react";
import "./registerstyle.css";
import $ from "jquery";
import Select from "react-select"; // Import react-select
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import sha256 from 'js-sha256';
import axios from "axios";






const RegisterUser = () => {
  const [formData, setFormData] = useState({
    gstr_user_name: "",
    gnum_hospital_code: "",
    gstr_json_data: {

      full_name: "",
      mobile_no: "",
      emailID: "",
      designation: "",
      user_type: "",
      user_group: "",
      user_seat: "",
      entry_date:  new Date().toLocaleDateString(),
      gender_name: "",
      password: ""
    
    },
    gnum_userId: '10008',
    gstr_status: "0",
    
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleJsonDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gstr_json_data: {
        ...formData.gstr_json_data,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert gstr_json_data to a JSON string
    formData.gstr_json_data = JSON.stringify(formData.gstr_json_data);

    try {
      const response = await axios.post(
        "http://localhost:8080/home/saveusers",
        formData
      );
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  $(document).ready(function () {
    $("button").click(function () {
      $("#notifielement").show();
    });
  });

 

  const [timer, setTimer] = useState(60);

  const startTimer = () => {
    const interval = setInterval(() => {
      if (timer === 0) {
        clearInterval(interval); // Stop the timer when it reaches 0
      } else {
        setTimer(timer - 1);
      }
    }, 1000); // Update the timer every 1000ms (1 second)
  };

  const showResend = () => {
    toast.info(
      `OTP is valid for 1 min, You can click on resend or use email instead`,
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 60000,
      }
    );
  };

  const handleSendOtp = () => {
    // Add your OTP sending logic here.

    // Once OTP is sent, disable the phone input field.
    setPhoneInputDisabled(true);

    // Re-enable the phone input field after a minute (60000 milliseconds).
    setTimeout(() => {
      setPhoneInputDisabled(false);
    }, 60000);
  };

  const [phoneValue, setPhoneValue] = useState("");
  const [phoneInputDisabled, setPhoneInputDisabled] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleOtpChange = (e) => {
    const inputValue = e.target.value;
    setOtpValue(inputValue);
    // Enable the "Next" button if the OTP input is filled
    setIsButtonEnabled(inputValue.length > 0);
  };

  const showToastMessage = () => {
    toast.success(`OTP Sent on ${phoneValue}!`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showSuccessOTP = () => {
    toast.success(`OTP Verified Successfully`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showFailOTP = () => {
    toast.error(`Invalid OTP`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [genders, setGenders] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  


  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const hashedPassword = sha256(newPassword); // Hash the password
    setPassword(newPassword);

    setFormData((prevData) => ({
      ...prevData,
      gstr_json_data: {
        ...prevData.gstr_json_data,
        password: hashedPassword, // Store the hashed password
      },
    }));
    if (newPassword.length < 8) {
      setPasswordError("Password should be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };






  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Validate password match
    if (newConfirmPassword !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      var current_fs, next_fs, previous_fs;
      var left, opacity, scale;
      var animating;

      $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        $("#progressbar li")
          .eq($("fieldset").index(next_fs))
          .addClass("active");

        next_fs.show();
        current_fs.animate(
          { opacity: 0 },
          {
            step: function (now, mx) {
              scale = 1 - (1 - now) * 0.2;
              left = now * 50 + "%";
              opacity = 1 - now;
              current_fs.css({
                transform: "scale(" + scale + ")",
                position: "absolute",
              });
              next_fs.css({ left: left, opacity: opacity });
            },
            duration: 100,
            complete: function () {
              current_fs.hide();
              animating = false;
            },
          }
        );
      });

      $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        $("#progressbar li")
          .eq($("fieldset").index(current_fs))
          .removeClass("active");

        previous_fs.show();
        current_fs.animate(
          { opacity: 0 },
          {
            step: function (now, mx) {
              scale = 0.8 + (1 - now) * 0.2;
              left = (1 - now) * 50 + "%";
              opacity = 1 - now;
              current_fs.css({ left: left });
              previous_fs.css({
                transform: "scale(" + scale + ")",
                opacity: opacity,
              });
            },
            duration: 100,
            complete: function () {
              current_fs.hide();
              animating = false;
            },
          }
        );
      });

      $(".submit").click(function () {
        return false;
      });
    });

  //   fetch("http://localhost:8082/home/getgenders")
  //     .then((response) => response.json())
  //     .then((data) => setGenders(data));
  // }, []); 
});
  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className="themain">
        <div className="reguser">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <form id="msform" onSubmit={handleSubmit}>
                <ul id="progressbar">
                  <li className="active">Verify Yourself</li>
                  <li>Personal Details</li>
                  <li>Information</li>
                </ul>

                <fieldset>
                  <h2 className="fs-title">OTP Verification</h2>
                  <h3 className="fs-subtitle">Enter your phone number</h3>
                  <label htmlFor="phone" className="labelone">
                    Phone number
                  </label>
                  <input
                    type="text"
                    
                    placeholder="Phone No.*"
                    maxLength="10"
                    name="mobile_no"
                   
                    
                    
                    value={`${formData.gstr_json_data.mobile_no}`}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = inputValue.replace(/\D/g, "");
                      setPhoneValue(numericValue);
                      handleJsonDataChange(e);

                      // Check if the numeric value is 10 digits long
                      if (numericValue.length === 10) {
                        // Enable the "Send OTP" button
                        document
                          .getElementById("sendOtpButton")
                          .removeAttribute("disabled");
                      } else {
                        // Phone number is not 10 digits, disable the button
                        document
                          .getElementById("sendOtpButton")
                          .setAttribute("disabled", "disabled");
                      }
                    }}
                    disabled={phoneInputDisabled}
                  />
                  <button
                    id="sendOtpButton"
                    style={{
                      backgroundColor: "rgb(104, 85, 224)",
                      color: "white",
                      border: "none",
                      padding: "10px 10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                    disabled={!phoneValue}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission behavior
                      showToastMessage();
                      // Call the function to handle sending OTP
                      handleSendOtp();
                      showResend();

                      // Show the Resend and Use Email buttons, and disable them for 1 minute
                      document.getElementById("resendButton").style.display =
                        "inline-block";
                      document.getElementById("useEmailButton").style.display =
                        "inline-block";
                      document.getElementById("sendOtpButton").style.display =
                        "none";

                      document
                        .getElementById("resendButton")
                        .setAttribute("disabled", "disabled");
                      document
                        .getElementById("useEmailButton")
                        .setAttribute("disabled", "disabled");

                      setTimeout(() => {
                        // Re-enable the Resend and Use Email buttons after 1 minute
                        document
                          .getElementById("resendButton")
                          .removeAttribute("disabled");
                        document
                          .getElementById("useEmailButton")
                          .removeAttribute("disabled");
                      }, 60000); // 1 minute
                    }}
                  >
                    Get OTP
                  </button>
                  <ToastContainer />
                  <button
                    id="resendButton"
                    style={{
                      backgroundColor: "rgb(104, 85, 224)",
                      color: "white",
                      border: "none",
                      padding: "10px 10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      display: "none",
                    }}
                    className={phoneInputDisabled ? "disabled-button" : ""}
                    onClick={() => {
                      // Handle the Resend button click
                    }}
                  >
                    Resend
                  </button>
                  &nbsp;&nbsp;
                  <button
                    id="useEmailButton"
                    style={{
                      backgroundColor: "rgb(104, 85, 224)",
                      color: "white",
                      border: "none",
                      padding: "10px 10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      display: "none",
                    }}
                    className={phoneInputDisabled ? "disabled-button" : ""}
                    onClick={() => {
                      // Handle the Use Email button click
                    }}
                  >
                    Use Email
                  </button>
                  <p
                    style={{ color: "#32de84", fontSize: "1.3rem" }}
                    id="notifielement"
                    hidden
                  >
                    OTP is valid for 1 minute
                  </p>
                  <br />
                  <label htmlFor="otp" className="labelone">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP*"
                    value={otpValue}
                    onChange={(e) => {
                      setOtpValue(e.target.value);
                    }}
                  />
                  <input
                    type="button"
                    name="next"
                    className="next action-button"
                    value="Next"
                    disabled={!otpValue}
                    style={{ opacity: otpValue ? "1.0" : "0.6" }}
                  />
                  <ToastContainer />
                </fieldset>

                <fieldset>
                  <h2 className="fs-title">Personal Details</h2>
                  <h3 className="fs-subtitle">Fill the data accurately</h3>
                  <br />
                  <label htmlFor="fname" className="labeltwo">
                    Full Name{" "}
                  </label>
                  <div style={{ display: "flex" }}>
                    {" "}
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter Full name* "
                      value={formData.gstr_json_data.full_name}
                      onChange={handleJsonDataChange}
                    />
                    <br />{" "}
                  </div>

                  <label htmlFor="designation" className="labeltwo">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Enter Designation"
                    value={formData.gstr_json_data.designation}
                    onChange={handleJsonDataChange}
                  />
                  {/* <Select
                placeholder="Designation"
                name="designation"
                options={[
                  { value: "one", label: "one" },
                  { value: "two", label: "two" },
                  { value: "three", label: "three" },
                  { value: "four", label: "four" },
                ]}
              /> */}

                  <label htmlFor="gender" className="labeltwo">
                    Gender
                  </label>
                  <Select
                    value={formData.gstr_json_data.gender_name}
                    onChange={handleJsonDataChange}
                    placeholder="Select Gender*"
                    name="gender_name"
                    options={genders.map((gender) => ({
                      value: gender.gender,
                      label: gender.gender,
                    }))}
                  />
                  <br/>

                  {/* <input
                  type="button"
                  name="previous"
                  className="previous action-button-previous"
                  value="Previous"
                /> */}
                  <input
                    type="button"
                    name="next"
                    className="next action-button"
                    value="Next"
                  />
                </fieldset>
                 
                
                <fieldset  className="fieldthree" style={{marginLeft:'-2rem'}}>
                  <h2 className="fs-title">Account Information</h2>
                  <div className="labelone">
                  <label htmlFor="">User Type</label>
                  
                  
                  </div>
                  <div className="layerone"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Select
                      className="spselect"
                      placeholder=" Select User Type*"
                      value={formData.gstr_json_data.user_type}
                      onChange={handleJsonDataChange}
                      name="user_type"
                      options={[
                        { value: "Hospital", label: "Hospital" },
                        { value: "State", label: "State" },
                      ]}
                    />
                   
                    <br/> 
                 
                    <Select
                      className="spselect"
                      placeholder="Hospital Code*"
                      value={formData.gnum_hospital_code}
                      onChange={handleChange}
                      name="gnum_hospital_code"
                      options={[
                        { value: "Hospital", label: "Hospital" },
                        { value: "State", label: "State" },
                      ]}
                    />
                    
                  </div>
                  <br />
                  <div className="labeltwo">
                  <label htmlFor="">User Group</label>
                  </div>
                  <div className="layertwo">
                  <Select
                  className="spselect"
                    name="user_group"
                    placeholder="Select User Group*"
                    value={formData.gstr_json_data.user_group}
                    onChange={handleJsonDataChange}
                    options={[
                      { value: "Hospital", label: "Hospital" },
                      { value: "State", label: "State" },
                    ]}
                  />
                  <br />
                
                  <Select
                  className="spselect"
                    placeholder="Select User Seat*"
                    name="user_seat"
                    value={formData.gstr_json_data.user_seat}
                    onChange={handleJsonDataChange}
                    options={[
                      { value: "Hospital", label: "Hospital" },
                      { value: "State", label: "State" },
                    ]}
                  />
                  </div>
                  <br/> <br/>
                  <label htmlFor="fname" className="labelthree">UserID
                  </label>
                  <input
  type="text"
  name="gstr_user_name"
  placeholder="Enter UserID (avoid space)*"
  value={formData.gstr_user_name}
  onChange={(e) => {
    const inputValue = e.target.value;
    // Remove spaces from the input value
    const sanitizedValue = inputValue.replace(/\s/g, "");
    setFormData({
      ...formData,
      gstr_user_name: sanitizedValue,
    });
  }}
/>
                  <label htmlFor="password" className="labelthree">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (Length should be longer than 8 characters)*"
                    value={formData.gstr_json_data.password}
                    onChange={(e) => {
                      handleJsonDataChange(e);
                      handlePasswordChange(e);
                    }}
                  />
                  <label htmlFor="confirmpass" className="labelthree">
                    Confirm
                  </label>
                  <input
                    type="password"
                    name="confirmpass"
                    placeholder="Confirm Password*"
                    
                    onChange={handleConfirmPasswordChange}
                  />
                  {passwordError && (
                    <p style={{ color: "red" }}>{passwordError}</p>
                  )}
                  <input
                    type="button"
                    name="previous"
                    className="previous action-button-previous"
                    value="Previous"
                  />
                   <button type="submit"  className="submitbutton" onClick={handleRefreshClick}>Save Data</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
