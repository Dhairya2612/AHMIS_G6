import React, { useState } from 'react';
import './Fpass.css';

const ForgotPass = () => {
  const [step, setStep] = useState(1);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const isButtonDisabled =
    (step === 1 && (emailOrPhoneNumber.trim() === '' || !/^\d{10}$/.test(emailOrPhoneNumber))) ||
    (step === 2 && (otp === '' || newPassword === '' || confirmPassword === ''));

  const handleNext = () => {
    if (step === 1) {
      // Simulate OTP generation and validation.
      // In a real application, this logic should be replaced with server-side calls.
      const otpValid = true; // Simulated OTP validation result.
      if (otpValid) {
        setStep(2);
        setMessage('');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } else if (step === 2) {
      // Simulate password reset logic.
      // In a real application, this logic should interact with your backend.
      alert('Password reset successful!');
    }
  };

  return (
    <div id="forgot-password-container">
      <div className="forgot-password-form" style={{ marginTop: '-90px' }}>
        <h2 className="forgot-password-heading">Forgot Password</h2>
        <div className="forgot-password-message">{message}</div>
        {step === 1 && (
          <div>
            <div className="forgot-password-step">
              <label style={{ fontSize: '15px' }}>Select recovery method:</label>
              <div className="toggle-switch">
                <div style={{ display: 'flex', marginInline: '4.8rem', marginTop: '1rem' }}>
                  <button
                    className={isPhoneNumber ? 'recovery-active' : 'recovery-inactive'}
                    onClick={() => setIsPhoneNumber(true)}
                  >
                    Use Phone
                  </button>
                  <br />
                  <br />
                  <button
                    className={!isPhoneNumber ? 'recovery-active' : 'recovery-inactive'}
                    onClick={() => setIsPhoneNumber(false)}
                  >
                    Use Email
                  </button>
                </div>
              </div>
            </div>
            <div className="forgot-password-step">
              <input
              maxLength="10"
                type={isPhoneNumber ? 'tel' : 'email'}
                placeholder={isPhoneNumber ? 'Phone Number' : 'Email'}
                value={emailOrPhoneNumber}
                onChange={(e) => {
                  // Ensure only digits are entered in the phone number field
                  const value = e.target.value.replace(/\D/g, '');
                  setEmailOrPhoneNumber(value);
                }}
                className="forgot-password-input"
                pattern="[0-9]{10}" // Set a pattern to allow only 10 digits
              />
            </div>
            <div className="forgot-password-step">
              <button className="forgot-password-button" onClick={handleNext} disabled={isButtonDisabled}>
                Send OTP
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="forgot-password-step">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="forgot-password-input"
              />
            </div>
            <div className="forgot-password-step">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="forgot-password-input"
              />
            </div>
            <div className="forgot-password-step">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="forgot-password-input"
              />
            </div>
            <div className="forgot-password-step">
              <button className="forgot-password-button" onClick={handleNext} disabled={isButtonDisabled}>
                Reset Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
