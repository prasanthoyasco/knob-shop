import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./PriceFilter.css";

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

  const colorSwatches = [
    "#fbe9e7",
    "#000000",
    "#7ec6e3",
    "#5c3b1e",
    "#ff6f00",
    "#f8bbd0",
    "#1565c0",
    "#aa00ff",
    "#43a047",
    "#d32f2f",
    "#ffa726",
    "#5c6bc0",
    "#a1887f",
  ];

  return (
    <>
      {/* Filter Header */}
      <div className="mt-3 px-3 d-flex align-items-center justify-content-between">
        <h5 className="fw-semibold">Filter</h5>
        <button
          className="btn btn-link filter-btn p-0 text-decoration-underline"
          onClick={handleResetFilters}
        >
          Remove all
        </button>
      </div>

      {/* Filter Tags */}
      <div className="mb-3 d-flex flex-wrap align-items-center gap-2">
        {Object.entries(filters).map(([key, value]) =>
          key !== "priceRange" && Array.isArray(value)
            ? value.map((v) => (
                <span
                  key={`${key}-${v}`}
                  className="badge bg-light rounded-pill px-3 py-2 d-inline-flex align-items-center"
                >
                  {v}
                  <button
                    type="button"
                    className="btn p-0 bg-transparent btn-small text-dark ms-2 border-0"
                    aria-label="Remove"
                    onClick={() => handleCheckboxChange(key, v, false)}
                    style={{ opacity: 0.5 }}
                  >
                    <i className="bi bi-x fs-5 danger"></i>
                  </button>
                </span>
              ))
            : null
        )}
      </div>

      {/* Accordion Filters */}
      <div className="custom-accordion">
        {[
          "Brand",
          "Price",
          "Availability",
          "Colors",
          "Features",
          "Access Type",
        ].map((filter, index) => (
          <div className="accordion-section mb-3" key={index}>
            <div
              className={`accordion-header d-flex justify-content-between align-items-center fw-semibold py-2 border-bottom ${
                openSections[filter] ? "open" : ""
              }`}
              onClick={() => toggleSection(filter)}
              style={{ cursor: "pointer" }}
            >
              {filter}
              <span>{openSections[filter] ? "−" : "+"}</span>
            </div>

            {openSections[filter] && (
              <div className="accordion-body pt-2">
                {filter === "Brand" &&
                  uniqueValues("brand").map((brand) => (
                    <div className="form-check mb-2" key={brand}>
                      <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        value={brand}
                        onChange={(e) =>
                          handleCheckboxChange("brand", brand, e.target.checked)
                        }
                        id={`brand-${brand}`}
                        checked={filters.brand?.includes(brand)}
                      />
                      <label
                        className="form-check-label ms-2 my-1"
                        htmlFor={`brand-${brand}`}
                      >
                        {brand}
                      </label>
                    </div>
                  ))}

                {filter === "Availability" &&
                  ["In Stock", "Out of Stock"].map((status) => (
                    <div className="form-check mb-2" key={status}>
                      <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        value={status}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "availability",
                            status,
                            e.target.checked
                          )
                        }
                        id={`availability-${status}`}
                        checked={filters.availability?.includes(status)}
                      />
                      <label
                        className="form-check-label ms-2 my-1"
                        htmlFor={`availability-${status}`}
                      >
                        {status}
                      </label>
                    </div>
                  ))}

                {filter === "Price" && (
                  <div className="my-4">
                    {/* Dual-Thumb Slider */}
                    <Slider
                      range
                      min={0}
                      max={100000}
                      step={1000}
                      value={filters.priceRange}
                      className="custom-slider my-4"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, priceRange: value }))
                      }
                    />

                    {/* Price Inputs */}
                    <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-currency-rupee"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={filters.priceRange[0]}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [
                                Number(e.target.value),
                                prev.priceRange[1],
                              ],
                            }))
                          }
                        />
                      </div>

                      <span className="fw-bold">–</span>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-currency-rupee"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [
                                prev.priceRange[0],
                                Number(e.target.value),
                              ],
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {filter === "Colors" && (
                  <div className="d-flex flex-wrap gap-2">
                    {colorSwatches.map((color) => (
                      <div
                        key={color}
                        onClick={() =>
                          handleCheckboxChange(
                            "colors",
                            color,
                            !filters.colors?.includes(color)
                          )
                        }
                        style={{
                          width: "24px",
                          height: "24px",
                          backgroundColor: color,
                          borderRadius: "50%",
                          border: filters.colors?.includes(color)
                            ? "2px solid #000"
                            : "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                )}

                {filter === "Features" &&
                  [
                    "IP camera",
                    "Video door phone",
                    "Wardrobe locks",
                    "Accessory",
                  ].map((feature) => (
                    <div className="form-check mb-2" key={feature}>
                      <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        value={feature}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "features",
                            feature,
                            e.target.checked
                          )
                        }
                        id={`feature-${feature}`}
                        checked={filters.features?.includes(feature)}
                      />
                      <label
                        className="form-check-label ms-2 my-1"
                        htmlFor={`feature-${feature}`}
                      >
                        {feature}
                      </label>
                    </div>
                  ))}

                {filter === "Access Type" &&
                  ["Fingerprint", "Store Manual key", "Pin code"].map(
                    (access) => (
                      <div className="form-check mb-2" key={access}>
                        <input
                          className="form-check-input custom-checkbox"
                          type="checkbox"
                          value={access}
                          onChange={(e) =>
                            handleCheckboxChange(
                              "accessType",
                              access,
                              e.target.checked
                            )
                          }
                          id={`access-${access}`}
                          checked={filters.accessType?.includes(access)}
                        />
                        <label
                          className="form-check-label ms-2 my-1"
                          htmlFor={`access-${access}`}
                        >
                          {access}
                        </label>
                      </div>
                    )
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryFilters;
