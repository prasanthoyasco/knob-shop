import React, { useEffect, useState } from "react";
import "./CatGrid.css";
import { useNavigate,useLocation } from "react-router-dom";
import { fetchCategories } from "../../../API/categoriesApi";
import { RetryableImage } from "./RetryableImage";

function CatGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const passedAllData = location.state?.allProducts || null;
  const passedCategoryData = location.state?.category || null;
  const passedTitle = location.state?.title || null;
  
  useEffect(() => {
    if (passedAllData) {
      const formatted = passedAllData.map((item, index) => ({
        _id: `${passedTitle}-${index}`,
        category_name: item.title,
        description: item.description,
        categoryImageUrl: item.bgImage,
        categoryList: item.category?.length ? item.category : null,
      }));
      setAllProducts(formatted);      // save all data
      setCategories(formatted);       // show full data initially
      setLoading(false);
    } else if (passedCategoryData) {
      const formatted = passedCategoryData.map((item, index) => ({
        _id: `${passedTitle}-${index}`,
        category_name: item.catgoryName,
        description: item.description,
        categoryImageUrl: item.image,
      }));
      setCategories(formatted);
      setLoading(false);
    } else {
      const getCategories = async () => {
        try {
          const data = await fetchCategories();
          setCategories(data);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        } finally {
          setLoading(false);
        }
      };
      getCategories();
    }
  }, [passedAllData, passedCategoryData]);
  const handleFilterCategory = (item) => {
    const filtered = item.categoryList.map((cat, index) => ({
      _id: `${item.category_name}-sub-${index}`,
      category_name: cat.catgoryName,
      categoryImageUrl: cat.image,
      description: "",
    }));
    setCategories(filtered);
  };

  const handleClick = (data) => {
    navigate(`/category/${data._id}`, { state: { category: data } });
  };

  const handleReset = () => {
    setCategories(allProducts);
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

  const renderSkeletons = () => {
    const dummyItems = new Array(6).fill(null);
    return (
      <div className="cat-data-grid-wrapper">
        <div className="cat-data-grid-row first-layout">
          {dummyItems.map((_, index) => (
            <div key={index} className="cat-data-grid-div">
              <div className="cat-data-image-wrapper">
                <div
                  className="placeholder-glow w-100"
                  style={{ height: "150px", borderRadius: "8px" }}
                >
                  <div className="placeholder w-100 h-100" />
                </div>
              </div>
              <div className="cat-data-grid-text mt-2">
                <h5 className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="placeholder-glow">
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return loading ? (
    renderSkeletons()
  ) : (
    <div className="cat-data-grid-wrapper">
            {allProducts.length > 0 && allProducts.length !== categories.length && (
        <div className="text-center my-3">
          <button className="btn btn-outline-dark" onClick={handleReset}>
            ← Back to All Products
          </button>
        </div>
      )}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`cat-data-grid-row ${row.layout}`}>
          {row.items.map((data, index) => {
            return (
              <div
                key={data._id}
                className={`cat-data-grid-div ${
                  row.layout === "first-layout"
                    ? `first-layout-item-${index}`
                    : ""
                }`}
                onClick={() =>
                  data.categoryList ? handleFilterCategory(data) : handleClick(data)
                }                
              >
                <div className="cat-data-image-wrapper">
                  <RetryableImage
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
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CatGrid;
