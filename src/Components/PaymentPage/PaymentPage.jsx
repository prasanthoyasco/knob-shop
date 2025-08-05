import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import Footer from "../Footer/Footer";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import productImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createDTDCConsignment } from "../../API/createOrderConsigment";
import { createOrderWithShipping } from "../../API/orderApi";
const cardImages = [
  "/payment-icon/discover.svg",
  "/payment-icon/master.svg",
  "/payment-icon/paypal.svg",
  "/payment-icon/visa.svg",
];
function PaymentPage() {
  const [deliveryOption, setDeliveryOption] = useState("ship");
  const [pickupAddress, setPickupAddress] = useState("");
  const [showStoreInfo, setShowStoreInfo] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [contactCompleted, setContactCompleted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [zipCode, setZipCode] = useState("");
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    console.log("PaymentPage - cartItems:", cartItems);
  }, [cartItems]);
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
      const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight || 1), 0);
      const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const declaredLength = 70.0;
      const declaredWidth = 70.0;
      const declaredHeight = 65.0;
  
      // ✅ Define shippingAddress at the top
      const shippingAddress = {
        name: `${firstName} ${lastName}`,
        phone: contactInfo,
        alternate_phone: contactInfo,
        street: deliveryAddress,
        city: city,
        district: city,
        pincode: zipCode,
        state: state || "Tamil Nadu",
      };
  
      // ✅ DTDC payload (only used for DTDC API)
      const dtdcPayload = {
        _id: `ORDER-${Date.now()}`,
        invoiceNo: `INV-${Date.now()}`,
        invoiceDate: new Date().toISOString().split('T')[0],
        totalAmount: totalValue,
        ewayBill: "12345678",
        shippingAddress,
        cartItems,
        dimensions: {
          length: declaredLength,
          width: declaredWidth,
          height: declaredHeight,
          weight: totalWeight.toFixed(1),
        },
      };
  
      console.log("📦 Creating DTDC Consignment...");
      const dtdcResponse = await createDTDCConsignment(dtdcPayload);
  
      let referenceNumber = "";
      if (dtdcResponse?.data?.length > 0) {
        referenceNumber = dtdcResponse.data[0].customer_reference_number || "N/A";
        console.log("✅ Got DTDC Reference:", referenceNumber);
      } else {
        console.warn("⚠️ DTDC response missing reference number.");
      }
  
      // ✅ Internal order data (to your DB)
      const userId = localStorage.getItem("userId") || "6878e138b855f799f008bb6a";
      const orderData = {
        userId,// Replace with real userId
        items: cartItems.map(item => ({
          productId: item._id || item.productId,
          productName: item.title || item.productName,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        totalAmount: totalValue,
        shippingAddress,
        dtdcReferenceNumber: referenceNumber,
        paymentMethod: selectedPayment || "cod",
        paymentStatus: "pending",
        status: "pending",
      };
  
      console.log("📁 Creating order in DB...");
      console.log("📦 Final orderData to backend:", orderData);
      const orderResponse = await createOrderWithShipping(orderData);
      console.log("✅ Order created:", orderResponse);
      // ✅ Save order and cart data to localStorage for Invoice
const invoicePayload = {
  shippingAddress,
  cartItems,
  totalAmount: totalValue,
  dtdcReferenceNumber: referenceNumber,
  userId,
  paymentMethod: selectedPayment || "cod",
  invoiceDate: new Date().toLocaleDateString(),
  orderId: orderResponse.orderId,
};
localStorage.setItem('latestInvoiceData', JSON.stringify(invoicePayload));

      // ✅ Navigate to confirmation page
      navigate("/order-confirmed", {
        state: {
          orderId: orderResponse.orderId,
          reference: referenceNumber,
        },
      });
  
    } catch (error) {
      console.error("❌ Error during order/DTDC creation:", error);
      alert("Something went wrong while placing the order.");
    }
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
            <div className="payment-page-delivery-sec">
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
          <div className="payment-page-delivery-sec">
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="first-name-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="text"
                className="contact-con-input"
                placeholder="Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              <div className="first-last-name-input-div">
                <input
                  type="text"
                  placeholder="City"
                  className="first-name-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
<select
  className="first-name-input"
  value={state}
  onChange={(e) => setState(e.target.value)}
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
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
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
                <h3 className="contact-con-head-h3">Store Location</h3>
                <a href="login">change location</a>
              </div>
              <p>
                There is 1 store with stock close to chennai,Tamil,Nadu,India
              </p>
              <div className="use-my-loction-div">
                <p>Use my location</p>
              </div>
              <div className="hr-line-pickup">
                <hr />
                <p>X</p>
                <hr />
              </div>
              <select className="select-box">
                <option>India</option>
                <option>US</option>
                <option>UK</option>
              </select>
              <div className="pick-up-address-div">
                <input
                  type="text"
                  className="contact-con-input"
                  placeholder="Address"
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
                <button
                  className="find-store-btn"
                  onClick={() => setShowStoreInfo(true)}
                >
                  FIND STORE
                </button>
              </div>
            </div>
          )}
          {deliveryOption === "pickup" && showStoreInfo && (
            <div className="store-location-box">
              <div className="contact-con-head">
                <h3 className="contact-con-head-h3">Store Location</h3>
                <a href="login">change location</a>
              </div>
              <p>
                There is 1 store with stock close to{" "}
                <strong>{pickupAddress || "Chennai, Tamil Nadu, India"}</strong>
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

          <div className="shipping-method-container">
            <h3 className="contact-con-head-h3">SHIPPING METHOD</h3>
            <div className="shipping-method-containe-text">
              Enter your shipping address to view available shipping methods
            </div>
            <div className="contact-con-checkbox-text">
              <input type="checkbox" />
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
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="first-name-input"
                />
              </div>
              <input
                type="text"
                className="contact-con-input"
                placeholder="Address"
              />
              <div className="first-last-name-input-div">
                <input
                  type="text"
                  placeholder="City"
                  className="first-name-input"
                />
<select
  className="first-name-input"
  value={state}
  onChange={(e) => setState(e.target.value)}
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
                />
              </div>
            </div>
          </div>

          <div className="payment-section">
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
              <div className="payment-page-delivery-sec">
                <label className="radio-btn-delivery-text">
                  <input
                    type="radio"
                    name="payment"
                    className="radio-input"
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={() => setSelectedPayment("cod")}
                  />
                  <span className="radio-btn-delivery"></span>
                  <p className="radio-btn-text">Cash on Delivery(COD)</p>
                </label>
              </div>
            </div>
          </div>
          <button
            className="btn pay-now-btn rounded-0"
            onClick={handlePayment}
          >
            PAY NOW
          </button>
          <hr />
        </div>
        <div className="payment-page-right-side">
          <h5>Arriving 19 jun 2025</h5>
          <p>If you order in the next 20 hours and 34 minutes</p>
          {cartItems.map((item, index) => (
  <div key={index} className="payment-product-image-div">
    <div className="payment-product-image">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="payment-product-image-content">
        <p>Brand: {item.brand}</p>
        <h3>{item.title}</h3>
        <p>Color: {item.color}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </div>
    <p className="payment-price">₹ {(item.price * item.quantity).toLocaleString("en-IN")}</p>
  </div>
))}

<div className="total-calc">
  <div className="sub-cal">
    <p>Subtotal</p>
    <p>₹ {subtotal.toLocaleString("en-IN")}</p>
  </div>
  <div className="sub-cal">
    <p>Shipping</p>
    <p>₹ 0</p>
  </div>
  <div className="sub-cal">
    <h5>Total</h5>
    <h5>₹ {subtotal.toLocaleString("en-IN")}</h5>
  </div>
</div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;
