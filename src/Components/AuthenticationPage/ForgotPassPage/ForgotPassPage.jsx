import React,{useState} from 'react'
import './ForgotPassPage.css'
import image from '../../../Assets/Untitled/auth-side.jpg'
function ForgotPassPage() {
    const [showPassword, setShowPassword] = useState(false);
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
          <form className="login-form">
            <div>
              <h1 className="form-heading">Forgot Password</h1>
              <p className="form-para">Enter your email to receive an OTP</p>
              <input
                placeholder="Your email address"
                required
                className="form-input"
                type="email"
                name="email"
              />
            </div>

            <button type="submit" className="login-btn">
              Send OTP
            </button>
          </form>
          <button type="button" className="back-to-login-btn">
      <i className="bi bi-arrow-left icon-arrow"></i>
      Back to login
    </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassPage
