import React from "react";
import "./NavbarBottom.css";
import todayDealImage from "../../../Assets/today-deal.png";
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
  {
    href: "sale",
    text: "Sale",
    subItems: [],
  },
  {
    href: "about-us",
    text: "About Us",
    subItems: [],
  },
  {
    href: "blog",
    text: "Blog",
    subItems: [],
  },
  {
    href: "contact-us",
    text: "Contact Us",
    subItems: [],
  },
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
function NavbarBottom() {
  return (
    <div className="navbar-bottom-container">
      <div className="navbar-borrom-categories-container">
        <div className="navbar-bottom-text-icon">
          <i className="bi bi-text-left" style={{ fontSize: "20px" }}></i>
          <p>Shop By Categories</p>
          <i className="bi bi-chevron-down"></i>
          <div className="vertical-line"></div>

          {/* Dropdown on hover for categories */}
          <div className="category-dropdown-menu">
            {categoryItem.map((cat, index) => (
              <a
                key={index}
                href={`/category/${cat.text
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
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
            <a>{item.text}  </a>
            {item.subItems?.length > 0 && (
              <i className="bi bi-chevron-down"></i>
            )}
        
            {/* Dropdown on hover */}
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

      <img src={todayDealImage} className="today-deal-image" />
    </div>
  );
}

export default NavbarBottom;
