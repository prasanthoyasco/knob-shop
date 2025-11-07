import React, { useState, useEffect } from "react";
import image from "../../../Assets/Untitled/auth-side.jpg";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Signup,
  sendOtpToEmail,
  verifyEmailOtp,
  checkUser,
  getUserById,
} from "../../../API/authApi";
import { getGstDetails } from "../../../API/gstApi"; // <-- new API for GST info
import VerificationSuccess from "./VerificationSuccess";

function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [gstLoading, setGstLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
    gstNumber: "",
    companyName: "",
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    }, // Initialize address as an object
  });
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [session, setSession] = useState(null);
  const [canResend, setCanResend] = useState(false);

  // Mask email for OTP step
  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) return "****@" + domain;
    return `${localPart[0]}****${localPart.slice(-1)}@${domain}`;
  };

  // Timer logic for resend OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      // Check if the input name is for an address field
      const field = name.split(".")[1]; // Extract the actual field name (e.g., "street")
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value, // Update the specific nested address field
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Step 1: Signup form submission (send OTP)
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email) return setError("Please enter your email.");
    if (!formData.password || !formData.confirmPassword)
      return setError("Please enter and confirm your password.");
    if (formData.password.length < 4)
      return setError("Password must be at least 4 characters long.");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match!");

    try {
      setLoading(true);
      // Check both email and phone in a single call
      const userCheck = await checkUser({
        email: formData.email,
        phone: formData.phone,
      });

      if (userCheck.emailExists) {
        setError("User already exists with this email! Please log in.");
        return;
      }

      if (userCheck.phoneExists) {
        setError("User already exists with this phone number! Please log in.");
        return;
      }

      const resOtp = await sendOtpToEmail(formData.email);
      setSuccess(resOtp.message || "OTP sent successfully!");
      setStep(2);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setResending(true);
    try {
      const res = await sendOtpToEmail(formData.email);
      setSuccess(res.message || "New OTP sent successfully!");
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError(err.error || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  // Step 2: Verify OTP → move to profile creation
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await verifyEmailOtp(formData.email, formData.otp);
      setStep(3); // Move to profile details form
    } catch (err) {
      setError(err.error || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch GST details if GST number entered
  const handleGstBlur = async () => {
    const gstin = formData.gstNumber?.trim();
    if (!gstin) {
      setError(""); // Clear error if GSTIN is empty
      setFormData((prev) => ({
        ...prev,
        companyName: "",
        address: { street: "", city: "", district: "", state: "", pincode: "" },
      }));
      return;
    }

    try {
      setGstLoading(true);
      setError("");
      setSuccess("");

      const res = await getGstDetails(gstin);
      console.log("GST API Response:", res);

      const gstData = res?.data || res; // handle both shapes

      if (gstData && (gstData.lgnm || gstData.tradeName)) {
        const fullAddress = gstData.address || "";
        let parsedAddress = {
          street: "",
          city: "",
          district: "",
          state: "",
          pincode: "",
        };

        // --- Address Parsing Logic ---
        // 1. Extract Pincode (6 digits, usually at the end)
        const pincodeMatch = fullAddress.match(/(\d{6})\s*$/);
        if (pincodeMatch) {
          parsedAddress.pincode = pincodeMatch[1];
        }

        // 2. Extract State (common Indian states)
        const indiaStates = [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal",
          "Andaman and Nicobar Islands",
          "Chandigarh",
          "Dadra and Nagar Haveli and Daman and Diu",
          "Delhi",
          "Jammu and Kashmir",
          "Ladakh",
          "Lakshadweep",
          "Puducherry",
        ];
        const stateMatch = indiaStates.find((state) =>
          fullAddress.toLowerCase().includes(state.toLowerCase())
        );
        if (stateMatch) {
          parsedAddress.state = stateMatch;
        }

        // 3. Split by commas to try and find city/district
        const addressParts = fullAddress
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean);

        // Remove pincode and state from parts if already extracted
        let remainingParts = [...addressParts];
        if (parsedAddress.pincode) {
          remainingParts = remainingParts.filter(
            (p) => p !== parsedAddress.pincode
          );
        }
        if (parsedAddress.state) {
          remainingParts = remainingParts.filter(
            (p) => !p.toLowerCase().includes(parsedAddress.state.toLowerCase())
          );
        }

        // Attempt to find city and district from remaining parts, usually towards the end
        // This is heuristic and might need adjustment based on typical address formats
        if (remainingParts.length >= 2) {
          parsedAddress.district = remainingParts[remainingParts.length - 1];
          parsedAddress.city = remainingParts[remainingParts.length - 2];
          remainingParts = remainingParts.slice(0, remainingParts.length - 2);
        } else if (remainingParts.length === 1) {
          parsedAddress.city = remainingParts[0];
          remainingParts = [];
        }

        // The rest is assumed to be street/building
        parsedAddress.street = remainingParts.join(", ");

        setFormData((prev) => ({
          ...prev,
          companyName: gstData.lgnm || gstData.tradeName || prev.companyName,
          address: parsedAddress,
        }));
        setSuccess("GST details fetched successfully!");
        console.log("Parsed GST Address:", formData.address);
      } else {
        setError("Could not fetch GST details. Please check your GSTIN.");
        // Clear address if GST details cannot be fetched
        setFormData((prev) => ({
          ...prev,
          companyName: prev.companyName, // Keep existing company name if user entered
          address: {
            street: "",
            city: "",
            district: "",
            state: "",
            pincode: "",
          },
        }));
      }
    } catch (err) {
      console.error("GST Fetch Error:", err);
      setError("Invalid GST number or fetch failed.");
      setFormData((prev) => ({
        ...prev,
        companyName: prev.companyName, // Keep existing company name if user entered
        address: { street: "", city: "", district: "", state: "", pincode: "" },
      }));
    } finally {
      setGstLoading(false);
    }
  };

  // Step 3: Complete profile and finalize signup
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gstNumber: formData.gstNumber,
        companyName: formData.companyName,
        address: formData.address,
      };

      const res = await Signup(payload);
      localStorage.setItem("authToken", res.token);
      const fullUser = await getUserById(res.user.id);
      localStorage.setItem("authUser", JSON.stringify(fullUser.user));

      const pendingSession = localStorage.getItem("pendingPaymentSession");
      setSession(JSON.parse(pendingSession));
      setVerified(true);
    } catch (err) {
      setError(err.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect on success
  if (verified) {
    return (
      <VerificationSuccess
        onComplete={() => {
          if (session?.redirectUrl) {
            navigate(session.redirectUrl, {
              state: {
                formData: session.formData || null,
                cartItems: session.cartItems || [],
              },
            });
          } else {
            navigate("/");
          }
        }}
      />
    );
  }

  return (
    <div className="login-container">
      {/* Left Side */}
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

      {/* Right Side */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Step 1: Basic Signup */}
          {step === 1 && (
            <form className="login-form" onSubmit={handleSignup}>
              <h1 className="form-heading m-0">Sign Up</h1>
              <label className="form-label">Full Name</label>
              <input
                placeholder="Your full name"
                required
                className="form-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <label className="form-label">Email</label>
              <input
                placeholder="Your email"
                required
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label className="form-label">Phone Number</label>
              <input
                placeholder="Your phone"
                className="form-input"
                type="text"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only digits
                  const cleaned = value.replace(/\D/g, "");

                  // If user tries to enter +91 or more than 10 digits
                  if (value.startsWith("+91") || cleaned.length > 10) {
                    setError(
                      "Don’t add +91 before your number — enter only 10 digits."
                    );
                    return;
                  }

                  // Clear error if they correct it
                  if (
                    error &&
                    cleaned.length <= 10 &&
                    !value.startsWith("+91")
                  ) {
                    setError("");
                  }

                  setFormData((prev) => ({
                    ...prev,
                    phone: cleaned,
                  }));
                }}
              />

              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  placeholder="Enter password"
                  required
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  minLength={4}
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
              {formData.password && formData.password.length < 4 && (
                <p className="error-text">
                  Password must be at least 4 characters.
                </p>
              )}

              <label className="form-label">Confirm Password</label>
              <input
                placeholder="Confirm password"
                required
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                minLength={4}
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <button
                type="submit"
                className="login-btn mt-3"
                disabled={loading}
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
              <div className="text-center">
                <Link to="/auth/login" className="signup-btn">
                  Already have an account?
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: Verify OTP */}
          {step === 2 && (
            <form className="login-form" onSubmit={handleVerifyOtp}>
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
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="resend-otp-container">
                {canResend ? (
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    {resending ? "Sending..." : "Resend OTP"}
                  </button>
                ) : (
                  <p className="resend-timer">Resend in {timer}s</p>
                )}
              </div>
            </form>
          )}

          {/* Step 3: Profile Details */}
          {step === 3 && (
            <form className="login-form" onSubmit={handleProfileSubmit}>
              <h1 className="form-heading">Complete Your Profile</h1>

              <label className="form-label">GST Number (optional)</label>
              <div className="gst-input-wrapper">
                <input
                  placeholder="Enter GST number"
                  className="form-input"
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  onBlur={handleGstBlur}
                />
                {gstLoading && (
                  <div className="gst-loader">
                    <i className="bi bi-arrow-repeat loadingspin"></i>
                  </div>
                )}
              </div>

              <label className="form-label">Company Name</label>
              <input
                placeholder="Your company name"
                className="form-input"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />

              <label className="form-label">Address</label>

              <input
                placeholder="Street"
                className="form-input"
                name="address.street" // Use dot notation for nested state
                value={formData.address?.street || ""}
                onChange={handleChange}
              />

              <div className="address-row">
                <input
                  placeholder="City"
                  className="form-input half"
                  name="address.city"
                  value={formData.address?.city || ""}
                  onChange={handleChange}
                />

                <input
                  placeholder="District"
                  className="form-input half"
                  name="address.district"
                  value={formData.address?.district || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="address-row">
                <input
                  placeholder="Pincode"
                  className="form-input half"
                  name="address.pincode"
                  value={formData.address?.pincode || ""}
                  onChange={handleChange}
                />

                <input
                  placeholder="State"
                  className="form-input half"
                  name="address.state"
                  value={formData.address?.state || ""}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Finish Signup"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
