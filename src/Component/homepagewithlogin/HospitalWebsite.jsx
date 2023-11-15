import React, { useState,useEffect } from "react";
import loginicon from '../homepagewithlogin/image/loginicon.png'
import axios from "axios";
import { Alert } from "react-bootstrap";



import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import "./css/style.css"; 
import '../Slider/Sliderstyle.css'
import "./js/script";
import Goto from '../GoToTop/Goto';
import Slider from '../Slider/Slider';
import Galleryslider from "../Slider/galleryslider";
import { useHistory,useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import jsSHA from 'jssha';

const Tesseract = require('tesseract.js');

const interval = 4000; // 4 seconds

function App({ authenticate, setUser, loginFailure, error }) {
  const [captchaError, setCaptchaError] = useState('');
  const history = useHistory();
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  //const history = useNavigate();
  const [sessionAttribute, setSessionAttribute] = useState('');
  const [sessionsalt, setSessionsalt] = useState('');
  const [values, setValues,] = useState({
    username: "",
    pwd: "",
    sessionsalt: '',
    captchaCode:''
  });
  // //added for captcha on 25/10/2023 by kanhai
  const [captchaCode, setCaptchaCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [captchaImageUrl, setCaptchaImageUrl] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');

  
  
  // const fetchCaptchaImage = () => {
  //   //alert("inside the featchcaptcha image ")
  //   axios.get('http://localhost:8082/auth/captcha-image', { responseType: 'blob' })
  //     .then(response => {
  //      // console.log("kanhai "+response.data.captchaCode); // Log the entire response object
  //       if (response.status === 200) {
  //         return response.text(); // Captcha text
  //       } else {
  //         throw new Error('Failed to retrieve captcha image');
  //       }

        
   

  //      // alert("inside the featchcaptcha image after calling API")
  //       const url = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
       
  //      //alert("inside the featchcaptcha image url  " +url)
  //       setCaptchaImageUrl(url);
       
  //      // alert("inside the featchcaptcha  " +orignalcaptcha)
        
  //     })
  //     .then((captchaText) => {
  //       // Set the captcha text in a variable or a state in your React component
  //       captchaValue = captchaText;
  //       console.log("react" +captchaValue)
  //       // Now you have the captcha text to compare with the user's input
  //     })
  //     .catch(error => {
  //       console.error('Error fetching CAPTCHA image:', error);
  //     });
  // };
  
  const fetchCaptchaImage = () => {
    axios.get('http://localhost:8082/auth/captcha-image', { responseType: 'blob' })
      .then(response => {
        if (response.status === 200) {
          const reader = new FileReader();
          reader.onload = function () {
            const captchaImage = reader.result;
  
            // Use Tesseract.js to perform OCR on the image
            Tesseract.recognize(
              captchaImage,
              'eng', // Use the 'eng' language for English text
            //  { logger: info => console.log(info) } // This callback will log the recognition progress
            ).then(({ data: { text } }) => {
              //console.log('Captcha Text:', text);
              sessionStorage.setItem('captchaText', text);
              // Captcha text is extracted
              setCaptchaValue(text);
  
              //  code for displaying the image
              const url = URL.createObjectURL(new Blob([captchaImage], { type: 'image/jpeg' }));
              setCaptchaImageUrl(url);
            });
          };
          reader.readAsArrayBuffer(response.data);
        } else {
          throw new Error('Failed to retrieve captcha image');
        }
      })
      .catch(error => {
        console.error('Error fetching CAPTCHA image:', error);
      });
  };
  


//added by kanhai on 19/10/2023
 
useEffect(() => {
 // alert("inside the useEffect")
 
  fetchCaptchaImage();
 
  // Make an HTTP request to fetch the attribute from the backend
  //alert("inside the useEffect")
  console.log('Making GET request to /setSessionAttribute');
  axios.get('http://localhost:8082/auth/setSessionAttribute')
    .then(response => {
      console.log('Response:', response.data);
      setSessionAttribute(response.data);
      setSessionsalt(response.data);
      setValues(prevState => ({
        ...prevState,
        sessionsalt: response.data,
      }));
    
    })
    .catch(error => {
      console.error('Error fetching session attribute:', error);
    });

  

}, []);




function validate(isSHA2)
{
//alert('loginLogin'+isSHA2); 
 
if(!securePassword(isSHA2))
{
  /*document.getElementById("divElementErrorsId").innerHTML = "Faced Some Unknown Problem. Please try Again!";*/
  document.getElementsByName("username")[0].value = "";
  document.getElementsByName("password")[0].value = "";
  return false;
}

// alert("kkkk2222");
return true;
}
   
function securePassword(isSHA2)
{
 //alert('B');
 var hashValue = "", objPassHash="",objPassHash1="";
 try  
 {
   if(isSHA2 && isSHA2=='0')
   {
     //alert("kkkkif");
     objPassHash = new jsSHA('SHA-1', 'TEXT',1);//new jsSHA(document.getElementsByName("varPassword")[0].value+document.getElementsByName("varUserName")[0].value, "ASCII");
     objPassHash.update(document.getElementsByName("password")[0].value+document.getElementsByName("username")[0].value, "ASCII");
     hashValue = objPassHash.getHash("HEX");
     
     objPassHash1 = new jsSHA('SHA-1', 'TEXT',1);
     //objPassHash1.update(hashValue + sessionToken);
    
   }
   else
   {
     //alert("kkkkelse");
     objPassHash = new jsSHA('SHA-512', 'TEXT',1);
     alert(document.getElementsByName("password")[0].value)
     objPassHash.update(document.getElementsByName("password")[0].value+document.getElementsByName("username")[0].value);	
     hashValue = objPassHash.getHash("HEX");	
     alert("Hashed value : "+hashValue);
     objPassHash1 = new jsSHA('SHA-512', 'TEXT',1);
     objPassHash1.update(hashValue + sessionsalt);
      
   }
 } 
 catch(e)
 {
   //alert("kkkk");
   //alert(e.message);
   //alert("kkkkkkkkk");
   return false;
 } 
 try
 {
   if(isSHA2 && isSHA2=='0')
     hashValue = objPassHash1.getHash("HEX");
   else
     hashValue = objPassHash1.getHash("HEX");	
 }
 catch(e)
 {
   return false;
 }
 


 

  //alert("Encrypted Password in SHA-256 encoding is "+hashValue);
  //swal({		  text: "Encrypted Password in SHA-512 encoding is !"+hashValue,		  button:"OK",				});
  
  //alert('E'+hashValue);
  document.getElementsByName("password")[0].value = hashValue;
      return true; 
    
}

 

   const handleChange = (e) => {
     e.persist();
     setValues((values) => ({
       ...values,
       [e.target.name]: e.target.value,
     }));
   };
  
  const handleLogin = () => {  
   
     alert("inside the handalelogin")
 
    var pwd =document.getElementsByName("password")[0].value;
    alert("line no 240 " +pwd);
    const enteredCaptcha=document.getElementsByName("captchaCode")[0].value;
    const captchaText = sessionStorage.getItem('captchaText').trim();
    console.log("enteredCaptcha "+enteredCaptcha)
    console.log("captchaText    "+captchaText);

    
  alert("line no 299 " +enteredCaptcha+ "--"+captchaText);
  if(encodeURIComponent(enteredCaptcha) === encodeURIComponent(captchaText)){
    alert("line no 301 inside the handalelogin ");
    console.log("Password entered by user: " + pwd);
    alert("line no 303 passowrd before is "+pwd);
     axios.post('http://localhost:8082/auth/login', { username,pwd,sessionsalt,enteredCaptcha })
       .then(response => {
        try {
          alert("line 307");
         console.log("kanhai====>>>"+response);
         console.log("====>>>"+response.status);
         console.log("====>>>"+response.statusText);
         console.log("====>>>"+response.data.username);
         console.log("=>>>"+response.data.jwtToken);
         console.log("====>>>"+response.data.token);
        
 
         alert("line no 316 inside the login API" )
         if (response.status === 200 &&  response.data && response.data.jwtToken) {
             // Store the token in session storage
             sessionStorage.setItem('jwtToken', response.data.jwtToken);
             alert("line 320 :"+ response.data.jwtToken)
             
             console.log("Login successful");
          
          
                 if (response.data.jwtToken)
                  {
                    console.log(response.data.username)
                    sessionStorage.setItem('username',response.data.username)
                    alert("line no 328 "+response.data.username)
                     //toast.success('Login successful');
                     // Redirect to the /home page
                     history.push('/Home');
                  }
                 else 
                  {
                     console.log(response.data.username)
                     alert(response.data.username)
                     alert("line 331 Something Wrong! Please Try Again");
                     toast.error('Something Wrong! Please Try Again');
                     loginFailure('Something Wrong! Please Try Again');
                 }          
         } 
         else {
              alert("line 338");
              console.log("Login failed: JWT token not generated");
               toast.error('Login failed: JWT token not generated');
              }
         
        } 
        catch (error) {
         alert("line 344  UserId or Password is not valid");
         console.log(response.captchaValidationResult);
         toast.error('UserId or Password is not valid 1');
         }
        })
        .catch(error => {
         
         alert("line 352 UserId or Password is not valid 2");
         
         toast.error('UserId or Password is not valid 2');
         console.error(error);
       });
    }
    else{
      
      history.push('/');
      alert("captcha invalid");
      setCaptchaError('Invalid CAPTCHA. Please try again.');
      
      console.error('Captcha is not valid');
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 


  return (

    <>
 <Goto/>
      {/* Header section */}
      <header className="header">
        <a className="logo">
          <h3>
            <img
              src={require("./e-sushrut.png")}
              alt=""
              style={{ height: "40px", width: "128px" }}
            />{" "}
            
          </h3>
          
        </a>
        <nav className="navbar">
          <ul>
            <li>
              <a href="#services">About</a>
            </li>
            <li>
              <a href="loginBoard"></a>
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

    <div style={{ fontSize: "15px", textAlign: "center", fontWeight: "300" }}>
      <div className="headingdiv">
        <br/>
        <br/>
        <br/>
        <br/>
      
    
        
        {/* <h5 style={{ fontSize: "2rem" }}>Hospital Management Information System</h5>
        <p> <b>State Wide Implementation</b></p> */}
      </div>
       {/* <div className="sliderone">
          <Slider />
        </div>  */}
        
        <div  data-aos="zoom-in" className="slideshow-container" >
  
</div>

 <div>
 
              {/* <img className='wave' src={require("./background2.jpg")} alt="" /> */} 
       {/*<img className='wave' src={require("./background3.jpg")} alt="" /> */}   
        {/* <img className='wave' src={require("./backimage.jpg")} alt="" /> */} 
        </div> 
      <div style={{ marginTop: "-2rem" }}>
        <div className="container">
          <div className="login-content"> {/*  onSubmit={handleSubmit}  */}
            <form   className="my-login-validation" style={{ border:'2px',background:'#ffffff',  borderRadius:'20px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' ,padding: '15px',position:'absolute' }} >
              <img
                src={"https://cdn.icon-icons.com/icons2/2249/PNG/512/account_edit_outline_icon_140057.png"
                      }
                alt="Avatar"
              />
              <h3 style={{marginTop:'-4px'}} className="title">Login</h3>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    placeholder="User Id"
                    minLength={4}
                    maxLength={25}
                    name="username"
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    pattern="^[A-Za-z0-9_.-]+$" // Add the pattern attribute with the regex
                    title="User ID must be alphanumeric with '_', '.', or '-' characters only"
                    onChange={e => setName(e.target.value)}            
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
                    maxLength={15}
                    name="password"
                    required
                    autoCorrect="off"
                    //value={password}
                   // onChange={handleChange}
                   onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  {/* <i className="fas fa-lock"></i> */}
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter CAPTCHA"
                    maxLength={5}
                    value={captchaCode}
                    name="captchaCode"
                    required
                    onInput={(e) => {
                      const sanitizedInput = e.target.value.replace(/[^A-Za-z0-9]/g, '');
                      e.target.value = sanitizedInput;
                      setCaptchaCode(sanitizedInput);
                    }}
                    onChange={(e) => {
                      setCaptchaCode(e.target.value);
                      setCaptchaError(''); // Clear any previous error when input changes
                    }}
                  />
                </div>
              </div>
              {captchaError && <p className="error-message">{captchaError}</p>}
            
              <div id="captcha" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white',  borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',margin:'1rem' }}>
               <img src={captchaImageUrl} alt="Captcha" style={{ maxWidth: '65%', height: 'auto',borderRadius:'11px' }} />
               <button onClick={fetchCaptchaImage} style={{ color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer',fontSize:'2rem',marginInline:'4rem',backgroundColor:'white' }}>
               <i className="fas fa-redo-alt"></i>
               </button>
               </div>


               <br />
               

           
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <a href="/registeruser" className="links">
                    Sign Up
                  </a>
                 
                    <a href="/resetpassword" className="links">
                      Forgot Password?
                    </a>
                 </div>
               
             
              <input className="btnLog" onClick={() => { validate('512');handleLogin(); } } value="Login" />
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
      {/* <div className="container" style={{ display: 'flex' }}>
    <div className="image-container">
      <img
        src="./logo1.jpg" // Replace with your image source
        alt="Image Description"
        style={{ width: '50%', height: 'auto' }}
      />
    </div> */}
        <h1 className="heading">
          <span>e-Sushrut</span>
        </h1>
        <div className="box-container" style={{ fontSize: "15px", textAlign:'justify' }}>
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
                  <p style={{textAlign:'justify'}}>
                    Integrated Dashboard Works in real time management
                    information system, visual persentation for quick statistics
                    to hospital authorities.Dynamic Report provide facility to
                    generate report due to intermittent transactions, frequent
                    update.
                  </p>
                  
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
                  <p style={{textAlign:'justify'}}>
                    The Ayushman Bharat Digital Mission (previously known as
                    National Digital Health Mission) is an agency of the
                    Government of India. e-Sushrut Maharastra application
                    compliance with Ayushman Bharat Digital Mission. Its
                    integrated with M1, M2 & M3 level
                  </p>
                 
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={require("./erecord.png")} alt="" />
                </div>
                <div className="content">
                  <div className="icon"></div>
                  <h3>Electronic Health Record</h3>
                  <p style={{textAlign:'justify'}}>
                    An Electronic Health Record (EHR) is an electronic version
                    of a patient's longitudinal health record. EHR may contain
                    medical history, diagnoses, medications, treatment plans,
                    immunization dates, allergies and test results of a patient
                    across time.
                  </p>
                 
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
              To Be Discussed...
            </p>
          </div>
          <div className="icons">
            <i class="fa-solid fa-location-dot"></i>
            <h3>Address</h3>
            <p>
            Anusandhan Bhawan, C-56/1, Institutional Area, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201307
            </p>
          </div>
          <div className="icons">
            <i class="fa-solid fa-envelope"></i>
            <h3> Email</h3>
            <p>To Be Discussed...</p>
          </div>
          <div className="icons">
            <i class="fa-solid fa-phone"></i>
            <h3>Call Us</h3>
            <p>To Be Discussed...</p>
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
