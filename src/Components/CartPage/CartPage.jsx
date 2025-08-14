import React, { useState, useEffect, useRef } from "react";
import "./CartPage.css";
import { useLocation } from "react-router-dom";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg";
import cardImage1 from "/payment-icon/visa.svg";
import cardImage2 from "/payment-icon/master.svg";
import cardImage3 from "/payment-icon/paypal.svg";
import cardImage4 from "/payment-icon/discover.svg";
import CartItemsList from "./CartItemsList";
import { CountrySelect } from "../CartDrawer/CountrySelect";

const cardImages = [cardImage1, cardImage2, cardImage3, cardImage4];

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState("India");
  const passedItems = location.state?.cartItems;
  const [postalCode, setPostalCode] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState(null); // "available" | "not-available" | "checking"
  const [error, setError] = useState(null);
  const [areaName, setAreaName] = useState(""); // new state

  const checkAddressAvailability = async () => {
    if (!postalCode.trim()) return;
  
    try {
      setAvailabilityStatus("checking");
      setError(null);
      setAreaName(""); // clear previous result
  
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${postalCode}`
      );
      const data = await response.json();
      console.log("Pincode API response:", data);
  
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice?.[0];
        const apiState = postOffice?.State?.trim();
        const district = postOffice?.District?.trim();
        const area = postOffice?.Name?.trim();
  
        if (
          apiState &&
          country?.label &&
          apiState.toLowerCase() === country.label.toLowerCase()
        ) {
          setAvailabilityStatus("available");
          setAreaName(district || area || "your area");
        } else {
          setAvailabilityStatus("not-available");
          setError(
            `Pincode ${postalCode} does not belong to selected state ${country?.label}. It belongs to ${apiState}.`
          );
        }
      } else {
        setAvailabilityStatus("not-available");
        setError("Invalid Pincode entered.");
      }
    } catch (err) {
      console.error("Error checking pincode:", err);
      setError("Failed to check availability. Try again.");
      setAvailabilityStatus(null);
    }
  };
  
  
  
  
  
  
  
  const [cartItems, setCartItems] = useState(
    passedItems?.length
      ? passedItems
      : [
          {
            id: 1,
            title: "YDME50NxT Smart Door Lock",
            brand: "Yale",
            color: "Black",
            price: 89299,
            quantity: 1,
            image: defaultImage,
          },
        ]
  );

  const [isSticky, setIsSticky] = useState(false);
  const checkoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (checkoutRef.current) {
        const checkoutTop = checkoutRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const threshold = viewportHeight * 0.9;

        if (
          checkoutTop <= threshold &&
          checkoutRef.current.offsetHeight < viewportHeight
        ) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cartItems]);

  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const sellingPrice =
      item.productId?.variant?.[0]?.sizes?.[0]?.sellingPrice || // product from DB
      item.variant?.[0]?.sizes?.[0]?.sellingPrice ||            // variant directly on item
      item.price ||                                             // fallback to item price
      0;
  
    return sum + sellingPrice * (item.quantity || 1);
  }, 0);
  
  
  useEffect(() => {
    console.log("CartPage - cartItems:", cartItems);
  }, [cartItems]);

  return (
    <>
      <NavbarTop />
      <div className="shopping-cart-container">
        <div className="shopping-cart-heading">
          <h1>YOUR SHOPPING CART</h1>
        </div>

        <CartItemsList
          cartItems={cartItems}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleDelete={handleDelete}
        />

        <div className="shopping-details-container">
          <div className="instruction-container">
            <div className="instruction-container-head">
              <i className="bi bi-pencil-square"></i>
              <p>Order Special Instruction</p>
            </div>
            <textarea className="postal-code-input" />
          </div>

          <div className="shipping-container">
            <div className="instruction-container-head">
              <i className="bi bi-truck"></i>
              <p>Estimate Shipping Rates</p>
            </div>
            {/* <select className="postal-code-input" defaultValue="">
              <option value="" disabled>
                ------
              </option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
            </select> */}
            <CountrySelect country={country} setCountry={setCountry} />
            <input
  type="text"
  placeholder="Pincode"
  className="postal-code-input rounded"
  value={postalCode}
  onChange={(e) => setPostalCode(e.target.value)}
  onBlur={checkAddressAvailability}
/>


{availabilityStatus === "checking" && (
  <p className="status-checking">Checking delivery availability...</p>
)}

{availabilityStatus === "available" && (
  <p className="status-available">
    Delivery is available to <strong>{areaName}</strong>, {country?.label}
  </p>
)}

{availabilityStatus === "not-available" && error && (
  <p className="status-error">{error}</p>
)}





          </div>

          <div
            ref={checkoutRef}
            className={`check-out-container ${
              isSticky ? "sticky-checkout" : ""
            }`}
          >
            <h3>Subtotal ₹ {subtotal.toLocaleString("en-IN")}</h3>
            <p>Taxes and Shipping Calculated at Checkout</p>
            {/* <div className="mobile-checkout-sticky">
              <button
                className="Desktop-checkout-button"
                onClick={() => {
                  console.log(
                    "Navigating to payment with cartItems:",
                    cartItems
                  );
                  navigate("/payment", { state: { cartItems } });
                }}
              >
                CHECK OUT
              </button>
            </div> */}
            <button
              className="Desktop-checkout-button"
              onClick={() => {
                console.log("Navigating to payment with cartItems:", cartItems);
                navigate("/payment", { state: { cartItems } });
              }}
            >
              CHECK OUT
            </button>

            <p>We accept</p>
            <div className="card-images-container">
              {cardImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`card-${index}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
