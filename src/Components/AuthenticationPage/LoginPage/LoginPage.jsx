import React,{useState} from 'react'
import image from '../../../Assets/Untitled/auth-side.jpg'
import './LoginPage.css'
import { Login,getUserById  } from "../../../API/authApi";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

      // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await Login(formData); // ✅ call login API

      setSuccessMsg("Login successful! Redirecting...");
      const token = localStorage.setItem("token", res.token);
      const userData = localStorage.setItem("authUser", JSON.stringify(res.user));
      console.log("User data from DB:", userData);
      // ✅ Fetch full user by ID after login
      const fullUser = await getUserById(res.user.id);
      console.log("User data from DB:", fullUser);

      setTimeout(() => {
        navigate("/"); // redirect after login
      }, 1500);
    } catch (err) {
      setErrorMsg(err.error || "Login failed. Try again!");
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
              <h1 className="form-heading">Login</h1>
              {errorMsg && <p className="error-text">{errorMsg}</p>}
              {successMsg && <p className="success-text">{successMsg}</p>}
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
                Password
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

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember Me
              </label>
              <button type="button" className="forgot-password">
                Forget Password?
              </button>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
