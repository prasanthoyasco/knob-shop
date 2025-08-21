import React,{useState} from 'react'
import image from '../../../Assets/Untitled/auth-side.jpg'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom';
import { Signup, sendOtpToEmail, verifyEmailOtp,checkUser,phoneSignup} from "../../../API/authApi";
function SignUpPage() {
    const navigate = useNavigate()
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

    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
    
      // If email has value → disable phone
      // If phone has value → disable email
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
  // Step 1: Check if user exists, then send OTP
// Step 1: Check if user exists, then send OTP
const handleSignup = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!formData.email && !formData.phone) {
    setError("Please enter email or phone");
    return;
  }
  if (!formData.password || !formData.confirmPassword) {
    setError("Please enter password and confirm password");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    setLoading(true);

    if (formData.email) {
      // --- Email signup flow ---
      const userCheck = await checkUser({ email: formData.email });
      if (userCheck.exists) {
        setError("User already exists with this email! Please log in.");
        return;
      }

      const resOtp = await sendOtpToEmail(formData.email);
      setSuccess(resOtp.message || "OTP sent successfully!");
      setStep(2);

    } else if (formData.phone) {
      // --- Phone signup flow ---
      const normalizedPhone = formData.phone.replace(/\D/g, "");
      const userCheck = await checkUser({ phone: normalizedPhone });
      if (userCheck.exists) {
        setError("User already exists with this phone number! Please log in.");
        return;
      }

      try {
        const res = await phoneSignup({
          name: formData.name,
          phone: normalizedPhone,
          password: formData.password,
        });

        setSuccess(res.message || "Account created successfully!");
        localStorage.setItem("token", res.token);
        localStorage.setItem("authUser", JSON.stringify(res.user));
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        console.log("authUser : ", authUser);
        navigate("/")
      } catch (err) {
        console.error(err);
        setError(err?.error || "Phone signup failed");
      }
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
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
      localStorage.setItem("authUser", JSON.stringify(res.user));
const authUser = JSON.parse(localStorage.getItem("authUser"));
console.log("authUser : ", authUser);

      navigate("/knob-shop")
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
          <form className="login-form"  onSubmit={handleSignup}>
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
                disabled={formData.phone.length > 0} 
              />
              <div className='singup-or-text'>
              <p>----------Or----------</p>
              </div>
              <label className="form-label" htmlFor="phone">
                Phone Number
              </label>
              <input
  placeholder="Your mobile number"
  required
  className="form-input"
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  disabled={formData.email.length > 0}
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
              <button type="button" className="forgot-password" onClick={()=>navigate("/auth/login")}>
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
