import React, { useState, useEffect } from "react";
import "./NavbarBottom.css";
import todayDealImage from "../../../Assets/today-deal.png";
import sbc_icon from "../../../Assets/shop-by-category-icon.svg";
import { fetchCategories } from "../../../API/categoriesApi";
import { useNavigate } from "react-router-dom";
import { searchProductsByParam } from "../../../API/productApi";
const navbarContent = [
  {
    href: "living-room",
    text: "Door Accessories",
    subItems: [
      { label: "Auto Hinges", link: "/auto hinges" },
      { label: "Tower Bolt", link: "/tower bolt" },
      { label: "Hinges", link: "/hinges" },
      { label: "Aldrop", link: "/aldrop" },
      { label: "Door Eye", link: "/door eye" },
      { label: "Door Stopper", link: "/door stopper" },
      { label: "Door Knocker", link: "/door knocker" },
      { label: "Door Closer", link: "/door closer" },
      { label: "Self Pin", link: "/self pin" },
    ],
  },
  {
    href: "dining-room",
    text: "Locks",
    subItems: [
      { label: "Rim Locks", link: "/rim locks" },
      { label: "Cylindrical Lock", link: "/cylindrical lock" },
      { label: "Furniture Lock", link: "/furniture lock" },
    ],
  },
  {
    href: "lightning",
    text: "Window",
    subItems: [
      { label: "Window Handle", link: "/window handle" },
      { label: "Friction Stay", link: "/friction stay" },
      { label: "Window Hook", link: "/window hook" },
      { label: "Window Tower Bolt", link: "/window tower bolt" },
    ],
  },
  {
    href: "lightning",
    text: "Locks",
    subItems: [
      { label: "Mortise Combo Set", link: "/mortise combo set" },
      { label: "Rose Combo Set", link: "/rose combo set" },
      { label: "Mortise Lock", link: "/mortise lock" },
      { label: "Rose Lock", link: "/rose lock" },
      { label: "Baby Latch", link: "/baby latch" },
      { label: "Cylinder", link: "/cylinder" },
      { label: "Lock Body", link: "/lock body" },
    ],
  },
  {
    href: "lightning",
    text: "Video Door Bell",
    subItems: [
      { label: "Video Door Phone View", link: "/video door phone view" },
      { label: "Digital Lock", link: "/digital lock" },
    ],
  },
  {
    href: "lightning",
    text: "Handle Collections",
    subItems: [
      { label: "Wardrobe Handle", link: "/wardrobe handle" },
      { label: "Pull Handle", link: "/pull handle" },
      { label: "Cabinet Handle", link: "/cabinet handle" },
      { label: "Conceal (or) Sliding Handle", link: "/conceal sliding handle" },
      { label: "Profile Handle", link: "/profile handle" },
    ],
  },
  {
    href: "contact-us",
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
    columnCount: Math.ceil(category.length /10), // ✅ dynamic column count
    columnGap: "20px"
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
                  <p key={subIndex} className="dropdown-item"
                        onClick={() => {
        navigate(`/products/search/${subItem.label.toLowerCase()}`);
      }}>
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
