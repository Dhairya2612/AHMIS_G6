import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { userLogin } from "../api/authenticationService";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import "./css/style.css"; // Import your CSS file here
import "./js/script";
import Goto from "../GoToTop/Goto";
import Slider from "../Slider/Slider";
import Galleryslider from "../Slider/galleryslider";
import { useHistory, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import jsSHA from "jssha";

function App({ authenticate, setUser, loginFailure, error }) {
  const history = useHistory();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  //const history = useNavigate();
  const [sessionAttribute, setSessionAttribute] = useState("");
  const [sessionsalt, setSessionsalt] = useState("");
  const [values, setValues] = useState({
    username: "",
    pwd: "",
    sessionsalt: "",
  });
  // //added for captcha on 25/10/2023 by kanhai
  // const [captchaInput, setCaptchaInput] = useState("");
  // const [captchaText, setCaptchaText] = useState(""); // Define captchaText state
  // const [captchaImage, setCaptchaImage] = useState(""); // Define captchaImage state

  //added by kanhai on 19/10/2023

  useEffect(() => {
    // Make an HTTP request to fetch the attribute from the backend
    // alert("inside the useEffect")
    console.log("Making GET request to /setSessionAttribute");
    axios
      .get("http://localhost:8082/auth/setSessionAttribute")
      .then((response) => {
        console.log("Response:", response.data);
        setSessionAttribute(response.data);
        setSessionsalt(response.data);
        setValues((prevState) => ({
          ...prevState,
          sessionsalt: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching session attribute:", error);
      });
  }, []);

  function validate(isSHA2) {
    //alert('loginLogin'+isSHA2);

    if (!securePassword(isSHA2)) {
      /*document.getElementById("divElementErrorsId").innerHTML = "Faced Some Unknown Problem. Please try Again!";*/
      document.getElementsByName("username")[0].value = "";
      document.getElementsByName("password")[0].value = "";
      return false;
    }

    // alert("kkkk2222");
    return true;
  }

  function securePassword(isSHA2) {
    //alert('B');
    var hashValue = "",
      objPassHash = "",
      objPassHash1 = "";
    try {
      if (isSHA2 && isSHA2 == "0") {
        //alert("kkkkif");
        objPassHash = new jsSHA("SHA-1", "TEXT", 1); //new jsSHA(document.getElementsByName("varPassword")[0].value+document.getElementsByName("varUserName")[0].value, "ASCII");
        objPassHash.update(
          document.getElementsByName("password")[0].value +
            document.getElementsByName("username")[0].value,
          "ASCII"
        );
        hashValue = objPassHash.getHash("HEX");

        objPassHash1 = new jsSHA("SHA-1", "TEXT", 1);
        //objPassHash1.update(hashValue + sessionToken);
      } else {
        //alert("kkkkelse");
        objPassHash = new jsSHA("SHA-512", "TEXT", 1);
        objPassHash.update(
          document.getElementsByName("password")[0].value +
            document.getElementsByName("username")[0].value
        );
        hashValue = objPassHash.getHash("HEX");
        //alert("Hashed value : "+hashValue);
        objPassHash1 = new jsSHA("SHA-512", "TEXT", 1);
        objPassHash1.update(hashValue + sessionsalt);
      }
    } catch (e) {
      //alert("kkkk");
      //alert(e.message);
      //alert("kkkkkkkkk");
      return false;
    }
    try {
      if (isSHA2 && isSHA2 == "0") hashValue = objPassHash1.getHash("HEX");
      else hashValue = objPassHash1.getHash("HEX");
    } catch (e) {
      return false;
    }

    // alert("Encrypted Password in SHA-512 encoding is "+hashValue);
    //swal({		  text: "Encrypted Password in SHA-512 encoding is !"+hashValue,		  button:"OK",				});

    //alert('E'+hashValue);
    document.getElementsByName("password")[0].value = hashValue;
    return true;
  }

  // const handleSubmit = (evt) => {
  //   //added by kanhai
  //   var pwd =document.getElementsByName("password")[0].value;
  //   console.log("Password entered by user: " + pwd);

  //   evt.preventDefault();
  //   authenticate();

  //   userLogin(values)
  //     .then((response) => {
  //       if (response.status === 200 &&  response.data && response.data.jwtToken) {
  //         setUser(response.data);
  //         // Redirect to the dashboard or the desired page
  //         // You can use React Router for this
  //         const token = sessionStorage.getItem('USER_KEY');

  //         if (token) {
  //           // Redirect to the /dashboard page
  //           history.push('/dashboard');
  //         }
  //       } else {
  //         loginFailure('Something Wrong! Please Try Again');
  //       }
  //     })
  //     .catch((err) => {
  //       if (err && err.response) {
  //         switch (err.response.status) {
  //           case 401:
  //             loginFailure("Authentication Failed. Wrong Credentials");
  //             break;
  //           default:
  //             loginFailure("Something Wrong! Please Try Again");
  //         }
  //       } else {
  //         loginFailure("Something Wrong! Please Try Again");
  //       }
  //     });
  // };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    // alert("inside the handalelogin")
    //const { username, sessionsalt } = jwtRequest;
    var pwd = document.getElementsByName("password")[0].value;
    alert("inside the handalelogin" + pwd);
    console.log("Password entered by user: " + pwd);

    alert("passowrd before is " + pwd);
    axios
      .post("http://localhost:8082/auth/login", { username, pwd, sessionsalt })
      .then((response) => {
        try {
          console.log("====>>>" + response);
          console.log("====>>>" + response.status);
          console.log("====>>>" + response.statusText);
          console.log("====>>>" + response.data);
          console.log("=>>>" + response.data.jwtToken);
          console.log("====>>>" + response.data.token);
          alert("inside the login");
          if (
            response.status === 200 &&
            response.data &&
            response.data.jwtToken
          ) {
            // Store the token in session storage
            sessionStorage.setItem("jwtToken", response.data.jwtToken);
            alert(response.data.jwtToken);

            console.log("Login successful");
            toast.success("Login successful");

            if (response.data.jwtToken) {
              // Redirect to the /dashboard page
              history.push("/Home");
            } else {
              loginFailure("Something Wrong! Please Try Again");
            }
          } else {
            console.log("Login failed: JWT token not generated");
            toast.error("Login failed: JWT token not generated");
          }
        } catch (error) {
          console.log(error);
          toast.error("Login failed");
        }
      })
      .catch((error) => {
        toast.error("An error occurred");
        console.error(error);
      });
  };

  return (
    <>
      <Goto />
      {/* Header section */}
      <header className="header">
        <a href="index.jsp" className="logo">
          <h3>
            <img
              src={require("./Himachal_Pradesh_seal.svg.png")}
              alt=""
              style={{ height: "40px", width: "58px" }}
            />{" "}
            e-Sushrut
          </h3>
        </a>
        <nav className="navbar">
          <ul>
            <li>
              <a href="#services">About</a>
            </li>
            
            <li>
              <a href="#about">Features</a>
            </li>
            <li>
              <a href="#doctors">Gallery</a>
            </li>
            <li>
              <a href="#contactus">Contact</a>
            </li>
           
          </ul>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </header>

      <div style={{ fontSize: "25px", textAlign: "center", fontWeight: "300" }}>
        <div className="headingdiv">
          <h6>Directorate Health Services Himachal Pradesh</h6>
          <p style={{ fontSize: "15px" }}>
            Hospital Management Information System
          </p>
        </div>
        <div className="sliderone">
          {" "}
          <Slider />
        </div>
        <div style={{ marginTop: "-8rem" }}>
          <div className="container">
            <div className="login-content">
              {" "}
              {/*  onSubmit={handleSubmit}  */}
              <form className="my-login-validation">
                <img
                  src={
                    "https://cdn.icon-icons.com/icons2/2249/PNG/512/account_edit_outline_icon_140057.png"
                  }
                  alt="Avatar"
                />
                <h3 className="title">Login</h3>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      minLength={5}
                      name="username"
                      required
                      autoCapitalize="none"
                      autoCorrect="off"
                      //value={username}
                      onChange={(e) => setName(e.target.value)}
                      //onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="div">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      //minLength={8}
                      name="password"
                      required
                      //value={password}
                      // onChange={handleChange}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <br/>
                 <div style={{display:'flex', justifyContent:'space-between'}}>
                <a href="registeruser"  className="links">
                  Sign In
                </a>
                    
                <a href="/resetpassword"  className="links">
                  Forgot Password?
                </a></div>

                <input
                  type="submit"
                  className="btnLog"
                  onClick={() => {
                    validate("512");
                    handleLogin();
                  }}
                  value="Login"
                />
                {error && (
                  <Alert style={{ marginTop: "20px" }} variant="danger">
                    {error}
                  </Alert>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Icons section */}

      {/* Services section */}

      <section className="services" id="services">
        <h1 className="heading">
          <span>e-Sushrut</span>
        </h1>
        <div className="box-container" style={{ fontSize: "15px" }}>
          e-Sushrut C-DAC's Hospital Management Information System is a major
          step towards adapting technology to improve healthcare. HMIS
          incorporates an integrated computerized clinical information system
          for improved hospital administration and patient health care. It also
          provides an accurate, electronically stored medical record of the
          patient. A data warehouse of such records can be utilized for
          statistical requirements and for research. The real time HMIS
          streamlines the treatment flow of patients and simultaneously
          empowering workforce to perform to their peak ability, in an optimized
          and efficient manner. It is modeled on the unique combination of a
          patient centric and medical staff centric paradigm, thus providing
          benefits to both the recipients and the providers of healthcare. It
          ensures dramatic improvement in performance along with reducing the
          costs.
        </div>
      </section>

      {/* Features section */}
      <section className="about" id="about">
        <div className="row">
          <div className="image">
            <img src="img/about-img.svg" alt="" />
          </div>
          <section className="blogs" id="blogs">
            <h1 className="heading">
              <span>Features</span>
            </h1>
            <div className="box-container">
              <div className="box">
                <div className="image">
                  <img src={require("./dashillustr.png")} alt="" />
                </div>
                <div className="content">
                  <div className="icon"></div>
                  <h3>Dashboard and Dynamic Reports</h3>
                  <p>
                    Integrated Dashboard Works in real time management
                    information system, visual persentation for quick statistics
                    to hospital authorities.Dynamic Report provide facility to
                    generate report due to intermittent transactions, frequent
                    update.
                  </p>
                  <a
                    href="https://www.altru.org/blog/2018/february/top-ways-to-protect-yourself-and-your-family-fro/"
                    className="btn"
                  >
                    learn more <span className="fas fa-chevron-right"></span>
                  </a>
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img
                    style={{
                      height: "22rem",
                      width: "22rem",
                      marginInline: "5rem",
                    }}
                    src="https://www.karkinos.in/wp-content/uploads/2022/09/ABDM-KH-integration.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <div className="icon"></div>
                  <h3>Ayushman Bharat Digital Mission </h3>
                  <p>
                    The Ayushman Bharat Digital Mission (previously known as
                    National Digital Health Mission) is an agency of the
                    Government of India. e-Sushrut Maharastra application
                    compliance with Ayushman Bharat Digital Mission. Its
                    integrated with M1, M2 & M3 level
                  </p>
                  <a href="" className="btn">
                    learn more <span className="fas fa-chevron-right"></span>
                  </a>
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={require("./erecord.png")} alt="" />
                </div>
                <div className="content">
                  <div className="icon"></div>
                  <h3>Electronic Health Record</h3>
                  <p>
                    An Electronic Health Record (EHR) is an electronic version
                    of a patient's longitudinal health record. EHR may contain
                    medical history, diagnoses, medications, treatment plans,
                    immunization dates, allergies and test results of a patient
                    across time.
                  </p>
                  <a href="" className="btn">
                    learn more <span className="fas fa-chevron-right"></span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* gallery section */}
      <section className="doctors" id="doctors">
        <h1 className="heading">
          <span>Gallery</span>
        </h1>
        <Galleryslider />
      </section>

      {/* Contact us*/}
      <section className="blogs" id="blogs">
        <h1 className="heading" id="contactus">
          <span>Contact Us</span>
        </h1>
        <section className="icons-container">
          <div className="icons">
            <i className="fas fa-user-md"></i>
            <h3>Contact</h3>
            <p>
              Dr. Asst. Director Health Services (Hospital)
              <h5>Phone:</h5> +91-8888888888
              <h5>Email:</h5> hmis@yahoo.com
            </p>
          </div>
          <div className="icons">
            <i class="fa-solid fa-location-dot"></i>
            <h3>Address</h3>
            <p>
              Health and Family Welfare Directorate, SDA Complex Kasumpti,
              Shimla-9.(H.P.)
            </p>
          </div>
          <div className="icons">
            <i class="fa-solid fa-envelope"></i>
            <h3> Email</h3>
            <p>hmis.pmucell@gmail.com</p>
          </div>
          <div className="icons">
            <i class="fa-solid fa-phone"></i>
            <h3>Call Us</h3>
            <p>+91-9999999999, 8999292016</p>
          </div>
        </section>
      </section>

      {/* Footer section */}
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setUser: (data) => dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
