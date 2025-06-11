import React, { useState } from "react";
import "./NavbarBottom.css";
import todayDealImage from "../../../Assets/today-deal.png";
import sbc_icon from "../../../Assets/shop-by-category-icon.svg";

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
  { id: 0, text: "All Category" },
  { id: 1, text: "Cabinets & Storage" },
  { id: 2, text: "Seating" },
  { id: 3, text: "Beds & Materesses" },
  { id: 4, text: "Dining Room" },
  { id: 5, text: "Tables" },
  { id: 6, text: "Living room" },
  { id: 7, text: "Study & Home oofice" },
];

function NavbarBottom() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null); // State to manage which category's sub-items are open

  // Function to toggle sub-items
  const toggleCategory = (categoryText) => {
    setOpenCategory(openCategory === categoryText ? null : categoryText);
  };

  return (
    <div className="navbar-bottom-container">
      {/* Shop By Categories - desktop only */}
      <div className="navbar-borrom-categories-container">
        <div className="navbar-bottom-text-icon">
          <img src={sbc_icon} alt="hamburger-menu" className="desktop-only" />
          <i className="bi bi-grid-3x3-gap-fill mobile-only"></i>
          <p>Shop By Categories</p>
          <i className="bi bi-chevron-down mobile-only"></i>
          <div className="vertical-line desktop-only"></div>

          <div className="category-dropdown-menu">
            {categoryItem.map((cat, index) => (
              <a
                key={index}
                href={
                  cat.id === 0
                    ? "/categories"
                    : `/category/${cat.text.toLowerCase().replace(/\s+/g, "-")}`
                }
                className="dropdown-item"
              >
                {cat.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navbar links - desktop only */}
      <div className="a-tag-container desktop-only">
        {navbarContent.map((item, index) => (
          <div className="a-tag-text-icon" key={index}>
            <a>{item.text}</a>
            {item.subItems?.length > 0 && (
              <i className="bi bi-chevron-down"></i>
            )}
            {item.subItems?.length > 0 && (
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

      {/* Today's Deal - hidden on mobile */}
      <img
        src={todayDealImage}
        className="today-deal-image desktop-only"
        alt="Today's Deal"
      />
      <button
        className="hamburger-icon mobile-only"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="mobile-navbar-content mobile-only">
          {/* Main Navbar Links for Mobile */}
          {navbarContent.map((item, index) => (
            <div key={index} className="mobile-nav-item">
              <div
                className="mobile-nav-item-header"
                onClick={() => toggleCategory(item.text)}
              >
                <a href={`/${item.href}`}>{item.text}</a>
                {item.subItems?.length > 0 && (
                  <i
                    className={`bi bi-chevron-down ${
                      openCategory === item.text ? "rotate" : ""
                    }`}
                  ></i>
                )}
              </div>
              {item.subItems?.length > 0 && openCategory === item.text && (
                <div className="mobile-subitems">
                  {item.subItems.map((sub, subIndex) => (
                    <a
                      key={subIndex}
                      href={`/${item.href}/${sub
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="dropdown-item"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavbarBottom;
