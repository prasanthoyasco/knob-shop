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

const cardImages = [cardImage1, cardImage2, cardImage3, cardImage4];

function CartPage() {
  const navigate = useNavigate()
  const location = useLocation();
  const passedItems = location.state?.cartItems;

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <NavbarTop />
      <div className="shopping-cart-container">
        <div className="shopping-cart-heading">
          <h1>YOUR SHOPPING CART</h1>
        </div>

        <div className="shopping-cart-table-head">
          <div className="head-product">PRODUCT</div>
          <div className="head-quantity">QUANTITY</div>
          <div className="head-total">TOTAL</div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center my-5 d-flex flex-column align-items-center">
            <img
              src="/cart_empty.svg"
              alt="Empty Cart"
              style={{ width: "90px" }}
            />
            <p>Your cart is empty</p>
            <button
              className="btn btn-dark mt-3"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="shopping-cart-table-product">
                <div>
                  <div className="shopping-cart-table-product-image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="shopping-cart-table-product-image-content">
                      <p>Brand : {item.brand}</p>
                      <h3>{item.title}</h3>
                      <p>Color : {item.color}</p>
                    </div>
                  </div>
                  <button className="continue-shopping-btn" onClick={()=>navigate('/')}>
                    CONTINUE SHOPPING
                  </button>
                </div>

                <div className="shopping-cart-table-product-count">
                  <div className="shopping-cart-table-product-count-btn">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </div>
                </div>

                <div className="shopping-cart-table-product-total">
                  <h3>
                    ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                  </h3>
                </div>
              </div>
            ))}

            {/* Mobile View */}
            <div className="mobile-cart-page-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-mobile-product">
                  <div className="cart-mobile-left">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="cart-mobile-right">
                    <h3>{item.title}</h3>
                    <div className="price-row">
                      <span className="discount-price">
                        ₹ {item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="quantity-remove-row">
                      <div className="quantity-box">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncrement(item.id)}>
                          +
                        </button>
                      </div>
                      <div
                        className="remove-box"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

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
            <select className="postal-code-input" defaultValue="">
              <option value="" disabled>
                ------
              </option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
            </select>
            <input
              type="text"
              placeholder="Postal/Zip Code"
              className="postal-code-input"
            />
          </div>

          <div
            ref={checkoutRef}
            className={`check-out-container ${
              isSticky ? "sticky-checkout" : ""
            }`}
          >
            <h3>Subtotal ₹ {subtotal.toLocaleString("en-IN")}</h3>
            <p>Taxes and Shipping Calculated at Checkout</p>
            <div className="mobile-checkout-sticky">
              <button className="mobile-checkout-button" onClick={()=>navigate('/payment-page')}>CHECK OUT</button>
            </div>
             <button className="Desktop-checkout-button" onClick={()=>navigate('/payment-page')}>CHECK OUT</button>
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
