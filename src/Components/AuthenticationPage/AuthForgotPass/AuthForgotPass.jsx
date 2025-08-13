import React, { useState } from 'react';
import './AuthForgotPass.css';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../../Assets/logo.png";
import {
  verifyEmailOtp,
  resetPasswordByEmail,
  resetPasswordByPhone,
  Login, phoneAuth 
} from "../../../API/authApi";

function AuthForgotPass() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,12}$/;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const email = localStorage.getItem("forgotEmail");
const phone = localStorage.getItem("forgotPhone");

const handleSave = async () => {
  if (!newPassword.trim()) {
    setError("Password is required");
    return;
  }
  if (!passwordRegex.test(newPassword)) {
    setError(
      "Password must be 8-12 characters, include at least one uppercase letter and one special character."
    );
    return;
  }
  try {
    if (email) {
      if (!code.trim()) {
        setError("OTP is required");
        return;
      }
      // Verify OTP
      await verifyEmailOtp(email, code);
      // Reset password
      await resetPasswordByEmail(email, newPassword);
      // Auto-login
      const data = await Login({ email, password: newPassword });
      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
    } else if (phone) {
      // Reset password (no OTP)
      await resetPasswordByPhone(phone, newPassword);
      // Auto-login
      const data = await phoneAuth({ phone, password: newPassword });
      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
    } else {
      setError("No email or phone found for password reset.");
      return;
    }

    // Clear temporary storage
    localStorage.removeItem("forgotEmail");
    localStorage.removeItem("forgotPhone");

    alert("Password reset successfully!");
    navigate("/"); // redirect to home or dashboard
  } catch (err) {
    console.error(err);
    setError(err.error || "Failed to reset password");
  }
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

        {email && (
          <div>
            <p className="sent-code-tyext">We’ve sent a code to:</p>
            <div className="password-page-identifier">
              <p className="password-page-mailId">{email}</p>
            </div>
          </div>
        )}

{phone && (
          <div>
            <p className="sent-code-tyext">Resetting password for:</p>
            <div className="password-page-identifier">
              <p className="password-page-mailId">{phone}</p>
            </div>
          </div>
        )}
        {email && (
        <div className='register-page-input password-input-wrapper'>
          <input
            type='text'
            placeholder='OTP*'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <i className="bi bi-arrow-clockwise"></i>
        </div>
        )}

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

        {error && <p className="passwordError-text">{error}</p>}

        <div className='forot-pagerule'>
  <p>x 8-12 characters</p>
  <p>x At least one uppercase letter</p>
  <p>x At least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)</p>
</div>



        <div className='save-can--btn-div'>
          <button className='save-page-can-btn'onClick={() => navigate("/auth/register")}>Cancel</button>
          <button className='save-page-btn' onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default AuthForgotPass;
