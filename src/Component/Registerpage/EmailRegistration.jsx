//PROGRAMMED BY DHAIRYA NIKAM
//REGISTRATION OF NEW USER WITH VALIDATIONS
//CONSIST OF THREE FIELDSETS
//LAST EDIT 30-10-2023

import React, { useState, useEffect } from "react";
import "./registerstyle.css";
import $ from "jquery";
import Select from "react-select"; // Import react-select dont remove
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

import sha512 from "js-sha512";
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
      entry_date: new Date().toLocaleDateString(),
      gender_name: "",
      password: "",
    },
    gnum_userId: "10008",
    gstr_status: "0",
  });

  //OTP HANDLING AND VALIDATION
  const [buttonClicked, setButtonClicked] = useState(false);

  // const [mobileNumber, setMobileNumber] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [validationResult, setValidationResult] = useState("");

 

 

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

  const [mobileNumber, setMobileNumber] = useState("");
  const [result, setResult] = useState("");

  //fetching data in async way, passing mobileNumber as an arguement
  const checkMobileNumber = async (mobileNumber) => {
    try {
      const response = await fetch(
        `http://localhost:8082/home/checkMobile?mobileNumber=${mobileNumber}`
      );
      const data = await response.json();
      //logic for disabling or enabling next button
      if (data) {
        document.getElementById("sendOtpButton").disabled = true;
        document.getElementById("sendOtpButton").style.opacity = 0.6;
        document.getElementById("otpinput").disabled = true;
        setResult(
          <p style={{ color: "red" }}>
            Mobile number {mobileNumber} is already registered.Request is not
            approved yet by admin
          </p>
        );
      } else {
        document.getElementById("sendOtpButton").disabled = false;
        document.getElementById("sendOtpButton").style.opacity = 1;
        document.getElementById("otpinput").disabled = false;
        setResult(
        <p id="Mobavail">Mobile number {mobileNumber} is available for registration✅</p>  
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //This code is used to check the avaibality of the ph number as soon as the textbox matches the 10 digit criteria
 

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8082/data/getgenders")
      .then((response) => response.json())
      .then((data) => {
        setGenders(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, []);

  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8082/data/gethospitals")
      .then((response) => response.json())
      .then((data) => {
        setHospitals(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, []);

  const [userseat, setSeats] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8082/data/getseats")
      .then((response) => response.json())
      .then((data) => {
        setSeats(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, []);

  const [usergroup, setGroup] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8082/data/getgroups")
      .then((response) => response.json())
      .then((data) => {
        setGroup(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      formData.gstr_user_name.trim() === "" ||
      formData.gnum_hospital_code.trim() === "" ||
      formData.gstr_json_data.full_name.trim() === "" ||
      formData.gstr_json_data.designation.trim() === "" ||
      formData.gstr_json_data.user_type.trim() === "" ||
      formData.gstr_json_data.user_group.trim() === "" ||
      formData.gstr_json_data.user_seat.trim() === "" ||
      formData.gstr_json_data.gender_name.trim() === "" ||
      formData.gstr_json_data.password.trim().length < 8 ||
      (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[!@#$%&*]/.test(password) ||
        password !== confirmPassword)
    ) {
      // Display an error message or handle the invalid form data
      console.error("Form data is invalid");
    } else {
      // Convert gstr_json_data to a JSON string
      formData.gstr_json_data = JSON.stringify(formData.gstr_json_data);
  
      try {
        const response = await axios.post(
          "http://localhost:8082/home/saveusers",
          formData
        );
        console.log("Data saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving data:", error);
      }
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

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [passwordError, setPasswordError] = useState("");
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

  const showToastMessageResend = () => {
    toast.success(`OTP resent on ${phoneValue}!`, {
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
  const handleJsonDataHospital = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gnum_hospital_code: {
        ...formData.gnum_hospital_code,
        [name]: value,
      },
    });
  };

  const handleHospitalCombinedChange = (selectedOption) => {
    handleChange(selectedOption);
  };

  const handleJsonDataChangeSeat = (e) => {
    // Unique handler for gender
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gstr_json_data: {
        ...formData.gstr_json_data,
        [name]: value,
      },
    });
  };

  const handleJsonDataGroupSeat = (e) => {
    // Unique handler for gender
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gstr_json_data: {
        ...formData.gstr_json_data,
        [name]: value,
      },
    });
  };

  const handleJsonDataChangeGender = (e) => {
    // Unique handler for gender
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gstr_json_data: {
        ...formData.gstr_json_data,
        [name]: value,
      },
    });
  };

  const handleCombinedChange = (selectedOption) => {
    // Call the individual handlers with the selected value
    handleJsonDataChange(selectedOption);
    handleJsonDataChangeGender(selectedOption);
  };

  const handleCombinedSeatChange = (selectedOption) => {
    handleJsonDataChange(selectedOption);
    handleJsonDataChangeSeat(selectedOption);
  };
  const handleCombinedGroupChange = (selectedOption) => {
    handleJsonDataChange(selectedOption);
    handleJsonDataGroupSeat(selectedOption);
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const username = document.getElementsByName("gstr_user_name")[0].value; // Get the username
    const concatenatedValue = newPassword + username;
    const hashedPassword = sha512(concatenatedValue); // Hash the password along with the username
    setPassword(newPassword); // Update the visible password value
  
    setIsPasswordValid(
      newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[a-z]/.test(newPassword) &&
        /\d/.test(newPassword) &&
        /[!@#$%&*]/.test(newPassword)
    );
  
    setFormData((prevData) => ({
      ...prevData,
      gstr_json_data: {
        ...prevData.gstr_json_data,
        password: hashedPassword, // Store the hashed password
      },
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const handleFocus = (event) => {
    // Change input type to "text" on focus to make text visible
    event.target.setAttribute("type", "password");
  };

  const handleBlur = (event) => {
    // Change input type back to "password" on blur
    event.target.setAttribute("type", "password");
  };

  useEffect(() => {
    $(document).ready(function () {
      $(".next").click(function () {
        var current_fs = $(this).parent();
        var next_fs = $(this).parent().next();

        $("#progressbar li")
          .eq($("fieldset").index(next_fs))
          .addClass("active");

        next_fs.show();
        current_fs.hide();
      });

      $(".previous").click(function () {
        var current_fs = $(this).parent();
        var previous_fs = $(this).parent().prev();

        $("#progressbar li")
          .eq($("fieldset").index(current_fs))
          .removeClass("active");

        previous_fs.show();
        current_fs.hide();
      });

      $(".submit").click(function () {
        return false;
      });
    });
  });

  const handleRefreshClick = () => {
   

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const [username, setUsername] = useState('');
  const [exists, setExists] = useState(null);

  
  const checkUsername = async () => {
    const response = await fetch(`http://localhost:8082/home/checkUsername?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      setExists(data);
    } else {
      console.error('Error checking username');
    }
  };

  
  const isSaveButtonDisabled =
    formData.gstr_user_name.trim() === "" ||
    formData.gnum_hospital_code.trim() === "" ||
    formData.gstr_json_data.full_name.trim() === "" ||
    formData.gstr_json_data.designation.trim() === "" ||
    formData.gstr_json_data.user_type.trim() === "" ||
    formData.gstr_json_data.user_group.trim() === "" ||
    formData.gstr_json_data.user_seat.trim() === "" ||
    formData.gstr_json_data.gender_name.trim() === "" ||
    formData.gstr_json_data.password.trim() < 8 ||
    (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%&*]/.test(password)) || 
    password !== confirmPassword ;

 function enableCheckOtpButton() {
  const checkOtpButton = document.getElementById("check_otp");
  checkOtpButton.disabled = false;
}

// function hideFunc() {
//   document.getElementById("Mobavail").style.display = "none";

//  document.getElementById("hidepara").style.display = "unset";
  
// }

function hideparagraph() {
    // document.getElementById("Mobavail").style.display = "none";
  
   document.getElementById("hidepara").style.display = "unset";
    
  
  }

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const handleClickTimer= () => {
    setCountdown(60);
  };

  const handleClickTimerResend= () => {
    setCountdown(60);
  };


  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleSendMailOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8082/send-mail', { email });
      console.log(response.data);
      alert('OTP sent successfully to your email address.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again later.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      console.log('Request data:', { email, otp });
      const response = await axios.post('http://localhost:8082/verify-otp', { email, otp });

      console.log(response.data);
      setVerificationStatus(response.data);
      setTimeout(() => {
        const nextButton = document.getElementById('nextbut');
        if (nextButton && response.data === 'OTP verification successful') {
          nextButton.click();
        }
      }, 1000);
      toast('OTP Varified Succesfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  
  const handleEmailChange = (e) => {
    const updatedFormData = {
      ...formData,
      gstr_json_data: {
        ...formData.gstr_json_data,
        emailID: e.target.value,
      },
    };
    setFormData(updatedFormData);
    setEmail(e.target.value);
  };


  





  return (
    <>
      <div className="themain" >
        <div className="reguser" >
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <form id="msform"  onSubmit={handleSubmit}>
                <ul id="progressbar">
                  <li className="active">Verify Yourself</li>
                  <li>Personal Details</li>
                  <li>Information</li>
                </ul>

                <fieldset>
                  <h2 className="fs-title">OTP Verification</h2>
                  <h3 className="fs-subtitle">Enter your Email ID</h3>
                  <label htmlFor="phone" className="labelone">
                   <b>Email ID</b> 
                  </label>
                  <div style={{ display: "flex" }}>
                    <input
                      type="email"
                      placeholder="Email ID*"
                      maxLength={64}
                      name="emailID"
                      autocomplete="off"
                   
                      value={email} 
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleEmailChange(e);
                      }}


                        //  onChange={(e) => { setEmail(e.target.value)
                        //   handleEmailChange()
                        //    }}

                    />

{/* {email && (
        <>
        <br/><br/>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          {verificationStatus && <div>{verificationStatus}</div>}
        </>
      )} */}


                    {/* <button onClick={checkMobileNumber} style={{height:'4.5rem',width:'5rem',marginInline:'10px',borderRadius:'10px',backgroundColor:'rgba(104, 85, 224, 1)',cursor:'pointer',color:'white'}}><i class="fa-solid fa-magnifying-glass"></i></button>  */}
                  </div>
                  <p style={{ margin: "1rem" }}>{result}</p>
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
                   
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission behavior
                      showToastMessage();
                      // Call the function to handle sending OTP
                      handleSendOtp();
                      showResend();
                      
                  
                      hideparagraph();
                      
                      handleClickTimer();
                     
                    handleSendMailOtp();
                    

                    
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
                      }, 60000); // 1 minute timer dont change
                    }}
                  >
                    Get OTP
                  </button>
                  {generatedOTP && (
                    <div>{/* <p>Generated OTP: {generatedOTP}</p> */}</div>
                  )}

<div>
      {countdown === 0 ? (
        <p></p>
      ) : (
        <p id="hidepara" style={{display:'none'}}>OTP will expire in {countdown} seconds</p>
      )}
    </div>
                  <ToastContainer />
                <div style={{display:'flex', marginInline:'13.4rem'}}> <button
                    id="resendButton"
                    style={{
                      backgroundColor: "rgb(104, 85, 224)",
                      color: "white",
                      border: "none",
                      padding: "10px 10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      display: "none",
                      cursor: "pointer",
                    }}
                    className={phoneInputDisabled ? "disabled-button" : ""}
                    onClick={() => {
                      
                      showToastMessageResend();
                      handleClickTimerResend();
                      handleSendMailOtp();
                    }}
                  >
                    Resend
                  </button>
                  &nbsp;&nbsp;
                  <Link to='/registeruser'>
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
                      cursor:'pointer'
                    }}
                    className={phoneInputDisabled ? "disabled-button" : ""}
                    onClick={() => {
                      
                    }}
                  >
                  Use Phone
                  </button></Link>  </div> 
                  <br />
                  <label htmlFor="otp" className="labelone">
                   <b>Enter OTP</b> 
                  </label>
                  
                  <input
                    id="otpinput"
                    type="text"
                    name="otp"
                    maxLength={6}
                    placeholder="Enter OTP*"
                    value={otp}
                    
                    onClick={enableCheckOtpButton}
                    onChange={(e) => {
                      
                      const numericValue = e.target.value.replace(/\D/g, "");

                      // Update the state with the numeric value
                      setOtpValue(numericValue);
                      
                      setOtp(e.target.value);
                     
                      
                    }}
                  />
                  <input
                  id="check_otp"
                    type="button"
                    name="Check OTP"
                    value="Verify And Continue"
                   
                    style={{
                      opacity: otpValue ? "1.0" : "0.6",
                      cursor: "pointer",
                      backgroundColor: "#5856d6",
                      color: "white",
                    }}
                    onClick={          
                        handleVerifyOtp}
                  />

{email && (
        <>
        <br/><br/> 
          {verificationStatus && <div> <p style={{fontSize:'15px'}}> {verificationStatus}  <i
                            style={{ color: "#32cd32" }}
                            class="fas fa-check-circle"
                          ></i> <i class="fa-solid fa-spinner fa-spin-pulse"></i> </p></div>}
        </>
      )}


               
                  <input
                    id="nextbut"
                    type="button"
                    name="next"
                    className="next action-button"
                    value="Next"
                    disabled={ verificationStatus !== "OTP verification successful"}
                    style={{ opacity: otpValue ? "1.0" : "0.6" , display:'none'}}
                  />
                  <p id="iderror" style={{ color: "red" }}></p>
                  <ToastContainer />
                </fieldset>

                <fieldset>
                  <h2 className="fs-title">Personal Details</h2>
                  <h3 className="fs-subtitle">Fill the data accurately</h3>
                  <br />
                  <label htmlFor="fname" className="labeltwo">
                    <b>Full Name</b>
                  </label>
                  <div style={{ display: "flex" }}>
                    {" "}
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter Full name* "
                      maxLength={100}
                  
                      value={formData.gstr_json_data.full_name}
                      onChange={(e) => {
                        handleJsonDataChange(e);
                        const inputValue = e.target.value;
                        // Remove spaces and special characters using a regular expression
                        const sanitizedValue = inputValue.replace(
                          /[^a-zA-Z0-9_ .]/g,
                          ""
                        );
                        setFormData({
                          ...formData,
                          gstr_json_data: {
                            ...formData.gstr_json_data,
                            full_name: sanitizedValue,
                          },
                        });
                      }}
                    />
                    <br />{" "}
                  </div>

                  <label htmlFor="designation" className="labeltwo">
                   <b>Designation</b> 
                  </label>
                  <input
                    maxLength={50}
                    minLength={2}
                    type="text"
                    name="designation"
                    placeholder="Enter Designation"
                   
                    value={formData.gstr_json_data.designation}
                    onChange={(e) => {
                      handleJsonDataChange(e);
                      const inputValue = e.target.value;
                      // Remove spaces and special characters using a regular expression
                      const sanitizedValue = inputValue.replace(
                        /[^a-zA-Z0-9_ .]/g,
                        ""
                      );
                      setFormData({
                        ...formData,
                        gstr_json_data: {
                          ...formData.gstr_json_data,
                          designation: sanitizedValue,
                        },
                      });
                    }}
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
                   <b>Gender</b> 
                  </label>
                  <select
                    style={{
                      width: "100%",
                      height: "5rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      color: "grey"
                     
                    }}
                    name="gender_name"
                    value={formData.gstr_json_data.gender_name}
                    onChange={handleCombinedChange}
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gender) => (
                      <option
                        key={gender.gstr_gender_name}
                        value={gender.gstr_gender_name}
                      >
                        {gender.gstr_gender_name}
                      </option>
                    ))}
                  </select>

                  {/* <Select
  value={formData.gstr_json_data.gender_name}
  onChange={handleCombinedChange}
  placeholder="Select Gender*"
  name="gender_name"
  options={genders.map((gender) => ({
    value: gender.gender,
    label: gender.gender,
  }))}
/> */}

{/* <Select
placeholder="Select Gender"
  defaultValue={{
    value: formData.gstr_json_data.gender_name,
    label: formData.gstr_json_data.gender_name
  }}
  onChange={(selectedOption) => {
    handleCombinedChange({
      target: {
        name: 'gender_name',
        value: selectedOption.value,
      },
    });
  }}
  
  name="gender_name"
  options={genders.map((gender) => ({
    value: gender.gstr_gender_name,
    label: gender.gstr_gender_name,
  }))}
/> */}
                  <br />

                  {/* <input
                  type="button"
                  name="previous"
                  className="previous action-button-previous"
                  value="Previous"
                /> */}
                  <input
                  id="nextbuttwo"
                    type="button"
                    name="next"
                    className="next action-button"
                    value="Next"
                  />
                </fieldset>

                <fieldset
                  className="fieldthree"
                  style={{ marginLeft: "-2rem" }}
                >
                  <h2 className="fs-title">Account Information</h2>
                  <div className="labelone">
                    <label htmlFor=""><b>User Type</b></label>
                  </div>
                  <div
                    className="layerone"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <select
                     
                      style={{
                        width: "40%",
                        height: "5rem",
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        color: "grey",
                      }}
                      name="user_type"
                      value={formData.gstr_json_data.user_type}
                      onChange={handleJsonDataChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Hospital Type">Hospital</option>
                      <option value="State Type">State</option>
                    </select>

                    {/* <Select
                      className="spselect"
                      placeholder=" Select User Type*"
                      value={formData.gstr_json_data.user_type}
                      onChange={handleJsonDataChange}
                      name="user_type"
                      options={[
                        { value: "Hospital", label: "Hospital" },
                        { value: "State", label: "State" },
                      ]}
                    /> */}

                    <br />
                   
                  <div className="labelright">
                    <label htmlFor="" ><b>Hospital</b></label>
               </div>
                    <select
                      
                      style={{
                        width: "40%",
                        height: "5rem",
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        color: "grey",
                      }}
                      name="gnum_hospital_code"
                      value={formData.gnum_hospital_code}
                      onChange={handleHospitalCombinedChange}
                    >
                      <option value="">Select Hospital</option>
                      {hospitals.map((hospital) => (
                        <option
                          key={hospital.gnum_hospital_code}
                          value={hospital.gnum_hospital_code}
                        >
                          {hospital.gstr_hospital_name}
                        </option>
                      ))}
                    </select>

                    {/* <Select
                      className="spselect"
                      placeholder="Hospital Code*"
                      value={formData.gnum_hospital_code}
                      onChange={handleChange}
                      name="gnum_hospital_code"
                      options={[
                        { value: "Hospital", label: "Hospital" },
                        { value: "State", label: "State" },
                      ]}
                    /> */}
                  </div>
                 
                  <br />
               
                  <div className="labeltwo">

                    <label htmlFor=""><b>User Group</b></label>
                  </div>
                  <div className="layertwo">
                    <select
                     
                      style={{
                        width: "40%",
                        height: "5rem",
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        color: "grey",
                      }}
                      name="user_group"
                      value={formData.gstr_json_data.user_group}
                      onChange={handleCombinedGroupChange}
                    >
                      <option value="">Select Your Group</option>
                      {usergroup.map((group) => (
                        <option
                          key={group.gstr_group_name}
                          value={group.gstr_group_name}
                        >
                          {group.gstr_group_name}
                        </option>
                      ))}
                    </select>

                    {/* <Select
                      className="spselect"
                      name="user_group"
                      placeholder="Select User Group*"
                      value={formData.gstr_json_data.user_group}
                      onChange={handleJsonDataChange}
                      options={[
                        { value: "Hospital", label: "Hospital" },
                        { value: "State", label: "State" },
                      ]}
                    /> */}
                    <br />
                    <div className="labelright">
                    <label htmlFor="" ><b>Seat</b></label>
               </div>
                    <select
                      
                      style={{
                        width: "40%",
                        height: "5rem",
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        color: "grey",
                      }}
                      name="user_seat"
                      value={formData.gstr_json_data.user_seat}
                      onChange={handleCombinedSeatChange}
                    >
                      <option value="">Select Seat</option>
                      {userseat.map((user) => (
                        <option
                          key={user.gstr_seat_description}
                          value={user.gstr_seat_description}
                        >
                          {user.gstr_seat_description}
                        </option>
                      ))}
                    </select>

                    {/* <Select
                      className="spselect"
                      placeholder="Select User Seat*"
                      name="user_seat"
                      value={formData.gstr_json_data.user_seat}
                      onChange={handleJsonDataChange}
                      options={[
                        { value: "Hospital", label: "Hospital" },
                        { value: "State", label: "State" },
                      ]}
                    /> */}
                  </div>
                  <br /> <br />
                  <label htmlFor="fname" className="labelthree">
                    <b>UserID</b>
                  </label>
                  
                  <div style={{display:'flex'}}>
                  
                  <input
                    minLength={4}
                    maxLength={20}
                  
                    type="text"
                    name="gstr_user_name"
                    placeholder="Enter UserID (avoid space)*"
                    value={formData.gstr_user_name}
                    
                    onChange={(e) => {
                      const inputValue = e.target.value;
                     
                      // Remove spaces and special characters using a regular expression
                      const sanitizedValue = inputValue.replace(
                        /[^a-zA-Z0-9_]/g,
                        ""
                      );
                      setFormData({
                        ...formData,
                        gstr_user_name: sanitizedValue,
                      });
                    }}
                  />
                  <button onClick={checkUsername} style={{height:'4.5rem',width:'5rem',marginInline:'10px',borderRadius:'10px',backgroundColor:'rgba(104, 85, 224, 1)',cursor:'pointer',color:'white'}}><i class="fa-solid fa-magnifying-glass"></i></button> 
                  </div>
                 
                  {exists === true && <p>Username exists</p>}
      {exists === false && <p>Username does not exist</p>}




                  <label htmlFor="password" className="labelthree">

                    <b>Password</b>
                  </label>
                  <input
                    minLength={8}
                    maxLength={25}
                  
                    type="password"
                    name="password"
                    placeholder="Password*"
                    value={password} // Use the 'password' state for the input value
                    onChange={handlePasswordChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    title="Minimum 8 characters 1 upper case 1 lower case 1 digit and 1 special character"
                  />

                     
{password.length > 0 && (
        <div style={{ color: 'red' }}>
          {password.length < 8 && 'Password should be at least 8 characters. '}
          {!/[A-Z]/.test(password) && 'Must include at least one uppercase letter. '}
          {!/[a-z]/.test(password) && 'Must include at least one lowercase letter. '}
          {!/\d/.test(password) && 'Must include at least one digit. '}
          {!/[!@#$%&*]/.test(password) && 'Must include at least one special character (!@#$%&*).'}
        </div>
      )}






                  <label htmlFor="confirmpass" className="labelthree">
                  <b>Confirm</b> 
                  </label>
                  <input
                  id="confpass"
                    minLength={8}
                    maxLength={25}
                    
                    type="password"
                    name="confirmpass"
                    placeholder="Confirm Password*"
                    onPaste={(e) => e.preventDefault()}
                    title="Should be equal to above field"
                    onChange={handleConfirmPasswordChange}
                    
                  />
                  {password !== confirmPassword ? (
        <div style={{ color: 'red' }}>Passwords do not match.</div>
      ) : null}
      
   
 
                  <input
                    type="button"
                    name="previous"
                    className="previous action-button-previous"
                    value="Previous"
                  />
                  <button
                   
                    className="submitbutton"
                    onClick={() => {
                        handleRefreshClick();
                        
                    }}
                    disabled={isSaveButtonDisabled}
                   
                  >
                    Save Data
                  </button>
              
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
