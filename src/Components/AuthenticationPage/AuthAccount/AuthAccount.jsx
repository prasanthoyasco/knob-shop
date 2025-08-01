import React, { useState } from 'react';
import './AuthAccount.css';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../../Assets/logo.png";

function AuthAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!email.trim() && !phone.trim()) {
      setError('Please enter either an email or phone number.');
      return;
    }

    // Reset error and navigate
    setError('');
    navigate('/auth/password');
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
          <h1>Enter your email to login or create an account</h1>
        </div>

        <div className='register-page-select-box'>
          <select>
            <option>India</option>
            <option>USA</option>
            <option>Russia</option>
          </select>
        </div>

        <div className='register-page-input'>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='or-text'>
          <p>or</p>
        </div>

        <div className='register-page-input'>
          <input
            type='text'
            placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <div className='register-page-policy'>
          <p>By continuing, I agree to Knob’s <strong>Privacy Policy </strong> and  <strong>Terms of Use.</strong></p>
        </div>

        <div className='continue-btn-div'>
          <button className='register-page-btn' onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </>
  );
}

export default AuthAccount;
