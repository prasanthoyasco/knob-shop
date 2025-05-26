import React from "react";
import "./NavbarMiddle.css";
import logoImage from "../../../Assets/logo.png";
import cart_icon from "../../../Assets/cart-icon.svg";
import heart_icon from "../../../Assets/heart-icon.svg";
import profile_icon from "../../../Assets/profile-icon.svg";
function NavbarMiddle() { // Added menuOpen and setMenuOpen as props
  return (
    <>
      <div className="navbar-middle-container">
        <div className="navbar-middle-logo-wrapper">
          <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
        </div>
        <div className="navbar-middle-search-box-icon">
          <input type="search" placeholder="Search" />
          <i className="bi bi-search"></i>
        </div>
        <div className="heart-cart-person-signIn-icon">
          {/* Mobile-only Hamburger Icon - MOVED HERE */}
          {/* <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </div> */}

          {/* Wishlist Icon with Count */}
          <div className="icon-wrapper">
            <img src={heart_icon} alt="Wishlist" />
            <span className="count-badge">5</span>{" "}
            {/* Replace 5 with dynamic count */}
          </div>

          {/* Cart Icon with Count */}
          <div className="icon-wrapper">
            <img src={cart_icon} alt="Cart" />
            <span className="count-badge">3</span>{" "}
            {/* Replace 3 with dynamic count */}
          </div>

          {/* Profile Section */}
          <div className="profile">
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
