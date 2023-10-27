import React ,{ useState ,useEffect} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import "./css/home.css";

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this state based on user login status
  const [hospitalName, setHospitalName] = useState("");

  useEffect(() => {
    // Simulate fetching the hospital name from the backend API.
    // Replace this with an actual fetch call to your API.
    // For example:
    // fetch('/api/hospitalName')
    //   .then(response => response.json())
    //   .then(data => setHospitalName(data.hospitalName));

    // Simulated data (you should replace this with actual data from your API)
    setTimeout(() => {
      setHospitalName("Hospital XYZ");
    }, 1000);
  }, []);
  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing user data or tokens
    setIsLoggedIn(false); // Update the login status
  };

  return (
    <div className="App">
    <nav className="homenav">
      <div className="logo">Your Logo
      {hospitalName && <span className="hospital-name"> - {hospitalName}</span>}
      </div>
      <ul className="nav-links">
            <li>
              <Link to="/Dashboard" className="user-management">User Management</Link>
            </li>
        {isLoggedIn && (
          <li onClick={handleLogout} className="user-management" style={{ cursor: 'pointer' }}>
            Logout
          </li>
        )}
      </ul>
    </nav>
     
    <nav className="homenav">
      
      <ul className="nav-links">
            <li>
              <Link to="/Dashboard" className="user-management">Registration</Link>
            </li>
            <li>
              <Link to="/Dashboard" className="user-management">OPD</Link>
            </li>
            <li>
              <Link to="/Dashboard" className="user-management">IPD</Link>
            </li>
            <li>
              <Link to="/Dashboard" className="user-management">Emergency</Link>
            </li>
            <li>
              <Link to="/Dashboard" className="user-management">ADT</Link>
            </li>
            <li>
              <Link to="/Dashboard" className="user-management">Investigation</Link>
            </li>
        
      </ul>
    </nav>

    
    

    <div className="content">
      <h1>Welcome to the Home Page</h1>
      <p>This is the content of your home page.</p>
    </div>
  </div>
  )
}

export default Home;