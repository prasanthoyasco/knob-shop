import React, { useState, useEffect } from "react";
import image from "../../../Assets/Untitled/auth-side.jpg";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import {
  Signup,
  sendOtpToEmail,
  verifyEmailOtp,
  checkUser,
} from "../../../API/authApi";
import VerificationSuccess from "./VerificationSuccess";

function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verified, setVerified] = useState(false);

  // New state for OTP resend timer
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Utility function to mask the email
  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return "****@" + domain;
    }
    const maskedLocalPart =
      localPart.length > 2
        ? localPart[0] + "****" + localPart[localPart.length - 1]
        : "****";
    return `${maskedLocalPart}@${domain}`;
  };

  // Timer useEffect hook
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1: Check if user exists, then send OTP
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCanResend(false); // Reset resend state

    if (!formData.email) {
      setError("Please enter your email address to sign up.");
      return;
    }
    if (!formData.password || !formData.confirmPassword) {
      setError("Please enter password and confirm password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // Check if user exists with the email
      const userCheck = await checkUser({ email: formData.email });
      if (userCheck.exists) {
        setError("User already exists with this email! Please log in.");
        return;
      }

      // Send OTP to the email
      const resOtp = await sendOtpToEmail(formData.email);
      setSuccess(resOtp.message || "OTP sent successfully!");
      setStep(2);
      setTimer(30); // Start the timer
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resending OTP
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await sendOtpToEmail(formData.email);
      setSuccess(res.message || "New OTP sent successfully!");
      setTimer(30); // Reset the timer
      setCanResend(false); // Disable resend button
    } catch (err) {
      setError(err.error || "Failed to resend OTP. Please try again.");
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
    // Verify OTP
    await verifyEmailOtp(formData.email, formData.otp);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    const res = await Signup(payload);

    // Save token & user
    localStorage.setItem("token", res.token);
    localStorage.setItem("authUser", JSON.stringify(res.user));

    // Show success animation
    setVerified(true);
  } catch (err) {
    setError(err.error || "Signup failed");
  } finally {
    setLoading(false);
  }
};
 if (verified) {
  return <VerificationSuccess onComplete={() => navigate("/")} />;
}

  return (
    <div className="login-container">
      {/* Left Side (Image + Overlay) */}
      <div className="login-left">
        <img alt="auth" className="login-image" src={image} />
        <div className="login-overlay">
          <div className="login-logo">
            <img src="/logo.png" alt="Knobs Logo" />
          </div>
          <div>
            <h2 className="login-title">
              Create Your <br />
              <span className="highlight">Knobs Account!</span>
            </h2>
            <p className="login-subtitle">Start your smart lifestyle today.</p>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="login-right">
        <div className="login-form-container">
          {step === 1 && (
            <form className="login-form" onSubmit={handleSignup}>
              <div>
                <h1 className="form-heading m-0">Sign Up</h1>
              </div>

              <div>
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  placeholder="Your full name"
                  required
                  className="form-input "
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
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
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  placeholder="Your mobile number"
                  className="form-input"
                  type="text"
                  name="phone"
                  value={formData.phone}
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
                    placeholder="Enter your password again"
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
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => navigate("/auth/login")}
                >
                  Log in
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
              <p className="otp-sent-text">
                OTP sent to {maskEmail(formData.email)}
              </p>

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
              <div className="resend-otp-container">
                {canResend ? (
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Resend OTP"}
                  </button>
                ) : (
                  <p className="resend-timer">Resend in {timer}s</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
