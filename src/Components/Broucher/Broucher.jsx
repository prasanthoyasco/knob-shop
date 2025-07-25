import React, { useState,useEffect } from "react";
import "./Broucher.css";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import Footer from "../Footer/Footer";
import {getProductBroucher} from '../../API/productApi'
import image1 from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp'
import image2 from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp'
import image3 from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp'
const productData = [
    {
      id: 1,
      name: "YDME100NxT Smart Door Lock",
      sku: "YDME100_NxT_BLK",
      retail: "₹64,199",
      wholesale: "₹70,299",
      sold: 50,
      stock: 200,
      variants: 6,
      image:image1,
      stockLevelPercent: 80,
      status: "Active",
    },
    {
      id: 2,
      name: "Digital Safe Box 2024",
      sku: "DSB_2024_SEC",
      retail: "₹10,999",
      wholesale: "₹9,500",
      sold: 120,
      stock: 100,
      variants: 2,
      image: image2,
      stockLevelPercent: 40,
      status: "Active",
    },
    {
      id: 3,
      name: "Fingerprint Door Lock Pro",
      sku: "FDL_PRO_XY",
      retail: "₹14,500",
      wholesale: "₹12,999",
      sold: 75,
      stock: 150,
      variants: 4,
      image:image3,
      stockLevelPercent: 60,
      status: "Active",
    },
    // Add more items as needed
  ];
  

function Broucher() {
    const [products, setProducts] = useState(productData);
  const [sortVisible, setSortVisible] = useState(false);
  const [brochures, setBrochures] = useState([]);

  useEffect(() => {
    async function fetchBrochures() {
      try {
        const response = await getProductBroucher();
        console.log(response);
        
        setBrochures(response || []);
      } catch (error) {
        console.error("Error fetching brochures:", error);
      }
    }
  
    fetchBrochures();
  }, []);


  const handleSort = (type) => {
    let sorted = [...products];

    switch (type) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        sorted.sort((a, b) => parseInt(a.retail.replace(/[^0-9]/g, "")) - parseInt(b.retail.replace(/[^0-9]/g, "")));
        break;
      case "stock-high":
        sorted.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    setProducts(sorted);
    setSortVisible(false); // hide dropdown after selection
  };

  return (
    <>
      <NavbarTop />
      <div className="Broucher-Container">
        <div className="brouche-search-filter-con">
          <div className="broucher-search-box-icon">
            <input placeholder="Search" type="search" />
            <i className="bi bi-search"></i>
          </div>

          <div>
          <div className="choose-category-wrapper" title="Choose Category">
  <button
    className="choose-category-button"
    onClick={() => setSortVisible(!sortVisible)}
  >
    Sort By
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-down ml-2 transition-transform ${sortVisible ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  </button>

  {sortVisible && (
    <div className="broucher-sort-dropdown">
      <div onClick={() => handleSort("name")}>Name (A-Z)</div>
      <div onClick={() => handleSort("price-low")}>Price (Low to High)</div>
      <div onClick={() => handleSort("stock-high")}>Stock (High to Low)</div>
    </div>
  )}
</div>

          </div>
        </div>

        <div className="broucher-product-grid">
  {brochures.map((item, index) => (
    <div key={index} className="brochure-preview-container">
      <div className="brochure-preview-frame-wrapper">
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(item.brochure)}&embedded=true`}
          title={`Brochure for ${item.name}`}
          className="brochure-preview-iframe"
          frameBorder="0"
        ></iframe>
        <div className="brochure-meta">
          <p><strong>{item.name}</strong></p>
          <p>SKU: {item.SKU}</p>
        </div>
      </div>
    </div>
  ))}
</div>


      </div>
      <Footer />
    </>
  );
}

export default Broucher;
