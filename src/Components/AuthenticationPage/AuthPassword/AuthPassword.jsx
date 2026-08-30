import React, { useState } from 'react';
import './AuthPassword.css';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../../Assets/logo.png";

function AuthPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,12}$/;
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (!passwordRegex.test(val)) {
      setError(
        "Password must be 8-12 characters, include at least one uppercase letter and one special character."
      );
    } else {
      setError("");
    }
  };

  const handleLogin = () => {
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8-12 characters, include at least one uppercase letter and one special character."
      );
      return;
    }

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
          <h1>What's your password</h1>
        </div>

        <div className='password-page-identifier'>
          <p className='password-page-mailId'>amanda_tata@icloud.com</p>
          <p className='password-page-edit'>Edit</p>
        </div>

        <div className='register-page-input password-input-wrapper'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password*'
            value={password}
            onChange={handleChange}
          />
          <i
            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <div>
          <p className='forgotten-pass' onClick={() => navigate('/auth/forgot-pass')}>Forgotten your password</p>
        </div>

        <div className='continue-btn-div'>
          <button className='register-page-btn' onClick={handleLogin}>LOG IN</button>
        </div>
      </div>
    </>
  );
}

export default AuthPassword;
