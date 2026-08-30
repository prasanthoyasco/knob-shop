import React, { forwardRef } from "react";
import "./CategoriesBanner.css";
import image from "../../../Assets/CategoriesImge/Knob Shop/image.jpg";
import { useNavigate } from "react-router-dom";

const CategoriesBanner = forwardRef((props, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className="categories-banner-container">
      <img src={image} className="categories-banner-image" alt="banner" />
      <div className="categories-banner-image-overlay"></div>
      <div className="categories-banner-overlay-content">
        <p className="categories-banner-overlay-content-para1">
          YOU DREAM IT, WE DESIGN IT
        </p>
        <h1>We can build you the home décor of your dreams</h1>
        <p className="categories-banner-overlay-content-para2">
          Get your own today, connect with our designers
        </p>
        <button
          className="categories-banner-overlay-content-btn"
          onClick={() => navigate("/book-consultation")}
        >
          BOOK CONSULTATION
        </button>
      </div>
    </div>
  );
});

export default CategoriesBanner;
