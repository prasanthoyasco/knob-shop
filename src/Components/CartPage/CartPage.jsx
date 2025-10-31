import React, { useState, useEffect, useRef } from "react";
import "./CartPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import Footer from "../Footer/Footer";
import defaultImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg";
import cardImage1 from "/payment-icon/visa.svg";
import cardImage2 from "/payment-icon/master.svg";
import cardImage3 from "/payment-icon/paypal.svg";
import cardImage4 from "/payment-icon/discover.svg";
import CartItemsList from "./CartItemsList";
import { CountrySelect } from "../CartDrawer/CountrySelect";
import { useCart } from "../../Context/CartContext";
import { Share2 } from "lucide-react";

const cardImages = [cardImage1, cardImage2, cardImage3, cardImage4];

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartItems,
    updateCartItemQuantity,
    removeFromCart,
    shareCurrentCart,
  } = useCart();

  const [country, setCountry] = useState("India");
  const [postalCode, setPostalCode] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [error, setError] = useState(null);
  const [areaName, setAreaName] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const checkoutRef = useRef(null);

  // 🧭 Scroll-based sticky checkout
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

  // 📦 Cart item handlers from context
  const handleIncrement = (id) => updateCartItemQuantity(id, 1);
  const handleDecrement = (id) => updateCartItemQuantity(id, -1);
  const handleDelete = (item) => removeFromCart(item);

  // 🧮 Subtotal calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const sellingPrice =
      item.productId?.variant?.[0]?.sizes?.[0]?.sellingPrice ||
      item.variant?.[0]?.sizes?.[0]?.sellingPrice ||
      item.price ||
      0;
    return sum + sellingPrice * (item.quantity || 1);
  }, 0);

  // 🏠 Pincode API check
  const checkAddressAvailability = async () => {
    if (!postalCode.trim()) return;

    try {
      setAvailabilityStatus("checking");
      setError(null);
      setAreaName("");

      const response = await fetch(
        `https://api.postalpincode.in/pincode/${postalCode}`
      );
      const data = await response.json();

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

  return (
    <>
      <NavbarTop />
      <div className="shopping-cart-container">
        <div className="shopping-cart-heading w-100 px-5">
          
          <div className="d-flex justify-content-between shopping-cart-heading-flex align-items-center mt-2">
            {cartItems.length > 0 ? <p>{cartItems.length} Items in</p> : <p>            </p>}
            <h1>YOUR SHOPPING CART</h1>
            <button
              className="btn btn-sm rounded-50 m-0 border-0 w-auto me-2 share-cart-btn"
              onClick={() => shareCurrentCart()}
              title="Share Cart"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <CartItemsList
          cartItems={cartItems}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleDelete={handleDelete}
        />

        { cartItems.length ?
          <div className="shopping-details-container">
          {/* Notes Section */}
          <div className="instruction-container">
            <div className="instruction-container-head">
              <i className="bi bi-pencil-square"></i>
              <p>Order Special Instruction</p>
            </div>
            <textarea className="postal-code-input" />
          </div>

          {/* Shipping Section */}
          <div className="shipping-container">
            <div className="instruction-container-head">
              <i className="bi bi-truck"></i>
              <p>Estimate Shipping Rates</p>
            </div>

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
                Delivery is available to <strong>{areaName}</strong>,{" "}
                {country?.label}
              </p>
            )}

            {availabilityStatus === "not-available" && error && (
              <p className="status-error">{error}</p>
            )}
          </div>

          {/* Checkout Summary */}
          <div
            ref={checkoutRef}
            className={`check-out-container ${
              isSticky ? "sticky-checkout" : ""
            }`}
          >
            <h3>Subtotal ₹ {subtotal.toLocaleString("en-IN")}</h3>
            <p>Taxes and Shipping Calculated at Checkout</p>
            <button
              className="Desktop-checkout-button"
              onClick={() => navigate("/payment", { state: { cartItems } })}
            >
              CHECK OUT
            </button>

            <p>We accept</p>
            <div className="card-images-container">
              {cardImages.map((img, index) => (
                <img key={index} src={img} alt={`card-${index}`} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
        : " "}
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
