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
      // Matched: "Auto Hinges" -> "Auto Hinges"
      { label: "Auto Hinges", id: "6888b08542e07ad91f60e7ae" },
      // Matched: "Tower Bolt" -> "Tower Bolt"
      { label: "Tower Bolt", id: "6888f696a016fb31bad48e4c" },
      // Matched: "Hinges" -> "Door Hinges" (Best available match)
      { label: "Hinges", id: "6888f4fda016fb31bad48e2a" },
      // Matched: "Aldrop" -> "Aldrop"
      { label: "Aldrop", id: "6888f450a016fb31bad48e1e" },
      // Matched: "Door Eye" -> "Door Eye"
      { label: "Door Eye", id: "6888f646a016fb31bad48e44" },
      // Matched: "Door Stopper" -> "Door Stopper"
      { label: "Door Stopper", id: "688f55f6e3b9929b398ff6b9" },
      // Matched: "Door Knocker" -> "Door Knocker"
      { label: "Door Knocker", id: "6888f517a016fb31bad48e2e" },
      // Matched: "Door Closer" -> "Door Closer"
      { label: "Door Closer", id: "6888f770a016fb31bad48e58" },
      // Matched: "Self Pin" -> "Self Pin"
      { label: "Self Pin", id: "6888f66ba016fb31bad48e48" },
    ],
  },
  {
    text: "Locks",
    subItems: [
      // Matched: "Rim Lock" -> "Rim Lock"
      { label: "Rim Lock", id: "6888f55ca016fb31bad48e32" },
      // Matched: "Cylindrical Locks" -> "Cylindrical Locks"
      { label: "Cylindrical Locks", id: "6888f600a016fb31bad48e36" },
      // Matched: "Furniture Lock" -> "Furniture lock"
      { label: "Furniture Lock", id: "688f01846986f87fa840433f" },
    ],
  },
  {
    text: "Window",
    subItems: [
      // Matched: "Window Handle" -> "Window Handle"
      { label: "Window Handle", id: "68d04ec9fd53e3a4faa15c7f" },
      // Matched: "Friction Stay" -> "Window Friction Stay" (Best available match)
      { label: "Friction Stay", id: "68bc347faedea44e0b73dacb" },
      // NOTE: "Window Hook" has no exact or close match in the provided category list. Retaining old ID.
      { label: "Window Hook", id: "671b4f981f25b95c2a9a1c15" },
      // Matched: "Window Tower Bolt" -> "Tower Bolt" (Best available match)
      { label: "Window Tower Bolt", id: "6888f696a016fb31bad48e4c" },
    ],
  },
  {
    // NOTE: This category is likely intended to be "Handles & Locks" or similar,
    // as it contains Mortise/Rose/Cylinder items.
    text: "Handles & Locks",
    subItems: [
      // Matched: "Mortise Combo Set" -> "Mortise Lock Combo Set"
      { label: "Mortise Combo Set", id: "68d43cd895364359eb541b3c" },
      // Matched: "Rose Combo Set" -> "Rose Handle Comboset"
      { label: "Rose Combo Set", id: "68d43a5e95364359eb541b30" },
      // Matched: "Mortise Lock" -> "Mortise Lock"
      { label: "Mortise Lock", id: "68d43cc795364359eb541b38" },
      // Matched: "Rose Lock" -> "Rose Handle" (Best available match)
      { label: "Rose Lock", id: "68d43a2695364359eb541b2c" },
      // Matched: "Baby Latch" -> "Baby Latch"
      { label: "Baby Latch", id: "68d04f36fd53e3a4faa1632d" },
      // Matched: "Cylinder" -> "Cylinder Locks" (Best available match)
      { label: "Cylinder", id: "68cad9b4646a5944d6dd19c9" },
      // Matched: "Lock Body" -> "Lock Body"
      { label: "Lock Body", id: "68cae240a1d68fc002116ca1" },
    ],
  },
  {
    text: "Video Door Bell",
    subItems: [
      // Matched: "Video Door Phone View" -> "Video Door Bell" (Best available match)
      { label: "Video Door Phone View", id: "68a6f463be62b34c49ffb086" },
      // Matched: "Digital Lock" -> "Digital Lock"
      { label: "Digital Lock", id: "688a008ceb18e197cb94839d" },
    ],
  },
  {
    text: "Handle Collections",
    subItems: [
      // Matched: "Wardrobe Handle" -> "WARDROBE HANDLES"
      { label: "Wardrobe Handle", id: "68e3ae082fd5b8167440d482" },
      // Matched: "Pull Handle" -> "Pull Handle"
      { label: "Pull Handle", id: "68e3b3ef2fd5b8167441a5bb" },
      // Matched: "Cabinet Handle" -> "Cabinet Handle"
      { label: "Cabinet Handle", id: "68e4f55e34adbedb5930bf3a" },
      // Matched: "Conceal/ Sliding Handle" -> "Conseal / Slideing Handle"
      { label: "Conceal/ Sliding Handle", id: "68e600cb7913514149eacbb3" },
      // Matched: "Profile Handle" -> "Profile Handle"
      { label: "Profile Handle", id: "68e618aa7913514149eb5c02" },
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
          className={`navbar-bottom-text-icons mobile-only ${
            mobileCategoriesOpen ? "active" : ""
          }`}
          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
        >
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <p>Shop By Categories</p>
          <i
            className={`bi bi-chevron-down ${
              mobileCategoriesOpen ? "rotate" : ""
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
                    className={`bi bi-chevron-down ${
                      openCategory === item.text ? "rotate" : ""
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
