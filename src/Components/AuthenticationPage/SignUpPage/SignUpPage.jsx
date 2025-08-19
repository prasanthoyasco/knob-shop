import React,{useState} from 'react'
import image from '../../../Assets/Untitled/auth-side.jpg'
import './SignUpPage.css'
function SignUpPage() {
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
              Create Your <br />
              <span className="highlight">Knobs Account!</span>
            </h2>
            <p className="login-subtitle">
            Start your smart lifestyle today.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="login-right">
        <div className="login-form-container">
          <form className="login-form">
            <div>
              <h1 className="form-heading">Sign Up</h1>
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                placeholder="Your email address"
                required
                className="form-input full-name-input"
                type="email"
                name="name"
              />
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Your email address"
                required
                className="form-input"
                type="email"
                name="email"
              />
            </div>

            <div>
              <label className="form-label" htmlFor="password">
                Create Password
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
            <div>
              <label className="form-label" htmlFor="password">
                Confirm Password
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
              <button type="button" className="forgot-password">
                Forget Password?
              </button>
            </div>

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
