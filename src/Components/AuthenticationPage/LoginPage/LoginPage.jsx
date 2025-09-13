import React, { useState } from "react";
import image from "../../../Assets/Untitled/auth-side.jpg";
import "./LoginPage.css";
import { Login, getUserById, phoneLogin } from "../../../API/authApi";
import { Link, useNavigate } from "react-router-dom";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If email has value → disable phone
    // If phone has value → disable email
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      let res;

      if (formData.email) {
        // Email login
        res = await Login({
          email: formData.email,
          password: formData.password,
        });
      } else if (formData.phone) {
        // Phone login
        res = await phoneLogin({
          phone: formData.phone,
          password: formData.password,
        });
      } else {
        setErrorMsg("Please enter email or phone number.");
        setLoading(false);
        return;
      }

      // Save token and user
      localStorage.setItem("authToken", res.token);
      setSuccessMsg("Login successful! Redirecting...");

      // Fetch full user by ID
      const fullUser = await getUserById(res.user.id);
      localStorage.setItem("authUser", JSON.stringify(fullUser.user));
      console.log("Full user data:", fullUser);
      localStorage.getItem("authToken");

      setTimeout(() => {
        const lastPath = localStorage.getItem("lastPath");
        console.log(lastPath)

        if (lastPath === "/auth/register" || lastPath === "/auth/forgot-password" || lastPath === "/auth/login") {
          navigate("/");
        } else if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/");
        }
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
        <img alt="auth" className="login-image" src={image} />
        <div className="login-overlay">
          <div className="login-logo">
            <img src="/logo.png" alt="Knobs Logo" />
          </div>
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
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Your email address"
                required={formData.phone.length === 0}
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={formData.phone.length > 0}
              />
              <div className="singup-or-text">
                <p> OR </p>
              </div>
              <label className="form-label" htmlFor="phone">
                Phone Number
              </label>
              <input
                placeholder="Your phone number"
                required={formData.phone.length === 0}
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
              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  navigate("/auth/forgot-password", {
                    state: { email: formData.email },
                  })
                }
              >
                Forget Password?
              </button>
            </div>
            {errorMsg && <p className="text-danger m-auto">{errorMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <div className="m-auto mt-2">
              <Link to={"/auth/register"} className="forgot-password">
                Don't have an account? Sign up here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
