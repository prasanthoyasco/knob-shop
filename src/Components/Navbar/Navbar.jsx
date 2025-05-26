import React from "react";
import "./Navbar.css";

// Assets
import todayDealImage from "../../Assets/today-deal.png";
import sbc_icon from "../../Assets/shop-by-category-icon.svg";
import logoImage from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart-icon.svg";
import heart_icon from "../../Assets/heart-icon.svg";
import profile_icon from "../../Assets/profile-icon.svg";
import facebook_icon from "../../Assets/facebook-icon.svg";
import insta_icon from "../../Assets/insta-icon.svg";
import mail_icon from "../../Assets/mail-icon.svg";
import call_icon from "../../Assets/call-icon.svg";

const navbarContent = [
  {
    href: "living-room",
    text: "Living Room",
    subItems: ["Sofas", "TV Units", "Coffee Tables"],
  },
  {
    href: "dining-room",
    text: "Dining Room",
    subItems: ["Dining Tables", "Chairs", "Storage Cabinets"],
  },
  {
    href: "lightning",
    text: "Lightning",
    subItems: ["Ceiling Lights", "Wall Lamps", "Table Lamps"],
  },
  { href: "sale", text: "Sale", subItems: [] },
  { href: "about-us", text: "About Us", subItems: [] },
  { href: "blog", text: "Blog", subItems: [] },
  { href: "contact-us", text: "Contact Us", subItems: [] },
];

const categoryItem = [
  { text: "Cabinets & Storage" },
  { text: "Seating" },
  { text: "Beds & Materesses" },
  { text: "Dining Room" },
  { text: "Tables" },
  { text: "Living room" },
  { text: "Study & Home oofice" },
];

function Navbar() {
  return (
    <div className="navbar-gradient-wrapper">
      {/* Navbar Top */}
      <div className="navbar-top-container">
        <div className="navbar-top-phone-number">
          <img src={call_icon} alt="Call" />
          <p>9876543210</p>
        </div>

        <div className="navbar-top-offer">
          <p>
            Sign up and <strong style={{ color: "#E18436" }}>GET 25% OFF</strong> for your first order
          </p>
        </div>

        <div className="navbar-top-facebook-insta-icon-div">
          <div className="navbar-top-mail-id">
            <img src={mail_icon} alt="E-mail" />
            <p>akashrajan1602@gmail.com, ecom@knobsshop.store</p>
          </div>
          <div className="navbar-top-facebook-insta-icon">
            <img src={facebook_icon} alt="Facebook" />
            <img src={insta_icon} alt="Instagram" />
          </div>
        </div>
      </div>

      {/* Navbar Middle */}
      <div className="navbar-middle-container">
        <img src={logoImage} className="navbar-middle-logo" alt="Logo" />
        <div className="navbar-middle-search-box-icon">
          <input type="search" placeholder="Search" />
          <i className="bi bi-search"></i>
        </div>
        <div className="heart-cart-person-signIn-icon">
          <div className="icon-wrapper">
            <img src={heart_icon} alt="Wishlist" />
            <span className="count-badge">5</span>
          </div>
          <div className="icon-wrapper">
            <img src={cart_icon} alt="Cart" />
            <span className="count-badge">3</span>
          </div>
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

      {/* Navbar Bottom */}
      <div className="navbar-bottom-container">
        <div className="navbar-borrom-categories-container">
          <div className="navbar-bottom-text-icon">
            <img src={sbc_icon} alt="hamburger-menu" />
            <p>Shop By Categories</p>
            <i className="bi bi-chevron-down"></i>
            <div className="vertical-line"></div>

            <div className="category-dropdown-menu">
              {categoryItem.map((cat, index) => (
                <a
                  key={index}
                  href={`/category/${cat.text.toLowerCase().replace(/\s+/g, "-")}`}
                  className="dropdown-item"
                >
                  {cat.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="a-tag-container">
          {navbarContent.map((item, index) => (
            <div className="a-tag-text-icon" key={index}>
              <a>{item.text}</a>
              {item.subItems.length > 0 && <i className="bi bi-chevron-down"></i>}
              {item.subItems.length > 0 && (
                <div className="dropdown-menu">
                  {item.subItems.map((subItem, subIndex) => (
                    <p key={subIndex} className="dropdown-item">
                      {subItem}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <img src={todayDealImage} className="today-deal-image" alt="Today's Deal" />
      </div>
    </div>
  );
}

export default Navbar;
