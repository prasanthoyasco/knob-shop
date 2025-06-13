import React from "react";
import "./CatGrid.css";
import { categoriesData } from "../../../Assets/productsData";
import { useNavigate } from "react-router-dom";
function CatGrid() {
  const rows = [];
  let buffer = [];
  const navigate = useNavigate();

  const handleClick = (data) => {
    console.log("Clicked:", data);
    navigate(`/category/${data.text}`,{ state: { product: data } });
  };

  categoriesData.forEach((item) => {
    buffer.push(item);

    if ([1, 2, 3].includes(item.id) && buffer.length === 3) {
      rows.push({ layout: "first-layout", items: [...buffer] });
      buffer = [];
    } else if ([4, 5].includes(item.id) && buffer.length === 2) {
      rows.push({ layout: "second-layout", items: [...buffer] });
      buffer = [];
    } else if ([6, 7, 8].includes(item.id) && buffer.length === 3) {
      rows.push({ layout: "third-layout", items: [...buffer] });
      buffer = [];
    }
  });

  // Handle remaining items
  if (buffer.length > 0) {
    rows.push({ layout: "default-layout", items: buffer });
  }

  return (
    <div className="cat-data-grid-wrapper">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`cat-data-grid-row ${row.layout}`}>
          {row.items.map((data, index) => (
            <div
              key={index}
              onClick={() => handleClick(data)}
              className={`cat-data-grid-div ${row.layout}-item-${index}`}
            >
              <div class="cat-data-image-wrapper">
                <img src={data.image} className="cat-data-grid-image" />
              </div>

              <div className="cat-data-grid-text">
                <h5>{data.text}</h5>
                <p>{data.items}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CatGrid;
