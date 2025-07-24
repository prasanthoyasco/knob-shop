import React, { useEffect, useState } from "react";
import "./CatGrid.css";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../API/categoriesApi";

function CatGrid() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); // Expecting array from API
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleClick = (data) => {
    navigate(`/category/${data._id}`, { state: { category: data } });
  };  

  // Layout logic based on index (to match your exact first-layout, second-layout, etc.)
  const groupCategories = (data) => {
    const rows = [];
    let i = 0;
    const layoutPattern = ["first-layout", "second-layout", "third-layout"];
    const layoutCounts = [3, 2, 3];
    let layoutIndex = 0;
  
    while (i < data.length) {
      const count = layoutCounts[layoutIndex % layoutCounts.length];
      const remaining = data.length - i;
  
      if (remaining >= count) {
        const layout = layoutPattern[layoutIndex % layoutPattern.length];
        rows.push({ layout, items: data.slice(i, i + count) });
        i += count;
        layoutIndex++;
      } else {
        // Not enough items left for full layout – use default layout
        rows.push({ layout: "default-layout", items: data.slice(i) });
        break;
      }
    }
  
    return rows;
  };
  
  

  const rows = groupCategories(categories);

  return (
    <div className="cat-data-grid-wrapper">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`cat-data-grid-row ${row.layout}`}>
          {row.items.map((data, index) => (
            <div
              key={data._id}
              onClick={() => handleClick(data)}
              className={`cat-data-grid-div ${
                row.layout === "first-layout"
                  ? `first-layout-item-${index}`
                  : ""
              }`}
            >
              <div className="cat-data-image-wrapper">
                <img
                  src={data.categoryImageUrl}
                  alt={data.category_name}
                  className="cat-data-grid-image"
                />
              </div>
              <div className="cat-data-grid-text">
                <h5>{data.category_name}</h5>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CatGrid;
