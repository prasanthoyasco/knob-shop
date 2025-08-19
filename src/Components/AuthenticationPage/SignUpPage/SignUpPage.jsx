import React,{useState} from 'react'
import image from '../../../Assets/Untitled/auth-side.jpg'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom';
import { Signup, sendOtpToEmail, verifyEmailOtp,checkUser  } from "../../../API/authApi";
function SignUpPage() {
    const navigate = useNavigate()
const [showPassword, setShowPassword] = useState(false);
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  // Step 1: Check if user exists, then send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      // 1️⃣ Check if user already exists
      const userCheck = await checkUser({ email: formData.email });
      if (userCheck.exists) {
        setError("User already exists with this email!");
        return;
      }

      // 2️⃣ If not exist → send OTP
      const res = await sendOtpToEmail(formData.email);
      setSuccess(res.message || "OTP sent successfully!");
      setStep(2);
    } catch (err) {
      setError(err.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP + Signup
  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      // 1. Verify OTP
      await verifyEmailOtp(formData.email, formData.otp);

      // 2. Signup user
      const res = await Signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Account created successfully!");
      console.log("Signup success:", res);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/"); // if you want redirect
    } catch (err) {
      setError(err.error || "Signup failed");
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
        {step === 1 && (
          <form className="login-form"  onSubmit={handleSendOtp}>
            <div>
              <h1 className="form-heading">Sign Up</h1>
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                placeholder="Your email address"
                required
                className="form-input full-name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
            {/* Error / Success */}
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          )}
          {step === 2 && (
            <form className="login-form" onSubmit={handleVerifyAndSignup}>
              <h1 className="form-heading">Verify OTP</h1>

              <label className="form-label">Enter OTP</label>
              <input
                placeholder="Enter OTP"
                required
                className="form-input"
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
              />

              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Verify & Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
