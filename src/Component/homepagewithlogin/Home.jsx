//Written By Dhairya Nikam 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import withSessionTimeoutCheck from '../withSessionTimeoutCheck';
import './css/home.css';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ChangePassword from '../ChangePassword';

function Home() {

  

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const history = useHistory();

// Check if JWT token is not present in sessionStorage
  useEffect(() => {
    
    if (!sessionStorage.getItem('jwtToken')) {
      // if not present thenn Redirect to the home page, reusable
      history.push('/');
    }
  }, [history]);






  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the login page
    history.push('/');
  };

  const toggleDropdown = (event) => {
    setIsDropdownVisible(!isDropdownVisible);
    setAnchorEl(event.currentTarget);
  };
  const toggleChangePassword = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);
  };

 


  const closeDropdown = () => {
    setIsDropdownVisible(false);
    setAnchorEl(null);
  };

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount

  }, []); // Empty dependency array ensures the effect runs only once on mount

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = daysOfWeek[currentDateTime.getDay()];
  const day = currentDateTime.getDate();
  const month = months[currentDateTime.getMonth()];
  const year = currentDateTime.getFullYear();
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const seconds = currentDateTime.getSeconds();
 
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const [isScrollLocked, setScrollLocked] = useState(false);

  const handleLockScrollClick = () => {
    setScrollLocked(!isScrollLocked);

    // Toggle body's overflow style to lock/unlock scroll
    document.body.style.overflow = isScrollLocked ? 'auto' : 'hidden';
  };

  const username = sessionStorage.getItem('username');




  return (
    <div className="App" >
      <nav className="homenav" >
        <div style={{display:'flex',justifyContent:'space-between'}}>

        <div className="logo" style={{textShadow:'.1em .1em 0 hsl(200 50% 30%)',marginRight:'6rem',cursor:'pointer'}}>
          e-Sushrut <b style={{ color: '#99c68e' }}>G6</b>
        </div>
        
        
        
        
        </div>
        <ul className="nav-links">
          <li>
            <p style={{ fontSize: '20px' }}>Welcome, {username} </p> 

            <div className='Hsplocation' style={{display:'flex',padding:'1px'}}>

        {/* <div style={{marginInline:'7px'}}><i class="fa-solid fa-location-dot"></i></div> <p>Civil Hospital Alibag</p>  */}
       {/* Hospital location Data will be populated according to login  */}

        </div>
       

          </li>
          <li>
           
            <Avatar aria-describedby="menu-popover" variant="contained" onClick={toggleDropdown} style={{height:'29px',width:'29px'}} />
           
            <Popover
              id="menu-popover"
              open={isDropdownVisible}
              anchorEl={anchorEl}
              onClose={closeDropdown}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                <ListItem onClick={closeDropdown}>
                My account
                </ListItem>
                <ListItem onClick={closeDropdown}>
                  {/* API will fetch the cash */}
                  Cash in Hand:  0 <p> ₹ </p>
                </ListItem>
                <Divider />
                <ListItem onClick={closeDropdown}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  User Log Report
                </ListItem>
                <ListItem onClick={closeDropdown}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <Link  tag="a" to='/home' onClick={toggleChangePassword}> <p style={{fontSize:'13px', color:'black'}}>Change Password</p></Link> 
                </ListItem>
                <ListItem onClick={closeDropdown}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                 <Link to="/" onClick={handleLogout} > <p style={{fontSize:'13px',color:'black'}}>Logout</p></Link> 
                </ListItem>
              </List>
            </Popover>
          </li>
        </ul>
      </nav>

      <nav className="homenav">
      <ul className="nav-links" style={{ fontSize: '18px' }}>
        <li className={activeLink === 0 ? 'active' : ''}>
          <Link to="/home" onClick={() => handleLinkClick(0)}>
            Registration
          </Link>
        </li>
        <li className={activeLink === 1 ? 'active' : ''}>
          <Link to="/home" onClick={() => handleLinkClick(1)}>
            User Management
          </Link>
        </li>
        <li className={activeLink === 2 ? 'active' : ''}>
            <Link to='/home' onClick={() => handleLinkClick(2)}>
            Admin
            </Link>
          </li>
          
      </ul>
    </nav>
      
    <div id='refreshIcon' style={{ position: 'absolute', right: 0,margin:'1.1rem', fontSize:'20px'}}>
      <a href="/home"> <i title='Refresh' className="fa-solid fa-arrows-rotate"></i></a>

    </div>
    <div style={{fontSize:'13px',position: 'absolute', right: 60,margin:'1.1rem'}}>
      <p>{dayOfWeek}, {month} {day}, {year}</p>
      <p>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
    </div>
    <div style={{ width: '100%', height: '80rem', marginTop: '6rem', border: '2px solid grey', borderRadius: '5px' }}>
          {isChangePasswordVisible ? <ChangePassword /> : <Dashboard />} 
    </div>
  </div>
   
  );
}

export default withSessionTimeoutCheck(Home);
