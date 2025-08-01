import React, { useState } from 'react';
import './AuthForgotPass.css';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../../Assets/logo.png";

function AuthForgotPass() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSave = () => {
    if (!code.trim() || !newPassword.trim()) {
      setError('Both fields are required.');
      return;
    }

    // You could also add password strength validation here if needed

    setError('');
    navigate('/auth/confirm');
  };

  return (
    <>
      <div className="navbar-middle-container">
        <div className="navbar-middle-logo-wrapper">
          <a href="/">
            <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
          </a>
        </div>
      </div>
      <hr />

      <div className='register-page'>
        <div className='register-page-heading'>
          <h1>Verify your email and enter a new password</h1>
        </div>

        <div>
          <p className='sent-code-tyext'>we've sent a code to</p>
          <div className='password-page-identifier'>
            <p className='password-page-mailId'>amanda_tata@icloud.com</p>
            <p className='password-page-edit'>Edit</p>
          </div>
        </div>

        <div className='register-page-input password-input-wrapper'>
          <input
            type='text'
            placeholder='Code*'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <i className="bi bi-arrow-clockwise"></i>
        </div>

        <div className='register-page-input password-input-wrapper'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='New Password*'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <i
            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <div className='forot-pagerule'>
          <p>x minimum of 8 characters</p>
          <p>x uppercase, lowercase letter and one number</p>
        </div>

        <div className='save-can--btn-div'>
          <button className='save-page-can-btn'>Cancel</button>
          <button className='save-page-btn' onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default AuthForgotPass;
