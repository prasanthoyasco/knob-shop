// components/CategoryFilters.jsx
import React from "react";

const CategoryFilters = ({
  products,
  filters,
  setFilters,
  openSections,
  toggleSection,
  handleCheckboxChange,
  handleResetFilters,
}) => {
  const uniqueValues = (field) => {
    const values = products.map((p) => p[field]).filter(Boolean);
    return [...new Set(values)];
  };

  return (
    <>
      <div className="my-3 ms-2 d-flex align-items-center justify-content-between">
        <h3 className="mb-0">Filter</h3>
        <button
          className="btn btn-sm btn-light d-flex align-items-center gap-1"
          onClick={handleResetFilters}
          title="Clear Filters"
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          <span className="d-none d-md-inline">Reset</span>
        </button>
      </div>
      <div className="custom-accordion">
        {["Brand", "Price", "Availability", "Colors", "Features", "Access Type"].map(
          (filter, index) => (
            <div className="accordion-section" key={index}>
              <div
                className="accordion-header"
                onClick={() => toggleSection(filter)}
              >
                {filter}
                <span className="accordion-icon">
                  {openSections[filter] ? "−" : "+"}
                </span>
              </div>

              {openSections[filter] && (
                <div className="accordion-body">
                  {filter === "Brand" &&
                    uniqueValues("brand").map((brand) => (
                      <div className="form-check" key={brand}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={brand}
                          onChange={(e) =>
                            handleCheckboxChange("brand", brand, e.target.checked)
                          }
                          id={`brand-${brand}`}
                        />
                        <label className="form-check-label" htmlFor={`brand-${brand}`}>
                          {brand}
                        </label>
                      </div>
                    ))}

                  {filter === "Availability" &&
                    ["In Stock", "Out of Stock"].map((status) => (
                      <div className="form-check" key={status}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={status}
                          onChange={(e) =>
                            handleCheckboxChange("availability", status, e.target.checked)
                          }
                          id={`availability-${status}`}
                        />
                        <label className="form-check-label" htmlFor={`availability-${status}`}>
                          {status}
                        </label>
                      </div>
                    ))}

                  {filter === "Price" && (
                    <>
                      <label className="form-label">Min: {filters.priceRange[0]}</label>
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="10000"
                        step="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [Number(e.target.value), prev.priceRange[1]],
                          }))
                        }
                      />
                      <label className="form-label">Max: {filters.priceRange[1]}</label>
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], Number(e.target.value)],
                          }))
                        }
                      />
                    </>
                  )}

                  {filter === "Colors" &&
                    ["Gold", "Silver", "Rose Gold"].map((color) => (
                      <div className="form-check" key={color}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={color}
                          onChange={(e) =>
                            handleCheckboxChange("colors", color, e.target.checked)
                          }
                          id={`color-${color}`}
                        />
                        <label className="form-check-label" htmlFor={`color-${color}`}>
                          {color}
                        </label>
                      </div>
                    ))}

                  {filter === "Features" &&
                    ["Adjustable", "Customizable", "Waterproof"].map((feature) => (
                      <div className="form-check" key={feature}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={feature}
                          onChange={(e) =>
                            handleCheckboxChange("features", feature, e.target.checked)
                          }
                          id={`feature-${feature}`}
                        />
                        <label className="form-check-label" htmlFor={`feature-${feature}`}>
                          {feature}
                        </label>
                      </div>
                    ))}

                  {filter === "Access Type" &&
                    ["Online Only", "Store Pickup"].map((access) => (
                      <div className="form-check" key={access}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={access}
                          onChange={(e) =>
                            handleCheckboxChange("accessType", access, e.target.checked)
                          }
                          id={`access-${access}`}
                        />
                        <label className="form-check-label" htmlFor={`access-${access}`}>
                          {access}
                        </label>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CategoryFilters;
