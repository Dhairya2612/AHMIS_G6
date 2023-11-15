import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

function UsernameCheck() {
  const [username, setUsername] = useState('');
  const [exists, setExists] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const checkUsername = async () => {
    const response = await fetch(`http://localhost:8082/home/checkUsername?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      setExists(data);
    } else {
      console.error('Error checking username');
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleAlertClick = () => {
    setShowAlert(true);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}

        onClick={
          handleUsernameChange}
      />
      <button onClick={checkUsername}>Check Username</button>
      {exists === true && <p>Username exists</p>}
      {exists === false && <p>Username does not exist</p>}


      <Button onClick={handleAlertClick} variant="outlined" color="primary">
        Show Success Alert
      </Button>

      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>
      )}


     
    </div>
  );
}

export default UsernameCheck;
