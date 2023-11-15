import React from 'react'
import './headerstyle.css'
import withSessionTimeoutCheck from '../withSessionTimeoutCheck';
import { useHistory } from 'react-router-dom';

const DashboardHeader= () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the login page
    history.push('/');
  };
  return (
    <div className="headercss">
    <h1>Welcome to e-Sushrut HMIS </h1>
    <a href="/">
      <button class="logbutton" onClick={handleLogout} >
        <h3>Log Out</h3>
      </button>
    </a>
  </div>
  )
}

export default withSessionTimeoutCheck(DashboardHeader);
