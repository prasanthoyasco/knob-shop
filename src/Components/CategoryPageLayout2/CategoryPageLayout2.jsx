import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPageLayout2.css";
import SortDropdown from "./SortDropdown";
import CategoryFilters from "./CategoryFilters";

const CategoryPageLayout2 = ({ products = [] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      applyFilters();
      setCurrentPage(1); // Reset to page 1 on filters/sort change
      setLoading(false);
    }, 100);
  }, [filters, sortOrder, products]);

  const applyFilters = () => {
    let result = [...products];
    const { brand, availability, colors, features, accessType, priceRange } =
      filters;

    if (brand.length > 0) {
      result = result.filter((p) => brand.includes(p.brand));
    }

    if (availability.length > 0) {
      result = result.filter((p) =>
        availability.includes(p.inStock ? "In Stock" : "Out of Stock")
      );
    }

    if (colors.length > 0) {
      result = result.filter((p) => colors.includes(p.color));
    }

    if (features.length > 0) {
      result = result.filter((p) => {
        const title = p.title?.toLowerCase() || "";
        return features.some((feat) => title.includes(feat.toLowerCase()));
      });
    }

    if (accessType.length > 0) {
      result = result.filter((p) => {
        const iconNames =
          p.icons?.map((icon) => icon.name?.toLowerCase()) || [];
        return accessType.some((type) =>
          iconNames.some((icon) => icon.includes(type.toLowerCase()))
        );
      });
    }

    const [minPrice, maxPrice] = priceRange;
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
    setOpenSections({});
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Mobile Filters Button */}
        <div className="d-md-none mb-3">
          <button
            className="btn btn-outline-dark w-100 d-flex justify-content-between align-items-center"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span>
              <i className="bi bi-filter me-2"></i>Filters
            </span>
            <i
              className={`bi ${
                showMobileFilters ? "bi-chevron-up" : "bi-chevron-down"
              }`}
            ></i>
          </button>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="col-12 d-md-none mb-3">
            <CategoryFilters
              products={products}
              filters={filters}
              setFilters={setFilters}
              openSections={openSections}
              toggleSection={toggleSection}
              handleCheckboxChange={handleCheckboxChange}
              handleResetFilters={handleResetFilters}
            />
          </div>
        )}

        {/* Desktop Filters */}
        <div className="col-md-3 d-none d-md-block">
          <CategoryFilters
            products={products}
            filters={filters}
            setFilters={setFilters}
            openSections={openSections}
            toggleSection={toggleSection}
            handleCheckboxChange={handleCheckboxChange}
            handleResetFilters={handleResetFilters}
          />
        </div>

        {/* Products + Sort + Pagination */}
        <div className="col-md-9">
          <div
  className="d-flex justify-content-between p-2 p-md-3 align-items-center mb-3 flex-wrap"
  style={{ border: "1px solid #DADADA", borderRadius: "4px" }}
>
          <span className="item-count fw-medium" style={{ color: "#252525" }}>
          ({filteredProducts.length} Of {products?.length} Items)
        </span>

        <div className="d-flex align-items-center gap-2 sort-control">
          <span className="text-muted small">Sort by:</span>
          <SortDropdown onChange={(sortValue) => setSortOrder(sortValue)} />
        </div>
        </div>


          {/* Product Grid */}
          <div className="row g-3">
            {loading ? (
              <div className="text-center py-5">Loading...</div>
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-4 products"
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="text-center py-5">No products found.</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center my-4">
              <nav>
                <ul className="pagination pagination-sm custom-pagination mb-0">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className={`page-link ${
                            currentPage === page ? "active-link" : "no-border"
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageLayout2;
