import React, { useState, useEffect, useMemo } from "react";
import "./PaymentPage.css";
import Footer from "../Footer/Footer";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import CCAvenueIframe from "./CCAvenueIframe";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createDTDCConsignment } from "../../API/createOrderConsigment";
import { createOrderWithShipping } from "../../API/orderApi";
import { initiateTransaction } from "../../API/paymentApi";
import StoreLocator from "./StoreLocator";

const cardImages = [
  "/payment-icon/discover.svg",
  "/payment-icon/master.svg",
  "/payment-icon/paypal.svg",
  "/payment-icon/visa.svg",
];
function PaymentPage() {
//   const [couponUsed, setCouponUsed] = useState(false);
// const [couponStatus, setCouponStatus] = useState("");
//   const defaultCoupon = "WELCOME25"; 
//   const [coupon, setCoupon] = useState(defaultCoupon);
//   const [copied, setCopied] = useState(false);

  const storedUser = localStorage.getItem("authUser");
  console.log("Stored User:", JSON.parse(storedUser));
  const Userid = JSON.parse(storedUser)?.id || JSON.parse(storedUser)?._id;
  console.log(Userid);
  const [deliveryOption, setDeliveryOption] = useState("ship");
  const [pickupAddress, setPickupAddress] = useState("");
  console.log("Pickup Address:", pickupAddress);
  const [showStoreInfo, setShowStoreInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [contactCompleted, setContactCompleted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [shipingState, setShipingState] = useState("");
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [encRequest, setEncRequest] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");

  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");

  const [sameAsBilling, setSameAsBilling] = useState(false);

  useEffect(() => {
    if (sameAsBilling) {
      setShippingFirstName(billingFirstName);
      setShippingLastName(billingLastName);
      setShippingAddress(billingAddress);
      setShippingCity(billingCity);
      setShippingState(billingState);
      setShippingZip(billingZip);
    } else {
      // Clear shipping fields if unchecked
      setShippingFirstName("");
      setShippingLastName("");
      setShippingAddress("");
      setShippingCity("");
      setShippingState("");
      setShippingZip("");
    }
  }, [
    sameAsBilling,
    billingFirstName,
    billingLastName,
    billingAddress,
    billingCity,
    billingState,
    billingZip,
  ]);
  

  const [zipCode, setZipCode] = useState("");
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  console.log("Cart Items:", cartItems);
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.price || item.variant?.[0]?.sizes?.[0]?.sellingPrice || 0) *
        item.quantity,
    0
  );
//   const [discount, setDiscount] = useState(0);
// const [finalTotal, setFinalTotal] = useState(subtotal);
// const [couponApplied, setCouponApplied] = useState(false);

  // const handleApply = () => {
  //   if (coupon.trim() === "") {
  //     alert("Please enter a coupon code");
  //     return;
  //   }
  
  //   if (coupon === defaultCoupon) {
  //     const discountValue = subtotal * 0.25; // 25% discount
  //     setDiscount(discountValue);
  //     setFinalTotal(subtotal - discountValue);
  //     setCouponApplied(true);
  //   } else {
  //     alert("Invalid coupon code");
  //     setDiscount(0);
  //     setFinalTotal(subtotal);
  //     setCouponApplied(false);
  //   }
  // };

  // Inside your component, before return(...)
// const handleCopy = () => {
//   navigator.clipboard.writeText(coupon);
//   setCopied(true);
//   setTimeout(() => setCopied(false), 1500);
// };

  useEffect(() => {
    const allFilled =
      firstName.trim() &&
      lastName.trim() &&
      deliveryAddress.trim() &&
      city.trim() &&
      zipCode.trim();
    setDeliveryCompleted(!!allFilled);
  }, [firstName, lastName, deliveryAddress, city, zipCode]);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const totalValue = cartItems.reduce(
        (sum, item) =>
          sum +
          (item.price || item.variant?.[0]?.sizes?.[0]?.sellingPrice || 0) *
            item.quantity,
        0
      );

      const userId = Userid;

      const shippingAddress = {
        name: `${firstName} ${lastName}`,
        phone: contactInfo,
        alternate_phone: contactInfo,
        street: deliveryAddress,
        city: city,
        district: city,
        pincode: zipCode,
        state: shipingState || "Tamil Nadu",
      };

      const items = cartItems.map((item) => ({
        productId: item._id || item?.productId || item.id,
        productName: item.title || item.productName,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));

      let referenceNumber = "";
      let orderId = `ORDER-${Date.now()}`;

      if (deliveryOption === "ship") {
        // Step 1: Create DTDC Consignment
        const dtdcPayload = {
          _id: orderId,
          invoiceNo: `INV-${Date.now()}`,
          invoiceDate: new Date().toISOString().split("T")[0],
          totalAmount: totalValue,
          ewayBill: "12345678",
          shippingAddress,
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

      // Step 2: Create order in your DB
      const orderData = {
        userId,
        items,
        totalAmount: totalValue,
        shippingAddress:
          deliveryOption === "ship" ? shippingAddress : pickupAddress,
        dtdcReferenceNumber:
          deliveryOption === "ship" ? referenceNumber : "PICKUP",
        paymentMethod: "online",
        paymentStatus: "pending",
        status: "pending",
        deliveryMode: deliveryOption,
      };

      const { order } = await createOrderWithShipping(orderData);

      const invoicePayload = {
        shippingAddress:
          deliveryOption === "ship" ? shippingAddress : pickupAddress,
        cartItems,
        totalAmount: totalValue,
        dtdcReferenceNumber:
          deliveryOption === "ship" ? referenceNumber : "PICKUP",
        userId,
        paymentMethod: "online",
        invoiceDate: new Date().toLocaleDateString(),
        orderId: order.orderId,
      };

      localStorage.setItem("latestInvoiceData", JSON.stringify(invoicePayload));

      // Step 3: Initiate CCAvenue Payment
      const ccavenuePayload = {
        orderId: order?.orderId, // Must not be undefined
        amount: totalValue,
        currency: "INR",
        billing_name:
          firstName?.trim() || lastName?.trim()
            ? `${firstName?.trim() || ""} ${lastName?.trim() || ""}`.trim()
            : JSON.parse(storedUser || "{}")?.name || "Guest",

        billing_address:
          deliveryOption === "ship" ? deliveryAddress : "In-store Pickup",
        billing_city: deliveryOption === "ship" ? city : "Coimbatore",
        billing_state: deliveryOption === "ship" ? state : "Tamil Nadu",
        billing_zip: deliveryOption === "ship" ? zipCode : "641002",
        billing_country: "India",
        billing_tel: contactInfo,
        billing_email: contactInfo.includes("@")
          ? contactInfo
          : "test@example.com",
      };

      const ccResponse = await initiateTransaction(ccavenuePayload);
      setEncRequest(ccResponse.encRequest);
      setAccessCode(ccResponse.accessCode);
      setPaymentStarted(true);
    } catch (err) {
      console.error("❌ Error in payment handling:", err);
      alert("Order failed. Please try again.");
    }
  };

  const isValidToPay = () => {
    return (
      contactInfo &&
      billingFirstName &&
      billingLastName &&
      billingAddress &&
      billingCity &&
      billingState &&
      billingZip &&
      shippingFirstName &&
      shippingLastName &&
      shippingAddress &&
      shippingCity &&
      shippingState &&
      shippingZip
    );
  };

  return (
    <>
      <NavbarTop />
      <div className="payment-page-container">
        <div className="payment-page-left-side">
          <div className="contact-container">
            <div className="contact-con-head">
              <h3 className="contact-con-head-h3">CONTACT</h3>
              {/* {contactCompleted && (
  <p className='entered-contact-info'>Entered: {contactInfo}</p>
)} */}

              <a href="login">Log in</a>
            </div>
            <input
              type="text"
              placeholder="Email or Mobile Phone Number"
              className="contact-con-input"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              onBlur={() => setContactCompleted(true)}
            />
            <div className="contact-con-checkbox-text">
              <input type="checkbox" />
              <p>Email me with news and offers</p>
            </div>
          </div>
          <div className="deliver-section-container">
            <h3 className="contact-con-head-h3">DELIVERY</h3>
            {deliveryCompleted && (
              <div className="entered-delivery-info">
                <p>
                  {firstName} {lastName}
                </p>
                <p>{deliveryAddress}</p>
                <p>
                  {city} - {zipCode}
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
                <option>India</option>
                <option>US</option>
                <option>UK</option>
              </select>
              <div className="first-last-name-input-div">
                <input
                  type="text"
                  placeholder="First Name"
                  className="first-name-input"
                  value={billingFirstName}
                  onChange={(e) => setBillingFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="first-name-input"
                  value={billingLastName}
                  onChange={(e) => setBillingLastName(e.target.value)}
                />
              </div>
              <input
                type="text"
                className="contact-con-input"
                placeholder="Address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
              <div className="first-last-name-input-div">
                <input
                  type="text"
                  placeholder="City"
                  className="first-name-input"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                />
                <select
                  className="first-name-input"
                  value={billingState}
                  onChange={(e) => setBillingState(e.target.value)}
                >
                  <option value="">Select State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Andhra">Andhra</option>
                </select>

                <input
                  type="text"
                  placeholder="Zip Code"
                  className="first-name-input"
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value)}
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
                <input type="checkbox"checked={sameAsBilling}
              onChange={(e) => setSameAsBilling(e.target.checked)} />
                <p>Use Shipping address as billing address</p>
              </div>
              <div className="shop-conatiner">
                <select className="select-box">
                  <option>India</option>
                  <option>US</option>
                  <option>UK</option>
                </select>
                <div className="first-last-name-input-div">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="first-name-input"
                    value={shippingFirstName}
                    onChange={(e) => setShippingFirstName(e.target.value)}
                    disabled={sameAsBilling}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="first-name-input"
                    value={shippingLastName}
                    onChange={(e) => setShippingLastName(e.target.value)}
                    disabled={sameAsBilling}
                  />
                </div>
                <input
                  type="text"
                  className="contact-con-input"
                  placeholder="Address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  disabled={sameAsBilling}
                />
                <div className="first-last-name-input-div">
                  <input
                    type="text"
                    placeholder="City"
                    className="first-name-input"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    disabled={sameAsBilling}
                  />
                  <select
                    className="first-name-input"
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    disabled={sameAsBilling}
                  >
                    <option value="">Select State</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra">Andhra</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="first-name-input"
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    disabled={sameAsBilling}
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
          {/* <div className="coupon-text">
            <p>Your Coupon Is Avalible Click button To Apply</p>
          </div>
              <div className="coupon-box">
      <input
        type="text"
        value={coupon}
        readOnly
        onClick={handleCopy}
        className="coupon-input"
      />
<button
  onClick={handleApply}
  disabled={couponApplied}
  className={`apply-btn ${couponApplied ? "applied" : ""}`}
>
  {couponApplied ? "Applied" : "Apply & Continue"}
</button>

    </div> */}
          <button
            className="btn pay-now-btn rounded-0"
            disabled={!isValidToPay()}
            onClick={handlePayment}
          >
            PAY NOW
          </button>
          <hr />
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
                    item.variant?.[0]?.images?.[0]?.url ||
                    item.image ||
                    "/fallback.png"
                  }
                  alt={item.title}
                  loading="lazy"
                />
                <div className="payment-product-image-content">
                  {item.brand && (
                    <p>
                      Brand: <strong>{item.brand}</strong>
                    </p>
                  )}
                  <h3>
                  {(() => {
  const safeTitle = item?.title || ""; // Fallback to empty string
  const words = safeTitle.split(" ").slice(0, 5);
  const line = words.join(" ");
  return `${line}${safeTitle.split(" ").length > 5 ? "..." : ""}`;
})()}

                  </h3>
                  {item.color && (
                    <p>
                      Color: <strong>{item.colorsText || item.color}</strong>
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
                    item.price ||
                    item.variant[0]?.sizes[0].sellingPrice * item.quantity
                  ).toLocaleString("en-IN")}
                </strong>
              </p>
            </div>
          ))}
          <div className="total-calc">
            {deliveryOption !== "pickup" && (
              <div className="sub-cal">
                <p>Subtotal</p>
                <p>₹ {subtotal.toLocaleString("en-IN")}</p>
              </div>
            )}
              {/* {couponApplied && (
    <div className="sub-cal">
      <p style={{ color: "green" }}>Coupon Applied ({coupon})</p>
      <p style={{ color: "green" }}>- ₹ {discount.toLocaleString("en-IN")}</p>
    </div>
  )} */}
            {!deliveryOption === "pickup" && showStoreInfo && (
              <div className="sub-cal">
                <p>Shipping</p>
                <p>₹ 0</p>
              </div>
            )}
            <div className="sub-cal">
              <h5>Total</h5>
              <h5>
                <strong>₹ {subtotal.toLocaleString("en-IN")}</strong>
              </h5>
            </div>
          </div>
        </div>
        {paymentStarted && (
          <div className="ccavenue-modal-overlay">
            <div className="ccavenue-modal-content">
              <button
                className="ccavenue-modal-close"
                onClick={() => setPaymentStarted(false)}
              >
                ×
              </button>
              <CCAvenueIframe
                encRequest={encRequest}
                accessCode={accessCode}
                onPaymentSuccess={() => {
                  navigate("/order-confirmed", {
                    state: {
                      orderId: location.state?.orderId,
                      reference: location.state?.reference,
                    },
                  });
                }}
                onPaymentFailure={() => {
                  navigate("/payment-failed");
                }}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;
