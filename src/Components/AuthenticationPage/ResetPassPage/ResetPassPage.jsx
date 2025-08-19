import React,{useState,useEffect} from 'react'
import './ResetPassPage.css'
import image from '../../../Assets/Untitled/auth-side.jpg'
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyEmailOtp,
  resetPasswordByEmail,
} from "../../../API/authApi";
function ResetPassPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

      // ✅ Auto-set email from ForgotPassPage
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate("/auth/forgot-password"); // if no email, redirect back
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Step 1: Verify OTP
      const otpRes = await verifyEmailOtp(email, otp);
      if (!otpRes || otpRes.valid === false || otpRes.success === false) {
        setErrorMsg(otpRes?.message || "Invalid OTP. Try again.");
        return;
      }

      // Step 2: Reset password
      await resetPasswordByEmail(email, password);
      setSuccessMsg("Password reset successful! Redirecting...");

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (err) {
      setErrorMsg(err.error || "Password reset failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side (Image + Overlay) */}
      <div className="login-left">
        <img
          alt="auth"
          className="login-image"
          src={image}
        />
        <div className="login-overlay">
          <div>
            <h2 className="login-title">
              Welcome to <br />
              <span className="highlight">Login Panel!</span>
            </h2>
            <p className="login-subtitle">
              Log in to continue your journey with Kobos.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="login-right">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <h1 className="form-heading">Reset Password</h1>
              <label className="form-label" htmlFor="password">
                Code
              </label>
              <input
                placeholder="Enter OTP"
                required
                className="form-input"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="password">
                New Password
              </label>
              <div className="input-wrapper">
                <input
                  placeholder="Enter your password"
                  required
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            {errorMsg && <p className="error-text">{errorMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            <button type="submit" className="login-btn">
            {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassPage
