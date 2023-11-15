import React, { useState } from 'react';
import axios from 'axios';
import './OtpForm.css';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleSendOtp = async () => {
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
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="containerzero">
      <h1>Email Verification</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSendOtp}>Send OTP</button>

      {email && (
        <>
        <br/><br/>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          {verificationStatus && <div>{verificationStatus}</div>}
        </>
      )}
    </div>
  );
};

export default EmailVerification;
