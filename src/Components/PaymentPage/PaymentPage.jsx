import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import Footer from "../Footer/Footer";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import { useNavigate, useLocation } from "react-router-dom";
import { createDTDCConsignment } from "../../API/createOrderConsigment";
import { createOrderWithShipping } from "../../API/orderApi";
import { initiateTransaction } from "../../API/paymentApi";
import Confetti from "react-confetti";
import StoreLocator from "./StoreLocator";
import happyAnim from "../../Assets/CategoriesImge/Knob Shop/heart.json";
import { getAvailableCoupons, validateCoupon } from "../../API/CouponApi";
import Lottie from "lottie-react";
import { getAddressByUserId } from "../../API/addressApi";
import axios from "axios";
import { generateEwayBill } from "../../utils/ewayBill";
const indianStates = [
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
const cardImages = [
  "/payment-icon/discover.svg",
  "/payment-icon/master.svg",
  "/payment-icon/paypal.svg",
  "/payment-icon/visa.svg",
];

function PaymentPage() {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("authUser")) || {};
    } catch {
      return {};
    }
  })();

  var Userid = storedUser.id || storedUser._id;
  const [deliveryOption, setDeliveryOption] = useState("ship");
  const [pickupAddress, setPickupAddress] = useState("");
  const [showStoreInfo, setShowStoreInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [mobileInfo, setMobileInfo] = useState("");
  const [contactCompleted, setContactCompleted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingState, setShippingState] = useState("");

  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);

  const [paymentStarted, setPaymentStarted] = useState(false);
  const [encRequest, setEncRequest] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [paying, setPaying] = useState(false);

  const [showFields, setShowFields] = useState(false);
  const [Applying, setApplying] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [gstData, setGstData] = useState(null);
  const [error, setError] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const navigate = useNavigate();
  const API_KEY = "848cf9974177b193fdcae5d1a8ab5efb";

  const handleGstBlur = async (val) => {
    // If val is event, fall back to state
    const gst = typeof val === "string" ? val : gstNumber;
    console.log("GST to validate:", gst);

    if (!gst || gst.length !== 15) {
      setError("GST number must be 15 characters long");
      return;
    } else if (gstData?.gstin === gst) {
      setError(null);
      return;
    }

    try {
      setError(null);
      const url = `https://gst-return-status.p.rapidapi.com/free/gstin/${gst}`;
      const { data } = await axios.get(url, {
        headers: {
          "x-rapidapi-key":
            "482b251a62msh4859eb060f58367p106744jsnc8920f169fe5",
          "x-rapidapi-host": "gst-return-status.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      });

      console.log("GST API Response:", data);
      setGstData(data.data);

      if (data.data?.lgnm) {
        setCompanyName(data.data.lgnm);
      }
    } catch (err) {
      console.error("GST API error:", err);
      setError("Failed to fetch GST details. Please try again.");
    }
  };

  console.log(gstData);
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const today = new Date();

  // Example: delivery window = +2 to +5 days from today
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 2);

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 5);

  const handleCheckboxChange = (e) => {
    setShowFields(e.target.checked);
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.price ||
        item?.productId.variant?.[0]?.sizes?.[0]?.sellingPrice ||
        0) *
        item.quantity,
    0
  );

  useEffect(() => {
      if (!cartItems?.length) return;
    getAvailableCoupons()
      .then((coupons) => {
        console.log(coupons);
        const filteredCoupons = coupons.filter((coupon) => {
          if (coupon.appliesTo === "all") return true;

          if (coupon.appliesTo === "single" && coupon.productId) {
            return cartItems.some((item) => {
              const itemId =
                item._id ??
                item.id ??
                item.productId?._id ??
                item.productId ??
                null;

              return String(itemId) === String(coupon.productId);
            });
          }
          return false;
        });

        setAvailableCoupons(filteredCoupons);
      })
      .catch(console.error);
  }, [cartItems]);

  useEffect(() => {
    if (storedUser) {
      setContactInfo(storedUser.email || "");
      setMobileInfo(storedUser?.phone || storedUser?.mobile || "");
    }
  }, [storedUser]);

  useEffect(() => {
    setDeliveryCompleted(
      Boolean(
        shippingFirstName.trim() &&
          shippingLastName.trim() &&
          shippingAddress.trim() &&
          shippingCity.trim() &&
          shippingZip.trim()
      )
    );
  }, [
    shippingFirstName,
    shippingLastName,
    shippingAddress,
    shippingCity,
    shippingZip,
  ]);

  const applyCoupon = async (coupon) => {
    setApplying(true);
    if (!Userid) {
      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      Userid = storedUser.id || storedUser._id;
      return;
    }
    try {
      const data = await validateCoupon(Userid, couponCode || coupon);
      let discountValue = 0;
      if (data.type === "percent" || data.type === "percentage") {
        discountValue = (subtotal * data.discount) / 100;
      } else {
        discountValue = data.discount;
      }

      setDiscount(discountValue);
      setCouponApplied(true);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 15000);
    } catch (err) {
      console.log(err);
      alert("Coupon error");
    } finally {
      setApplying(false);
    }
  };

  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);

    if (checked) {
      setBillingFirstName(shippingFirstName);
      setBillingLastName(shippingLastName);
      setBillingAddress(shippingAddress);
      setBillingCity(shippingCity);
      setBillingState(shippingState);
      setBillingZip(shippingZip);
    } else {
      setBillingFirstName("");
      setBillingLastName("");
      setBillingAddress("");
      setBillingCity("");
      setBillingState("");
      setBillingZip("");
    }
  };
  const COUPON_EXPIRY = 1 * 60 * 1000;

  // 🔄 On component load, check localStorage
  useEffect(() => {
    const storedCoupon = localStorage.getItem("appliedCoupon");
    if (storedCoupon) {
      const { expiry } = JSON.parse(storedCoupon);
      const now = Date.now();

      if (now > expiry) {
        localStorage.removeItem("appliedCoupon");
      }
    }
  }, []);

  const handlePayment = async () => {
    setPaying(true);
    try {
       let ewayBill = null;
      if (!Userid) {
        alert("Please login before payment");
        navigate("/auth/register");
        return;
      }

      const totalValue = Math.max(0, subtotal - discount);

      if (totalValue >= 50000) {
      ewayBill = await generateEwayBill(order);
      console.log("Generated eWay Bill:", ewayBill);
    }

      const shippingData = {
        name: `${shippingFirstName} + ' ' + ${shippingLastName}`,
        phone: mobileInfo,
        alternate_phone: mobileInfo,
        street: shippingAddress,
        city: shippingCity,
        district: shippingCity,
        pincode: shippingZip,
        state: shippingState || "Tamil Nadu",
      };

      const billingData = {
        name: `${billingFirstName} ${billingLastName}`,
        street: billingAddress,
        city: billingCity,
        district: billingCity, // 👈 using city as district (or add a separate billingDistrict field if available)
        state: billingState || "Tamil Nadu",
        pincode: billingZip, // 👈 renamed from zip → pincode
        country: "India",
        phone: mobileInfo, // 👈 only set if it’s not an email
        email: contactInfo.includes("@") ? contactInfo : "test@example.com",
      };

      const items = cartItems.map((item) => {
        const unitPrice =
          item.price ||
          item?.productId?.variant?.[0]?.sizes?.[0]?.sellingPrice ||
          0;

        return {
          productId:
            item._id || item.id || item?.productId?._id || item?.productId,
          productName: item.title || item.productName || item?.productId?.name,
          quantity: item.quantity,
          price: unitPrice, // individual item price
          total: unitPrice * item.quantity, // total for this item
        };
      });

      let referenceNumber = "";
      let orderId = `ORDER-${Date.now()}`;

      if (deliveryOption === "ship") {
        const dtdcPayload = {
          _id: orderId,
          SKU: items.productId,
          invoiceNo: `INV-${Date.now()}`,
          invoiceDate: new Date().toISOString().split("T")[0],
          totalAmount: totalValue,
          ewayBill: ewayBill,
          shippingAddress: shippingData,
          cartItems,
          dimensions: {
            length: 0,
            width: 0,
            height: 0,
            weight: cartItems
              .reduce((sum, item) => sum + (item.weight || 1), 0)
              .toFixed(1),
          },
        };
        const dtdcResponse = await createDTDCConsignment(dtdcPayload);
        console.log("dtdc refference number :", dtdcResponse);
        localStorage.setItem(
          "dtdcReferenceNumber",
          JSON.stringify(dtdcResponse)
        );
        referenceNumber = dtdcResponse?.data?.[0]?.reference_number || "N/A";
      }
      localStorage.setItem("referenceNumber", JSON.stringify(referenceNumber));
      if (showFields) {
        if (!gstNumber.trim() || !companyName.trim()) {
          alert("Please enter both GST Number and Company Name");
          return;
        }
        if (!gstRegex.test(gstNumber.trim())) {
          alert("Invalid GST Number format. Please enter a valid GSTIN.");
          return;
        }
      }

      const orderData = {
        userId: Userid,
        items,
        totalAmount: totalValue,
        shippingAddress: deliveryOption === "ship" ? shippingData : billingData,
        dtdcReferenceNumber:
          deliveryOption === "ship" ? referenceNumber : "PICKUP",
        deliveryMode: deliveryOption,
        paymentMethod: "online",
        paymentStatus: "pending",
        status: "pending",
        gstNumber: gstNumber,
        companyName: companyName,
      };

      const { order } = await createOrderWithShipping(orderData);

      localStorage.setItem(
        "latestInvoiceData",
        JSON.stringify({
          shippingAddress: deliveryOption === "ship" ? shippingData : null,
          cartItems,
          totalAmount: totalValue,
          dtdcReferenceNumber:
            deliveryOption === "ship" ? referenceNumber : "PICKUP",
          userId: Userid,
          paymentMethod: "online",
          invoiceDate: new Date().toLocaleDateString(),
          orderId: order.orderId,
        })
      );
      const expiry = Date.now() + COUPON_EXPIRY;
      localStorage.setItem(
        "appliedCoupon",
        JSON.stringify({ code: couponCode, expiry })
      );
      const ccResponse = await initiateTransaction({
        orderId: order?.orderId,
        amount: totalValue,
        currency: "INR",
        billing_name: storedUser?.name || billingData.name || "Guest",
        billing_address:
          deliveryOption === "ship" ? billingData.street : "In-store Pickup",
        billing_city:
          deliveryOption === "ship" ? billingData.city : "Coimbatore",
        billing_state:
          deliveryOption === "ship" ? billingData.state : "Tamil Nadu",
        billing_zip: deliveryOption === "ship" ? billingData.zip : "641002",
        billing_country: billingData.country || "India",
        billing_tel: billingData.phone || contactInfo,
        billing_email:
          billingData.email || contactInfo.includes("@")
            ? contactInfo
            : "test@example.com",
      });

      setEncRequest(ccResponse.encRequest);
      setAccessCode(ccResponse.accessCode);
      setMerchantId(ccResponse.merchantId);
      setPaymentStarted(true);
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("Order failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  useEffect(() => {
    if (paymentStarted && encRequest && accessCode && merchantId) {
      setRedirecting(true); // show loader first

      setTimeout(() => {
        window.location.href = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${merchantId}&encRequest=${encRequest}&access_code=${accessCode}`;
      }, 1500); // small delay so loader is visible
    }
  }, [paymentStarted, encRequest, accessCode, merchantId]);

  const isValidToPay = () => {
    if (!contactInfo) return false;
    if (deliveryOption === "ship") {
      return [
        shippingFirstName,
        shippingLastName,
        shippingAddress,
        shippingCity,
        shippingZip,
        shippingState,
      ].every((field) => field.trim());
    } else if (deliveryOption === "pickup") {
      return [
        billingFirstName,
        billingLastName,
        billingAddress,
        billingCity,
        billingZip,
        billingState,
      ].every((field) => field.trim());
    }
  };
  return (
    <>
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)", // dark backdrop
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          {/* Confetti background */}
          <Confetti
            numberOfPieces={300}
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
          />

          {/* Popup card */}
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              minWidth: "400px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative",
              zIndex: 2100, // above confetti
            }}
          >
            <div style={{ height: "60px", marginBottom: "2rem" }}>
              <Lottie
                animationData={happyAnim}
                loop={true}
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
              Coupon Applied!
            </h2>
            <p style={{ fontSize: "1rem", marginBottom: "1.5rem" }}>
              You saved ₹{discount}
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                background: "#ab7b53",
                color: "#fff",
                border: "none",
                marginTop: "1rem",
                padding: "0.6rem 1.2rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <NavbarTop />
      <div className="payment-page-container">
        {redirecting && (
          <div className="redirect-loader">
            <p>Redirecting to secure payment gateway...</p>
            <div className="spinner"></div>
          </div>
        )}
        <div className="payment-page-left-side">
          <div className="contact-container">
            <div className="contact-con-head">
              <h3 className="contact-con-head-h3">CONTACT</h3>
              {!Userid && <a href="/auth/login">Log in</a>}
            </div>
            <input
              type="text"
              placeholder="Email Address"
              className="contact-con-input mb-3"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              onBlur={() => setContactCompleted(true)}
            />
            <input
              type="text"
              placeholder="Mobile Phone Number"
              className="contact-con-input"
              value={mobileInfo}
              onChange={(e) => setMobileInfo(e.target.value)}
              onBlur={() => setContactCompleted(true)}
            />
            <div className="contact-con-checkbox-text">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <p>
                Add my GST details and company name for Billing and auto-fill on
                future purchases.{" "}
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  (optional)
                </span>
              </p>
            </div>
            {showFields && (
              <div>
                <input
                  type="text"
                  placeholder="Enter GST Number"
                  name="gstNumber"
                  className="contact-con-input"
                  style={{ margin: "20px 0", textTransform: "uppercase" }}
                  maxLength={15}
                  value={gstNumber}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setGstNumber(value);
                  }}
                  onBlur={handleGstBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleGstBlur();
                    }
                  }}
                />

                <input
                  type="text"
                  placeholder="Enter Company Name"
                  name="companyName"
                  className="contact-con-input"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            )}
            {error && (
              <div
                style={{ color: "red", marginTop: "10px", fontSize: "12px" }}
              >
                {error}
              </div>
            )}
            {gstData && gstNumber && (
              <div style={{ marginTop: "10px", fontSize: "10px" }}>
                <p>
                  GST number <strong>{gstData.gstin}</strong> is valid, the
                  legal name is <strong>{gstData.lgnm}</strong>, status is{" "}
                  <strong
                    style={{
                      color:
                        gstData.sts?.toLowerCase() === "active"
                          ? "green"
                          : "red",
                    }}
                  >
                    {gstData.sts}
                  </strong>
                  {gstData.tradeNam && (
                    <>
                      , and the trade name is{" "}
                      <strong>{gstData.tradeNam}</strong>.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="deliver-section-container">
            <h3 className="contact-con-head-h3">DELIVERY</h3>
            {deliveryCompleted && (
              <div className="entered-delivery-info">
                <p>
                  {shippingFirstName} {shippingLastName}
                </p>
                <p>{shippingAddress}</p>
                <p>
                  {shippingCity} - {shippingZip}
                </p>
              </div>
            )}

            <div
              className="payment-page-delivery-sec"
              style={{ cursor: "pointer" }}
              onClick={() => setDeliveryOption("ship")}
            >
              <label className="radio-btn-delivery-text">
                <input
                  type="radio"
                  name="delivery"
                  className="radio-input"
                  checked={deliveryOption === "ship"}
                  onChange={() => setDeliveryOption("ship")}
                />
                <span className="radio-btn-delivery"></span>
                <p className="radio-btn-text">Ship</p>
              </label>

              <i className="bi bi-truck"></i>
            </div>
          </div>
          <div
            className="payment-page-delivery-sec"
            style={{ cursor: "pointer" }}
            onClick={() => setDeliveryOption("pickup")}
          >
            <label className="radio-btn-delivery-text">
              <input
                type="radio"
                name="delivery"
                className="radio-input"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
              />
              <span className="radio-btn-delivery"></span>
              <p className="radio-btn-text">Pickup in store</p>
            </label>

            <i className="bi bi-shop"></i>
          </div>
          {deliveryOption === "ship" && (
            <div className="shop-conatiner">
              <div className="first-last-name-input-div">
                <input
                  type="text"
                  placeholder="First Name"
                  className="first-name-input"
                  value={shippingFirstName}
                  onChange={(e) => setShippingFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="first-name-input"
                  value={shippingLastName}
                  onChange={(e) => setShippingLastName(e.target.value)}
                />
              </div>
              <input
                type="text"
                className="contact-con-input"
                placeholder="Address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
              <div className="first-last-name-input-div">
                <input
                  type="text"
                  placeholder="City"
                  className="first-name-input"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                />
                <select
                  className="first-name-input"
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Zip Code"
                  className="first-name-input"
                  value={shippingZip}
                  onChange={(e) => setShippingZip(e.target.value)}
                  onBlur={() => setDeliveryCompleted(true)}
                />
              </div>
              <div className="contact-con-checkbox-text">
                <input type="checkbox" />
                <p>Save the information for the next time</p>
              </div>
            </div>
          )}
          {deliveryOption === "pickup" && !showStoreInfo && (
            <div className="pick-conatiner">
              <div className="contact-con-head">
                <h3 className="contact-con-head-h3"> Select Store Location</h3>
              </div>
              <p>
                Currenty There is 2 store with stock at{" "}
                <strong>Coimbatore, Tamil Nadu, India</strong>
              </p>
              <StoreLocator
                onStoreSelect={(store) => setPickupAddress(store)}
              />
              <div className="contact-con-head">
                <h3 className="contact-con-head-h3 mt-4 mb-0">Your Address</h3>
              </div>
              <div className="shop-conatiner mt-3">
                <select
                  className="select-box"
                  disabled
                  title="only inside india available"
                >
                  <option defaultValue>India</option>
                </select>

                <div className="first-last-name-input-div">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="first-name-input"
                    value={billingFirstName}
                    onChange={(e) => setBillingFirstName(e.target.value)}
                    disabled={sameAsShipping}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="first-name-input"
                    value={billingLastName}
                    onChange={(e) => setBillingLastName(e.target.value)}
                    disabled={sameAsShipping}
                  />
                </div>
                <input
                  type="text"
                  className="contact-con-input"
                  placeholder="Address"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  disabled={sameAsShipping}
                />
                <div className="first-last-name-input-div">
                  <input
                    type="text"
                    placeholder="City"
                    className="first-name-input"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    disabled={sameAsShipping}
                  />
                  <select
                    className="first-name-input"
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value)}
                    disabled={sameAsShipping}
                  >
                    <option value="" disabled>
                      Select your state
                    </option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="first-name-input"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    disabled={sameAsShipping}
                    onBlur={() => setDeliveryCompleted(true)}
                  />
                </div>
              </div>
            </div>
          )}
          {deliveryOption === "pickup" && showStoreInfo && (
            <div className="store-location-box">
              <div className="contact-con-head">
                <h3 className="contact-con-head-h3">Select Store Location</h3>
              </div>
              <p>
                Currenty There is 2 store with stock{" "}
                <strong>Coimbatore, Tamil Nadu, India</strong>
              </p>

              <div className="store-info-card">
                <div className="store-info-left">
                  <strong>Chennai</strong> <span>(150 km)</span>
                  <p>
                    There is 1 store with stock close to{" "}
                    <strong>
                      {pickupAddress || "Chennai, Tamil Nadu, India"}
                    </strong>
                  </p>
                </div>
                <div className="store-info-right">
                  <strong>FREE</strong>
                  <p>Usually ready in 24 hours</p>
                </div>
              </div>
            </div>
          )}

          {deliveryOption === "ship" && (
            <div className="shipping-method-container">
              <h3 className="contact-con-head-h3">SHIPPING METHOD</h3>
              <div className="shipping-method-containe-text">
                Enter your shipping address to view available shipping methods
              </div>
              <div className="contact-con-checkbox-text">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={handleSameAsShippingChange}
                />
                <p>Use Shipping address as billing address</p>
              </div>

              <div className="shop-conatiner">
                <div className="first-last-name-input-div">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="first-name-input"
                    value={billingFirstName}
                    onChange={(e) => setBillingFirstName(e.target.value)}
                    disabled={sameAsShipping}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="first-name-input"
                    value={billingLastName}
                    onChange={(e) => setBillingLastName(e.target.value)}
                    disabled={sameAsShipping}
                  />
                </div>

                <input
                  type="text"
                  className="contact-con-input"
                  placeholder="Address"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  disabled={sameAsShipping}
                />
                <div className="first-last-name-input-div">
                  <input
                    type="text"
                    placeholder="City"
                    className="first-name-input"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    disabled={sameAsShipping}
                  />
                  <select
                    className="first-name-input"
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value)}
                    disabled={sameAsShipping}
                  >
                    <option value="" disabled>
                      Select your state
                    </option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="first-name-input"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    disabled={sameAsShipping}
                    onBlur={() => setDeliveryCompleted(true)}
                  />
                </div>
              </div>
            </div>
          )}
          <h3 className="contact-con-head-h3 mt-4">COUPON CODE</h3>

          <div className="d-flex justify-content-between align-items-stretch gap-3 mt-2 coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="first-name-input w-100"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={couponApplied}
            />
            <button
              className="btn btn-dark rounded-0 h-100"
              style={{ padding: "15px 40px", marginTop: "0" }}
              onClick={applyCoupon}
              disabled={couponApplied}
            >
              {Applying ? "Applying..." : couponApplied ? "Applied" : "Apply"}
            </button>
          </div>

          {/* Available Coupons */}
          {availableCoupons?.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 fw-bold">Available Coupons:</p>
              <div className="d-flex flex-wrap gap-2">
                {availableCoupons?.map((coupon) => (
                  <span
                    key={coupon.code}
                    className="badge bg-light text-dark border border-secondary p-2 coupon-badge"
                    style={{ cursor: "pointer" }}
                    disabled={couponApplied}
                    onClick={() => {
                      if (!couponApplied) {
                        setCouponCode(coupon.code);
                        applyCoupon(coupon.code);
                      }
                    }}
                  >
                    {coupon.code} —{" "}
                    {coupon.type === "percentage"
                      ? `${coupon.value}% Off`
                      : `₹${coupon.value} Off`}
                    {coupon.appliesTo === "single" && (
                      <span className="exclusive-badge">Exclusive</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            className="btn pay-now-btn rounded-0"
            disabled={!isValidToPay()}
            onClick={handlePayment}
          >
            {paying ? "Opening payment gateway" : "PAY NOW"}
          </button>
          <hr />
          <div className="card-image-payment">
            {cardImages.map((image, index) => (
              <img key={index} src={image} />
            ))}
          </div>
        </div>
        <div className="payment-page-right-side">
          {deliveryOption === "pickup" ? (
            <strong>Pay now and Pick from store after 24 hours</strong>
          ) : (
            <>
              <h5>
                Arriving {formatDate(startDate)} - {formatDate(endDate)}
              </h5>
              <p>If you order in the next 20 hours and 34 minutes</p>
            </>
          )}
          <div
            className="cart-items-wrapper"
            style={{
              maxHeight: "480px", // adjust as per design
              overflowY: "auto",
              paddingRight: "8px", // to avoid scrollbar overlap
            }}
          >
            {cartItems.map((item, index) => (
              <div key={index} className="payment-product-image-div">
                <div className="payment-product-image">
                  <img
                    src={
                      item.images?.[0] ||
                      item?.variant?.[0]?.images?.[0]?.url ||
                      item.image ||
                      item?.productId.variant?.[0]?.images?.[0]?.url ||
                      "/fallback.png"
                    }
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="payment-product-image-content">
                    {item?.productId?.brand ||
                      (item?.brand && (
                        <p>
                          Brand:{" "}
                          <strong>
                            {item?.productId?.brand || item?.brand}
                          </strong>
                        </p>
                      ))}
                    <h3>
                      {(() => {
                        const safeTitle =
                          item?.title ||
                          item?.productId.name ||
                          item?.name ||
                          ""; // Fallback to empty string
                        const words = safeTitle.split(" ").slice(0, 4);
                        const line = words.join(" ");
                        return `${line}${
                          safeTitle.split(" ").length > 5 ? "..." : ""
                        }`;
                      })()}
                    </h3>
                    {item?.color ? (
                      // ✅ Render color swatch if `item.color` exists
                      <div className="d-flex align-items-center gap-2">
                        <span className="me-1">Color:</span>
                        <span
                          className="rounded-circle border-dark"
                          style={{
                            width: "16px",
                            height: "16px",
                            display: "inline-block",
                            border: "1px solid #000",
                            backgroundColor: item.color,
                          }}
                        ></span>
                      </div>
                    ) : (
                      // ✅ Fallback to text if no color
                      <p>
                        Color:{" "}
                        <strong>
                          {item.colorsText ||
                            item?.productId?.variant?.[0]?.title ||
                            item?.variant?.[0]?.title}
                        </strong>
                      </p>
                    )}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="payment-price">
                  <strong>
                    {" "}
                    ₹{" "}
                    {(
                      item?.price ||
                      item?.productId.variant[0]?.sizes[0].sellingPrice *
                        item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>
                </p>
              </div>
            ))}
          </div>

          <div className="total-calc mt-4">
            <div className="sub-cal">
              <p>Subtotal</p>
              <p>₹ {subtotal.toLocaleString("en-IN")}</p>
            </div>
            {discount > 0 && (
              <div className="sub-cal">
                <p>
                  Coupon Discount{" "}
                  <span style={{ fontSize: "12px" }}>({couponCode})</span>
                </p>
                <p>- ₹ {discount.toLocaleString("en-IN")}</p>
              </div>
            )}
            <div className="sub-cal">
              <h5>Total</h5>
              <h5>
                <strong>
                  ₹ {(subtotal - discount).toLocaleString("en-IN")}
                </strong>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;
