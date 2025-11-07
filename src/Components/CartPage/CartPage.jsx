import React, { useState, useEffect, useRef } from "react";
import "./CartPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import Footer from "../Footer/Footer";
import cardImage1 from "/payment-icon/visa.svg";
import cardImage2 from "/payment-icon/master.svg";
import cardImage3 from "/payment-icon/paypal.svg";
import cardImage4 from "/payment-icon/discover.svg";
import CartItemsList from "./CartItemsList";
import { useCart } from "../../Context/CartContext";
import { Share2 } from "lucide-react";
import LoginPromptModal from "../PaymentPage/LoginPromptModal";

const cardImages = [cardImage1, cardImage2, cardImage3, cardImage4];

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, updateCartItemQuantity, removeFromCart, shareCurrentCart } = useCart();

  const [isSticky, setIsSticky] = useState(false);
  const checkoutRef = useRef(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 🧭 Scroll-based sticky checkout
  useEffect(() => {
    const handleScroll = () => {
      if (checkoutRef.current) {
        const checkoutTop = checkoutRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const threshold = viewportHeight * 0.9;

        if (checkoutTop <= threshold && checkoutRef.current.offsetHeight < viewportHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cartItems]);

  // 📦 Cart item handlers
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

  // 🧠 Checkout click handler
  const handleCheckout = () => {
    const authUser = localStorage.getItem("authUser");
    const authToken = localStorage.getItem("authToken");

    // 🚨 If not logged in, store session and show login modal
    if (!authUser || !authToken) {
      const paymentSession = {
        redirectUrl: "/payment", // where to go after login
        formData: null,
        cartItems,
      };
      localStorage.setItem("pendingPaymentSession", JSON.stringify(paymentSession));
      setShowLoginModal(true);
      return;
    }

    // ✅ If logged in, continue to payment
    navigate("/payment", { state: { cartItems } });
  };

  // Modal actions
  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/auth/register");
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <NavbarTop />
      <div className="shopping-cart-container">
        <div className="shopping-cart-heading w-100 px-5">
          <div className="d-flex justify-content-between shopping-cart-heading-flex align-items-center mt-2">
            {cartItems.length > 0 ? <p>{cartItems.length} Items in</p> : <p></p>}
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

        {cartItems.length ? (
          <div className="shopping-details-container">
            <div className="instruction-container">
              <div className="instruction-container-head">
                <i className="bi bi-pencil-square"></i>
                <p>Order Special Instruction</p>
              </div>
              <textarea className="postal-code-input" />
            </div>

            <div className="shipping-container"></div>

            <div
              ref={checkoutRef}
              className={`check-out-container ${isSticky ? "sticky-checkout" : ""}`}
            >
              <h3>Subtotal ₹ {subtotal.toLocaleString("en-IN")}</h3>
              <p>Taxes and Shipping Calculated at Checkout</p>
              <button className="Desktop-checkout-button" onClick={handleCheckout}>
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
        ) : (
          " "
        )}
      </div>

      <Footer />

      {/* 🪄 Login Modal */}
      <LoginPromptModal
        open={showLoginModal}
        onClose={handleCloseModal}
        onLogin={handleLoginRedirect}
      />
    </>
  );
}

export default CartPage;
