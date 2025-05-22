import React from "react";
import "./NavbarMiddle.css";
import logoImage from "../../../Assets/logo.png";
import cart_icon from "../../../Assets/cart-icon.svg";
import heart_icon from "../../../Assets/heart-icon.svg";
import profile_icon from "../../../Assets/profile-icon.svg";
function NavbarMiddle() {
  return (
    <>
      <div className="navbar-middle-container">
        <img src={logoImage} className="navbar-middle-logo" />
        <div className="navbar-middle-search-box-icon">
          <input type="search" placeholder="Search" />
          <i className="bi bi-search"></i>
        </div>
        <div className="heart-cart-person-signIn-icon">
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
