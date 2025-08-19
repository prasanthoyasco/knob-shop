import React,{useState} from 'react'
import './ResetPassPage.css'
import image from '../../../Assets/Untitled/auth-side.jpg'
function ResetPassPage() {
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
              <h1 className="form-heading">Reset Password</h1>
              <label className="form-label" htmlFor="password">
                Code
              </label>
              <input
                placeholder="Enter OTP"
                required
                className="form-input"
                type="email"
                name="email"
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
                  name="password"
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

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassPage
