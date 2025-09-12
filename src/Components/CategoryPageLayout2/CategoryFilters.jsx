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
  categoryFilters = [], // 👈 from API
}) => {
  const uniqueValues = (field) => {
    const values = products
      .map((p) => p[field]?.trim()) // remove leading/trailing spaces
      .filter(Boolean) // remove null/undefined/empty
      .map((v) => v.toLowerCase()); // normalize case for comparison

    return [...new Set(values)];
  };

  // Remove duplicates by color name
  const colorSwatches = [
    ...new Map(
      products
        .flatMap((p) =>
          (p.variant || []).map((v) => ({
            name: v.title?.trim().toLowerCase(), // store lowercase for matching
            hex: v.value || v.colorHex, // fallback if no hex value
          }))
        )
        .filter((c) => c.name) // remove empty/null names
        .map((c) => [c.name, c]) // key by name to remove duplicates
    ).values(),
  ];

  const maxPrice = Math.max(
    0,
    ...products.flatMap((p) =>
      (p.variant || []).flatMap((v) =>
        (v.sizes || []).map((s) => s.sellingPrice || 0)
      )
    )
  );
  console.log("Category filters", categoryFilters);
  return (
    <>
      {/* Filter Header */}
      <div className="mt-3 px-3 d-flex align-items-center justify-content-between">
        <h5 className="fw-semibold">Filter</h5>
        <button
          className="btn filter-btn p-0 btn-link text-decoration-none"
          onClick={handleResetFilters}
        >
          <i className="bi bi-arrow-counterclockwise"></i> Remove all
        </button>
      </div>

      {/* Filter Tags */}
      <div className="mb-3 d-flex flex-wrap align-items-center gap-2">
        {Object.entries(filters).map(([key, value]) =>
          key !== "priceRange" && Array.isArray(value)
            ? value.map((v) => (
                <span
                  key={`${key}-${v}`}
                  className="badge bg-light rounded-pill px-3 py-2 d-inline-flex align-items-center text-capitalize"
                >
                  {v}
                  <button
                    type="button"
                    title="remove filter"
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
        {/* Static filters */}
        {["Brand", "Price", "Colors"]
          .filter((filter) => {
            if (filter === "Brand") {
              const validBrands = uniqueValues("brand")
                .map((b) => (typeof b === "string" ? b.trim() : b))
                .filter((b) => b && b !== "0" && b !== 0);
              return validBrands.length > 0; // Only render if brands exist
            }
            return true; // Always show Price & Colors
          })
          .map((filter, index) => (
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
                    uniqueValues("brand")
                      .filter((brand) => brand !== "0" && brand !== 0 && brand)
                      .map((brand) => (
                        <div className="form-check mb-2" key={brand}>
                          <input
                            className="form-check-input custom-checkbox"
                            type="checkbox"
                            value={brand}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "brand",
                                brand,
                                e.target.checked
                              )
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

                  {filter === "Price" && (
                    <div className="my-4">
                      <Slider
                        range
                        min={0}
                        max={maxPrice}
                        step={100}
                        value={filters.priceRange}
                        className="custom-slider my-4"
                        onChange={(value) =>
                          setFilters((prev) => ({ ...prev, priceRange: value }))
                        }
                      />
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
                          key={color.name}
                          title={color.name} // tooltip
                          onClick={() =>
                            handleCheckboxChange(
                              "colors",
                              color.name, // store name in filters
                              !filters.colors?.includes(color.name)
                            )
                          }
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: color.hex,
                            borderRadius: "50%",
                            border: filters.colors?.includes(color.name)
                              ? "2.5px solid rgb(216 127 41)"
                              : "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

        {/* Dynamic filters from API */}
        {categoryFilters
          // remove duplicates of static filters
          .filter(
            (f) =>
              !["Brand", "Price", "Colors"].some(
                (staticName) =>
                  staticName.toLowerCase() === f.name.toLowerCase()
              )
          )
          .map((f) => (
            <div className="accordion-section mb-3" key={f._id}>
              <div
                className={`accordion-header d-flex justify-content-between align-items-center fw-semibold py-2 border-bottom ${
                  openSections[f.name] ? "open" : ""
                }`}
                onClick={() => toggleSection(f.name)}
                style={{ cursor: "pointer" }}
              >
                {f.name}
                <span>{openSections[f.name] ? "−" : "+"}</span>
              </div>

              {openSections[f.name] && (
                <div className="accordion-body pt-2">
                  {f.type === "range" && (
                    <Slider
                      range
                      min={0}
                      max={100000}
                      className="custom-slider my-4"
                      step={1000}
                      value={filters[f.name] || [0, 100000]}
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, [f.name]: value }))
                      }
                    />
                  )}

                  {f.type === "checkbox" &&
                    f.options.map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input custom-checkbox"
                          type="checkbox"
                          value={opt}
                          onChange={(e) =>
                            handleCheckboxChange(f.name, opt, e.target.checked)
                          }
                          checked={filters[f.name]?.includes(opt)}
                        />
                        <label className="form-check-label ms-2 text-capitalize">
                          {opt}
                        </label>
                      </div>
                    ))}

                  {f.type === "radio" &&
                    f.options.map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={f.name}
                          value={opt}
                          onChange={() =>
                            setFilters((prev) => ({ ...prev, [f.name]: [opt] }))
                          }
                          checked={filters[f.name]?.includes(opt)}
                        />
                        <label className="form-check-label ms-2">{opt}</label>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default CategoryFilters;
