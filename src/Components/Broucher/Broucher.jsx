import React, { useState, useEffect } from "react";
import "./Broucher.css";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import Footer from "../Footer/Footer";
import { getAllBrochures } from "../../API/brochures";
import image1 from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp";
function Broucher() {
  const [brochures, setBrochures] = useState([]);
  const [filteredBrochures, setFilteredBrochures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchBrochures() {
      try {
        const response = await getAllBrochures();
        
        setBrochures(response.brochures || []);
        setFilteredBrochures(response || []);
      } catch (error) {
        console.error("Error fetching brochures:", error);
      }
    }

    fetchBrochures();
  }, []);

  // Filter + Sort
  useEffect(() => {
    let temp = [...brochures];
  
    if (searchTerm.trim() !== "") {
      temp = temp.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (selectedCategory !== "All") {
      temp = temp.filter((item) => item.category === selectedCategory);
    }
  
    setFilteredBrochures(temp);
  }, [searchTerm, selectedCategory, brochures]);
  

  const handleSort = (type) => {
    const sorted = [...filteredBrochures];

    switch (type) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredBrochures(sorted);
    setSortVisible(false);
  };

  return (
    <>
      <NavbarTop />
      <div className="Broucher-Container">
        <div className="brouche-search-filter-con">
          <div className="broucher-search-box-icon">
            <input
              placeholder="Search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  className={`lucide lucide-chevron-down ml-2 transition-transform ${
                    sortVisible ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              {sortVisible && (
                <div className="broucher-sort-dropdown">
                  <div onClick={() => handleSort("title")}>Name (A-Z)</div>
                  <div onClick={() => handleSort("category")}>Categories (A-Z)</div>
                  <div onClick={() => handleSort("newest")}>Newest First</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="broucher-product-grid">
          {filteredBrochures.length > 0 ? (
            filteredBrochures.map((item, index) => (
              <div key={index} className="brochure-preview-container">
                <div className="brochure-preview-frame-wrapper">
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(
                      item.pdfLink
                    )}&embedded=true`}
                    title={`Brochure for ${item.name}`}
                    className="brochure-preview-iframe"
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="brochure-meta">
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p>Categories: {item.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No brochures found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Broucher;
