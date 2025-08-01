import React, { useEffect, useRef, useState } from "react";
import "./AuthAccount.css";
import { useNavigate } from "react-router-dom";
import logoImage from "../../../Assets/logo.png";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import countryCodes from "../../../Assets/CountryCodes.json";

function AuthAccount() {
  const [countries, setCountries] = useState([]);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enter");
  const [password, setPassword] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();
  const recaptchaVerifier = useRef(null);

  // Initialize reCAPTCHA once
  useEffect(() => {
    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired");
          },
        }
      );

      recaptchaVerifier.current.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }

    setCountries(countryCodes);
  }, []);

  const loginWithEmail = () => {
  if (!email || !password) {
    return alert("Please enter both email and password.");
  }

  // Replace this with your actual login logic
  alert(`Logging in with ${email} / ${password}`);
  navigate("/");
};
  const handleContinue = () => {
    if (email && !phone) {
      setStep("password");
    } else if (phone && !email) {
      sendOtp();
    } else {
      alert("Please enter either phone number or email.");
    }
  };

  const sendOtp = async () => {
    if (!phone) return alert("Enter phone number");

    const phoneNumber = `${selectedCode}${phone}`;

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(result);
      setStep("otp");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. " + error.message);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Enter the OTP");
    try {
      await confirmationResult.confirm(otp);
      alert("OTP verified!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

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
                  <option key={c.dial_code} value={c.dial_code}>
                    {c.name} ({c.dial_code})
                  </option>
                ))}
              </select>
            </div>

            <div className="register-page-input phone-input-wrapper">
              <span className="country-code">{selectedCode}</span>
              <input
                type="text"
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
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
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
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button onClick={sendOtp} className="resend-btn">
              Resend OTP
            </button>
          )}
          <button
            className="register-page-btn"
            onClick={
              step === "enter"
                ? handleContinue
                : step === "otp"
                ? verifyOtp
                : loginWithEmail
            }
          >
            {step === "enter"
              ? "Continue"
              : step === "otp"
              ? "Verify OTP"
              : "Login"}
          </button>
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </>
  );
}

export default AuthAccount;
