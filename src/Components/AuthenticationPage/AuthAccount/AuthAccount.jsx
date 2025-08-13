import React, { useEffect, useRef, useState } from "react";
import "./AuthAccount.css";
import logoImage from "../../../Assets/logo.png";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import countryCodes from "../../../Assets/CountryCodes.json";
import {
  checkUser,
  Login,
  Signup,
  sendOtpToEmail,
  verifyEmailOtp,
  phoneAuth
} from "../../../API/authApi";
import { Eye, EyeOff } from "lucide-react";

function AuthAccount() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,12}$/;
const [passwordError, setPasswordError] = useState("");

  const [countries, setCountries] = useState([]);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enter");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    // Initialize reCAPTCHA on component mount
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => console.log("reCAPTCHA solved:", response),
          "expired-callback": () => console.warn("reCAPTCHA expired"),
        }
      );
    }
    setCountries(countryCodes);
  }, []);

  const handleSendEmailOtp = async () => {
    if (!email) return alert("Please enter your email.");
    setLoading(true);
    try {
      await sendOtpToEmail(email);
      alert("OTP sent to your email!");
      setStep("otp-email");
    } catch (err) {
      console.error(err);
      alert(err.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
  
    if (!passwordRegex.test(val)) {
      setPasswordError(
        "Password must be 8–12 characters, include at least one uppercase letter and one special character."
      );
    } else {
      setPasswordError("");
    }
  };
  

  const handleVerifyEmailOtp = async () => {
    if (!email || !otp) return alert("Please enter OTP.");
    setLoading(true);
    try {
      await verifyEmailOtp(email, otp);
      alert("OTP verified!");
      setStep("set-password");
    } catch (err) {
      console.error(err);
      alert(err.error || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async () => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 8–12 characters, include at least one uppercase letter and one special character."
      );
      return;
    }
    if (email) {
      if (!password) return alert("Please enter your password.");
      setLoading(true);
      try {
        const data = await Login({ email, password });
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
        window.history.length > 1
          ? window.history.back()
          : (window.location.href = "/");
      } catch (err) {
        console.error(err);
        alert("Invalid email or password.");
      } finally {
        setLoading(false);
      }
    } else if (phone) {
      if (!password) return alert("Please enter your password.");
      setLoading(true);
      try {
        const phoneNumber = `${selectedCode}${phone.trim()}`;
        const data = await phoneAuth({ phone: phoneNumber, password });
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
        window.history.length > 1
          ? window.history.back()
          : (window.location.href = "/");
      } catch (err) {
        console.error(err);
        alert(err.error || "Login failed");
      } finally {
        setLoading(false);
      }
    }
  };;

  const handleContinue = async () => {
    if (email && !phone) {
      setLoading(true);
      try {
        const data = await checkUser({ email });
        console.log("User check result:", data);
        if (data.exists) {
          setStep("password");
        } else {
          await handleSendEmailOtp();
        }
      } catch (err) {
        console.error("Error checking user:", err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    } else if (phone && !email) {
      // skip OTP, directly go to password input for existing user
      setLoading(true);
      try {
        const phoneNumber = `${selectedCode}${phone.trim()}`;
        const data = await checkUser({ phone: phoneNumber });
        if (data.exists) {
          setStep("password"); // login flow
        } else {
          setStep("set-password"); // register flow
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter either a phone number or an email.");
    }
  };

  const sendOtp = async () => {
    if (!phone || phone.trim().length < 6) {
      return alert("Please enter a valid phone number.");
    }

    setLoading(true);
    const phoneNumber = `${selectedCode}${phone.trim()}`;

    try {
      const appVerifier = recaptchaVerifierRef.current;
      await appVerifier.render();
      if (!appVerifier) {
        throw new Error("reCAPTCHA not initialized.");
      }

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(result);
      setStep("otp");
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert(`Failed to send OTP. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP.");

    setLoading(true);
    try {
      if (!confirmationResult) {
        throw new Error(
          "Confirmation result is missing. Please resend the OTP."
        );
      }

      await confirmationResult.confirm(otp);

      const phoneNumber = `${selectedCode}${phone.trim()}`;
      const data = await checkUser({ phone: phoneNumber });
      console.log("User check result:", data);
      if (!data) {
        return alert("User not found. Please sign up.");
      }

      if (data.exists) {
        const loginData = await Login({ phone: phoneNumber });
        localStorage.setItem("authUser", JSON.stringify(loginData.user));
        localStorage.setItem("authToken", loginData.token);
        // go back one step if possible
        if (window.history.length > 1) {
          window.history.back(); // or window.history.go(-1)
        } else {
          window.location.href = "/"; // fallback if no history
        }
      } else {
        setStep("set-password");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert(`Invalid OTP. Please try again. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 8–12 characters, include at least one uppercase letter and one special character."
      );
      return;
    }
    if (!password) return alert("Please set a password.");
    setLoading(true);
    try {
      if (email) {
        const data = await Signup({ email, password });
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
      } else if (phone) {
        const phoneNumber = `${selectedCode}${phone.trim()}`;
        const data = await phoneAuth({ phone: phoneNumber, password });
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
      }
      window.history.length > 1
        ? window.history.back()
        : (window.location.href = "/");
    } catch (err) {
      console.error(err);
      alert(err.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  console.log("User Data on login", localStorage.getItem("authUser"));

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

      <div className="register-page">
        <div className="register-page-heading">
          <h1>
            {step === "enter"
              ? "Enter your email or phone number to login or create an account"
              : step === "password"
              ? "Enter your password"
              : step === "set-password"
              ? "Set a new password"
              : "Enter the OTP sent to your phone"}
          </h1>
        </div>

        {step === "enter" && (
          <>
            <div className="register-page-select-box">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.dial_code}>
                    {c.name} ({c.dial_code})
                  </option>
                ))}
              </select>
            </div>

            <div className="register-page-input phone-input-wrapper">
              <span className="country-code">{selectedCode}</span>
              <input
                type="tel"
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="or-text">
              <p>or</p>
            </div>

            <div className="register-page-input">
              <input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}

        {step === "otp-email" && (
          <div className="register-page-input">
            <input
              type="text"
              placeholder="Enter OTP from Email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {step === "otp" && (
          <div className="register-page-input">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {step === "password" && (
          <div className="register-page-input">
            <div
              className="register-page-input"
              style={{ position: "relative" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {passwordError && (
              <p className="passwordError-text">{passwordError}</p>
            )}
             {/* Forgot Password Link */}
    <p className="forgot-password-text"
      onClick={async () => {
        if (email) {
          if (!email.trim()) return alert("Enter your email first!");
          try {
            await sendOtpToEmail(email);
            alert("OTP sent to your email!");
            localStorage.setItem("forgotEmail", email); // save for next page
            window.location.href = "/auth/forgot-password";
          } catch (err) {
            console.error(err);
            alert(err.error || "Failed to send OTP");
          }
        } else if (phone) {
          if (!phone.trim()) return alert("Enter your phone first!");
          localStorage.setItem("forgotPhone", `${selectedCode}${phone.trim()}`);
          window.location.href = "/auth/forgot-password";
        } else {
          alert("Enter your email or phone first.");
        }
      }}
    >
      Forgot Password?
    </p>
          </div>
        )}

        {step === "set-password" && (
          <div className="register-page-input" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Set a password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {passwordError && (
              <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
            )}
          </div>
        )}

        <div className="register-page-policy">
          <p>
            By continuing, I agree to Knob’s <strong>Privacy Policy</strong> and{" "}
            <strong>Terms of Use.</strong>
          </p>
        </div>

        <div className="continue-btn-div">
          {step === "otp" && (
            <button onClick={() => setStep("enter")} className="back-btn">
              Back
            </button>
          )}
          {step === "otp" && (
            <button onClick={sendOtp} className="resend-btn" disabled={loading}>
              Resend OTP
            </button>
          )}

          {step !== "set-password" && (
            <button
              className="register-page-btn"
              onClick={
                step === "enter"
                  ? handleContinue
                  : step === "otp"
                  ? verifyOtp
                  : step === "otp-email"
                  ? handleVerifyEmailOtp
                  : loginWithEmail
              }
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : step === "enter"
                ? "Continue"
                : step === "otp"
                ? "Verify OTP"
                : step === "otp-email"
                ? "Verify OTP"
                : "Login"}
            </button>
          )}

          {step === "set-password" && (
            <button
              className="register-page-btn"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          )}
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </>
  );
}

export default AuthAccount;
