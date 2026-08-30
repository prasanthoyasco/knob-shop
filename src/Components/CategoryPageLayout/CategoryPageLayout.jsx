import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPageLayout.css";

const CategoryPageLayout = ({ products = [] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [openSections, setOpenSections] = useState({});
  const [filters, setFilters] = useState({
    brand: [],
    availability: [],
    priceRange: [0, 100000],
    colors: [],
    features: [],
    accessType: [],
  });
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const uniqueValues = (field) => {
    const values = products.map((p) => p[field]).filter(Boolean);
    return [...new Set(values)];
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortOrder, products]);

  const applyFilters = () => {
    let result = [...products];

    if (filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }

    if (filters.availability.length > 0) {
      result = result.filter((p) =>
        filters.availability.includes(p.inStock ? "In Stock" : "Out of Stock")
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }

    if (filters.features.length > 0) {
      result = result.filter((p) =>
        filters.features.every((feat) => p.features?.includes(feat))
      );
    }

    if (filters.accessType.length > 0) {
      result = result.filter((p) => filters.accessType.includes(p.accessType));
    }

    const [minPrice, maxPrice] = filters.priceRange;
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  };

  const handleCheckboxChange = (filterName, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: checked
        ? [...prev[filterName], value]
        : prev[filterName].filter((item) => item !== value),
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      brand: [],
      availability: [],
      priceRange: [0, 100000],
      colors: [],
      features: [],
      accessType: [],
    });
    setSortOrder("");
  };

  const renderFilterAccordion = () => (
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
                            handleCheckboxChange(
                              "availability",
                              status,
                              e.target.checked
                            )
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
                        max="100000"
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

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Mobile filter button */}
        <div className="d-md-none mb-3">
          <button
            className="btn btn-outline-dark w-100 d-flex justify-content-between align-items-center"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span><i className="bi bi-filter me-2"></i>Filters</span>
            <i className={`bi ${showMobileFilters ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {showMobileFilters && (
          <div className="col-12 d-md-none mb-3">{renderFilterAccordion()}</div>
        )}

        {/* Desktop Filter Panel */}
        <div className="col-md-3 d-none d-md-block">{renderFilterAccordion()}</div>

        {/* Product Grid */}
        <div className="col-md-9">
          <div className="d-flex justify-content-end align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <span>({filteredProducts.length} Items)</span>
              <span className="text-muted small">Sort by:</span>
              <select
                className="form-select form-select-sm w-auto no-border"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Best selling</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            {filteredProducts.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-4 products" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center my-4">
            <nav>
              <ul className="pagination pagination-sm custom-pagination mb-0">
                <li className="page-item active">
                  <span className="page-link active-link">1</span>
                </li>
                <li className="page-item">
                  <button className="page-link no-border">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link no-border">3</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPageLayout;
