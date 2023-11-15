import React, { useState } from 'react';
import axios from 'axios';

const OTPComponent = () => {


    
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const generateOTP = async () => {
    try {
      const response = await axios.post(`http://localhost:8082/api/generateOTP?mobileNumber=${phoneNumber}`);
      setGeneratedOTP(response.data);
      setValidationMessage('');
    } catch (error) {
      console.error('Error generating OTP:', error);
    }
  };

  const validateOTP = async () => {
    try {
      const response = await axios.post(`http://localhost:8082/api/validateOTP?mobileNumber=${phoneNumber}&otpValue=${enteredOTP}`);
      
      if (response.data.result === 'valid') {
        setValidationMessage('OTP is valid. Access granted.');
      } else {
        setValidationMessage('Invalid OTP. Access denied.');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
    }
  };

  return (
    <div>
      <h1>OTP Generator and Validator</h1>
      <div>
        <label>Enter your phone number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={generateOTP}>Send OTP</button>
      </div>
      {generatedOTP && (
        <div>
          <p>Generated OTP: {generatedOTP}</p>
        </div>
      )}
      <div>
        <label>Enter the OTP you received:</label>
        <input
          type="text"
          value={enteredOTP}
          onChange={(e) => setEnteredOTP(e.target.value)}
        />
        <button onClick={validateOTP}>Check OTP</button>
      </div>
      {validationMessage && (
        <div>
          <p>{validationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default OTPComponent;
