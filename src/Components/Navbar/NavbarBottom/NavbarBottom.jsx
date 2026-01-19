import React, { useState, useEffect } from "react";
import "./NavbarBottom.css";
import todayDealImage from "../../../Assets/today-deal.png";
import sbc_icon from "../../../Assets/shop-by-category-icon.svg";
import { fetchCategories } from "../../../API/categoriesApi";
import { useNavigate } from "react-router-dom";
import { searchProductsByParam } from "../../../API/productApi";
const navbarContent = [
  {
    text: "Door Accessories",
    subItems: [
      { label: "Auto Hinges", id: "6888b08542e07ad91f60e7ae" },
      { label: "Tower Bolt", id: "6888f696a016fb31bad48e4c" },
      { label: "Hinges", id: "6888f4fda016fb31bad48e2a" },
      { label: "Door Hooks", id: "68c8540f53e2830a389a0a07" },
      { label: "Aldrop", id: "6888f450a016fb31bad48e1e" },
      { label: "Door Knocker", id: "6888f517a016fb31bad48e2e" },
      { label: "Door Stopper", id: "688f55f6e3b9929b398ff6b9" },
    ],
  },
  {
    text: "Handle Collection",
    subItems: [
      { label: "Wardrobe Handles", id: "68e3ae082fd5b8167440d482" },
      { label: "Pull Handles", id: "68e3b3ef2fd5b8167441a5bb" },
      { label: "Cabinet Handles", id: "68e4f55e34adbedb5930bf3a" },
      { label: "Concealed / Sliding Handles", id: "68e600cb7913514149eacbb3" },
      { label: "Profile Handles", id: "68e618aa7913514149eb5c02" },
    ],
  },
  {
    text: "Mortise Lock Set",
    subItems: [
      { label: "Mortise Combo Set", id: "68d43cd895364359eb541b3c" },
      { label: "Rose Combo Set", id: "68d43a5e95364359eb541b30" },
      { label: "Mortise Lock", id: "68d43cc795364359eb541b38" },
      { label: "Rose Lock", id: "68d43a2695364359eb541b2c" },
      { label: "Baby Latch", id: "68d04f36fd53e3a4faa1632d" },
      { label: "Cylinder", id: "68cad9b4646a5944d6dd19c9" },
      { label: "Lock Body", id: "68cae240a1d68fc002116ca1" },
    ],
  },
  {
    text: "Lock Series",
    subItems: [
      { label: "Rim Locks", id: "6888f55ca016fb31bad48e32" },
      { label: "Cylindrical Locks", id: "6888f600a016fb31bad48e36" },
      { label: "Furniture Locks", id: "688f01846986f87fa840433f" },
    ],
  },
  {
    text: "Contact Us",
    subItems: [],
  },
];

// const categoryItem = [
//   { id: 0, text: "All Category" },
//   { id: 1, text: "Cabinets & Storage" },
//   { id: 2, text: "Seating" },
//   { id: 3, text: "Beds & Materesses" },
//   { id: 4, text: "Dining Room" },
//   { id: 5, text: "Tables" },
//   { id: 6, text: "Living room" },
//   { id: 7, text: "Study & Home oofice" },
// ];

function NavbarBottom() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null); // State to manage which category's sub-items are open
  const [category, setCategory] = useState([]);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetchCategories();
        const allCategories = [{ _id: "all", name: "All Categories" }, ...res];
        setCategory(allCategories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchAllCategories();
  }, []);
  // Function to toggle sub-items
  const toggleCategory = (categoryText) => {
    setOpenCategory(openCategory === categoryText ? null : categoryText);
  };

  const handleContactUsClick = () => {
    const section = document.getElementById("contact-section");

    if (section) {
      // ✅ Scroll to section if already on the same page
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // ✅ Otherwise navigate to home and scroll after render
      navigate("/", { state: { scrollToContact: true } });
    }
  };

  return (
    <div className="navbar-bottom-container">
      {/* Shop By Categories - desktop only */}
      <div className="navbar-borrom-categories-container">
        <div className="navbar-bottom-text-icon desktop-only">
          <img src={sbc_icon} alt="hamburger-menu" />
          <i className="bi bi-grid-3x3-gap-fill mobile-only"></i>
          <p>Shop By Categories</p>
          <div className="vertical-line desktop-only"></div>

          <div
            className="category-dropdown-menu"
            style={{
              columnCount: Math.ceil(category.length / 10), // ✅ dynamic column count
              columnGap: "20px",
            }}
          >
            {category.length === 0 ? (
              <p className="dropdown-item">Loading...</p>
            ) : (
              category.map((cat) => (
                <a
                  key={cat._id}
                  href={
                    cat._id === "all"
                      ? "/categories"
                      : `/category/${cat._id
                        ?.toLowerCase()
                        ?.replace(/\s+/g, "-")}`
                  }
                  className="dropdown-item"
                  style={{ textTransform: "Capitalize" }}
                >
                  {cat.category_name || cat.name}
                </a>
              ))
            )}
          </div>
        </div>
        {/* ✅ Mobile version with toggle */}
        <div
          className={`navbar-bottom-text-icons mobile-only ${mobileCategoriesOpen ? "active" : ""
            }`}
          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
        >
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <p>Shop By Categories</p>
          <i
            className={`bi bi-chevron-down ${mobileCategoriesOpen ? "rotate" : ""
              }`}
          ></i>
        </div>

        {mobileCategoriesOpen && (
          <div className="mobile-category-modal">
            <div className="modal-header">
              <p>Shop By Categories</p>
              <button
                className="close-modal-btn"
                onClick={() => setMobileCategoriesOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-content">
              {category.length === 0 ? (
                <p className="dropdown-item">Loading...</p>
              ) : (
                category.map((cat) => (
                  <a
                    key={cat._id}
                    href={
                      cat._id === "all"
                        ? "/categories"
                        : `/category/${cat._id
                          ?.toLowerCase()
                          ?.replace(/\s+/g, "-")}`
                    }
                    className="dropdown-item"
                    onClick={() => setMobileCategoriesOpen(false)}
                  >
                    {cat.category_name || cat.name}
                  </a>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main navbar links - desktop only */}
      <div className="a-tag-container desktop-only">
        {navbarContent.map((item, index) => (
          <div className="a-tag-text-icon" key={index}>
            <a
              style={{ textTransform: "capitalize", cursor: "pointer" }}
              onClick={() => {
                if (item.text === "Contact Us") {
                  handleContactUsClick();
                }
              }}
            >
              {item.text}
            </a>
            {item.subItems?.length > 0 && (
              <i className="bi bi-chevron-down"></i>
            )}
            {item.subItems?.length > 0 && (
              <div className="dropdown-menu">
                {item.subItems.map((subItem, subIndex) => (
                  <p
                    key={subIndex}
                    className="dropdown-item"
                    onClick={() => {
                      navigate(`/category/${subItem.id}`);
                    }}
                  >
                    {subItem.label}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Today's Deal - hidden on mobile */}
      <img
        onClick={() => navigate("/offer/todaysdeal")}
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
                <p style={{ margin: 0 }}>{item.text}</p>
                {item.subItems?.length > 0 && (
                  <i
                    className={`bi bi-chevron-down ${openCategory === item.text ? "rotate" : ""
                      }`}
                  ></i>
                )}
              </div>

              {item.subItems?.length > 0 && openCategory === item.text && (
                <div className="mobile-subitems">
                  {item.subItems.map((subItem, subIndex) => (
                    <p
                      key={subIndex}
                      className="dropdown-item"
                      onClick={() => {
                        navigate(`/category/${subItem.id}`);
                        setMobileMenuOpen(false); // Close menu after navigation
                      }}
                    >
                      {subItem.label}
                    </p>
                  ))}
                </div>
              )}
            </div>

          ))}
          <img
            onClick={() => navigate("/offer/todaysdeal")}
            src={todayDealImage}
            className="mobile-todays-deal p-2"
            alt="Today's Deal"
          />
        </div>
      )}
    </div>
  );
}

export default NavbarBottom;
