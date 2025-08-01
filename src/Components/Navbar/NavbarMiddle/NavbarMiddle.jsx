import React from "react";
import "./NavbarMiddle.css";
import logoImage from "../../../Assets/logo.png";
import cart_icon from "../../../Assets/cart-icon.svg";
import heart_icon from "../../../Assets/heart-icon.svg";
import profile_icon from "../../../Assets/profile-icon.svg";
import { useCart } from "../../../Context/CartContext"; 
import { useNavigate } from "react-router-dom";
function NavbarMiddle() {
  const { cartItems, toggleDrawer } = useCart(); 
  const navigate = useNavigate()
  return (
    <>
      <div className="navbar-middle-container">
        <div className="navbar-middle-logo-wrapper">
          <a href="/">
            <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
          </a>
        </div>

        <div className="navbar-middle-search-box-icon">
          <input type="search" placeholder="Search" />
          <i className="bi bi-search"></i>
        </div>

        <div className="heart-cart-person-signIn-icon">
          {/* Wishlist Icon */}
          <div className="icon-wrapper">
            <img src={heart_icon} alt="Wishlist" />
            <span className="count-badge">5</span> {/* Replace with real wishlist count later */}
          </div>

          {/* Cart Icon with real count & click to open drawer */}
          <div className="icon-wrapper" onClick={() => toggleDrawer(true)} style={{ cursor: "pointer" }}>
            <img src={cart_icon} alt="Cart" />
            {cartItems.length > 0 && (
              <span className="count-badge">{cartItems.length}</span>
            )}
          </div>

          {/* Profile Section */}
          <div className="profile" onClick={()=>navigate('/auth/register')}>
            <img src={profile_icon} alt="Profile" />
            <div>
              <p>Sign in</p>
              <h6>Account</h6>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default NavbarMiddle;
