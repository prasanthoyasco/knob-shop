import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import Footer from "../Footer/Footer";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import { useNavigate, useLocation } from "react-router-dom";
import { createDTDCConsignment } from "../../API/createOrderConsigment";
import { createOrderWithShipping } from "../../API/orderApi";
import { initiateTransaction } from "../../API/paymentApi";
import StoreLocator from "./StoreLocator";
import { getAvailableCoupons, validateCoupon } from "../../API/CouponApi";
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", 
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", 
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", 
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", 
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", 
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", 
  "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
  "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", 
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
  "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", 
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];
const cardImages = [
  "/payment-icon/discover.svg",
  "/payment-icon/master.svg",
  "/payment-icon/paypal.svg",
  "/payment-icon/visa.svg",
];

function PaymentPage() {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("authUser")) || {};
    } catch {
      return {};
    }
  })();

  const Userid = storedUser.id || storedUser._id;
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

  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const navigate = useNavigate();

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
    getAvailableCoupons()
      .then(setAvailableCoupons)
      .catch(console.error);
  }, []);
console.log("Available Coupons:", availableCoupons);
  useEffect(() => {
    if (storedUser) {
      setContactInfo(storedUser.email || "");
      setMobileInfo(storedUser.phone || storedUser.mobile || "");
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

  const applyCoupon = async () => {
    if (!Userid) {
      alert("Please login to use a coupon");
      return;
    }

    try {
      const data = await validateCoupon(Userid, couponCode);

      let discountValue = 0;
      if (data.type === "percent") {
        discountValue = (subtotal * data.discount) / 100;
      } else {
        discountValue = data.discount;
      }

      setDiscount(discountValue);
      setCouponApplied(true);
      alert("Coupon applied successfully!");
    } catch (err) {
      alert(err.message || "Coupon error");
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

  const handlePayment = async () => {
    setPaying(true);
    try {
      if (!Userid) {
        alert("Please login before payment");
        navigate("/auth/register");
        return;
      }

      const totalValue = subtotal;

      const shippingData = {
        name: `${shippingFirstName} + ' ' + ${shippingLastName}`,
        phone: contactInfo,
        alternate_phone: mobileInfo || contactInfo,
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
        state: billingState || "Tamil Nadu",
        zip: billingZip,
        country: "India",
        phone: contactInfo,
        email: contactInfo.includes("@") ? contactInfo : "test@example.com",
      };

      const items = cartItems.map((item) => ({
        productId:
          item._id || item.id || item?.productId || item?.productId._id,
        productName: item.title || item.productName || item?.productId?.name,
        quantity: item.quantity,
        price: item.price || item?.productId?.variant[0].sizes[0].sellingPrice,
        total: (item.price || 0) * item.quantity,
      }));

      let referenceNumber = "";
      let orderId = `ORDER-${Date.now()}`;

      if (deliveryOption === "ship") {
        const dtdcPayload = {
          _id: orderId,
          invoiceNo: `INV-${Date.now()}`,
          invoiceDate: new Date().toISOString().split("T")[0],
          totalAmount: totalValue,
          ewayBill: "12345678",
          shippingAddress: shippingData,
          cartItems,
          dimensions: {
            length: 70,
            width: 70,
            height: 65,
            weight: cartItems
              .reduce((sum, item) => sum + (item.weight || 1), 0)
              .toFixed(1),
          },
        };
        const dtdcResponse = await createDTDCConsignment(dtdcPayload);
        referenceNumber =
          dtdcResponse?.data?.[0]?.customer_reference_number || "N/A";
      }

      const orderData = {
        userId: Userid,
        items,
        totalAmount: totalValue,
        shippingAddress:
          deliveryOption === "ship" ? shippingData : pickupAddress,
        dtdcReferenceNumber:
          deliveryOption === "ship" ? referenceNumber : "PICKUP",
        deliveryMode: deliveryOption,
        paymentMethod: "online",
        paymentStatus: "pending",
        status: "pending",
      };

      const { order } = await createOrderWithShipping(orderData);

      localStorage.setItem(
        "latestInvoiceData",
        JSON.stringify({
          shippingAddress:
            deliveryOption === "ship" ? shippingData : pickupAddress,
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
    }

    return !!pickupAddress;
  };
  return (
    <>
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
              {!Userid && <a href="login">Log in</a>}
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

            <i class="bi bi-shop"></i>
          </div>
          {deliveryOption === "ship" && (
            <div className="shop-conatiner">
                <select className="select-box">
                <option value="" disabled>Select your country</option>
  {countries.map((state) => (
    <option key={state} value={state}>{state}</option>
  ))}
                </select>
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
  <option value="" disabled>Select your state</option>
  {indianStates.map((state) => (
    <option key={state} value={state}>{state}</option>
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
                <select className="select-box">
                <option value="" disabled>Select your country</option>
  {countries.map((state) => (
    <option key={state} value={state}>{state}</option>
  ))}
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
  <option value="" disabled>Select your state</option>
  {indianStates.map((state) => (
    <option key={state} value={state}>{state}</option>
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

          {/* <div className="payment-section">
            <h3 className="contact-con-head-h3">Payment</h3>
            <p>All transactions are secure and encrpted</p>
            <div className="card-container">
              <div className="payment-page-delivery-sec">
                <label className="radio-btn-delivery-text">
                  <input
                    type="radio"
                    name="payment"
                    className="radio-input"
                    value="credit"
                    checked={selectedPayment === "credit"}
                    onChange={() => setSelectedPayment("credit")}
                  />
                  <span className="radio-btn-delivery"></span>
                  <p className="radio-btn-text">Credit Card</p>
                </label>
              </div>
              {selectedPayment === "credit" && (
                <div className="shop-conatiner-payemnt">
                  <input
                    type="text"
                    className="contact-con-input"
                    placeholder="Card Number"
                  />
                  <div className="first-last-name-input-div">
                    <input
                      type="text"
                      placeholder="Expiration Date (MM / YY)"
                      className="first-name-input"
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      className="first-name-input"
                    />
                  </div>
                  <input
                    type="text"
                    className="contact-con-input"
                    placeholder="Name on card"
                  />
                  <div className="card-image-payment">
                    {cardImages.map((image) => (
                      <img src={image} />
                    ))}
                  </div>
                </div>
              )}
              <div className="payment-page-delivery-sec">
                <label className="radio-btn-delivery-text">
                  <input
                    type="radio"
                    name="payment"
                    className="radio-input"
                    value="upi"
                    checked={selectedPayment === "upi"}
                    onChange={() => setSelectedPayment("upi")}
                  />
                  <span className="radio-btn-delivery"></span>
                  <p className="radio-btn-text">UPI</p>
                </label>
              </div>
              {selectedPayment === "upi" && (
                <div className="upi-inside-container">
                  <div className="scaner">
                    <p>Scan and pay by any UPI app on your phone</p>
                    <div className="upi-image-payment">
                      {cardImages.map((image) => (
                        <img src={image} />
                      ))}
                    </div>
                    <div className="qr-code-con">
                      <p>Generate QR Code</p>
                    </div>
                  </div>
                  <div className="enter-upi-id-div">
                    <h6>Pay with UPI id</h6>
                    <p>Enter your UPI id</p>
                    <input
                      type="text"
                      placeholder="UPI id"
                      className="contact-con-input"
                    />
                  </div>
                </div>
              )}
            </div>
          </div> */}
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
              {couponApplied ? "Applied" : "Apply"}
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
                    onClick={() => {
                      setCouponCode(coupon.code);
                      if (!couponApplied) applyCoupon();
                    }}
                  >
                    {coupon.code} —{" "}
                    {coupon.type === "percent"
                      ? `${coupon.value}% Off`
                      : `₹${coupon.value} Off`}
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
            {cardImages.map((image) => (
              <img src={image} />
            ))}
          </div>
        </div>
        <div className="payment-page-right-side">
          {deliveryOption === "pickup" ? (
            <strong>Pay now and Pick from store after 24 hours</strong>
          ) : (
            <>
              <h5>Arriving 19 jun 2025</h5>
              <p>If you order in the next 20 hours and 34 minutes</p>{" "}
            </>
          )}
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
                        <strong>{item?.productId?.brand || item?.brand}</strong>
                      </p>
                    ))}
                  <h3>
                    {(() => {
                      const safeTitle =
                        item?.title || item?.productId.name || ""; // Fallback to empty string
                      const words = safeTitle.split(" ").slice(0, 5);
                      const line = words.join(" ");
                      return `${line}${
                        safeTitle.split(" ").length > 5 ? "..." : ""
                      }`;
                    })()}
                  </h3>
                  {item?.productId?.variant[0]?.title ||
                    item?.colorsText ||
                    (item?.variant[0]?.title && (
                      <p>
                        Color:{" "}
                        <strong>
                          {item.colorsText ||
                            item.color ||
                            item?.productId?.variant[0]?.title}
                        </strong>
                      </p>
                    ))}
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

          <div className="total-calc">
            <div className="sub-cal">
              <p>Subtotal</p>
              <p>₹ {subtotal.toLocaleString("en-IN")}</p>
            </div>
            {discount > 0 && (
              <div className="sub-cal">
                <p>Coupon Discount</p>
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
