import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPageLayout2.css";
import SortDropdown from "./SortDropdown";
import CategoryFilters from "./CategoryFilters";
import { getCategoryById } from "../../API/categoriesApi";

const CategoryPageLayout2 = ({ products = [], categoryData }) => {
  // ⬅ added categoryData
  console.log("category", categoryData);
  console.log("product from category", products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [filters, setFilters] = useState({
    brand: [],
    availability: [],
    priceRange: [0, 100000],
    colors: [],
    features: [],
    accessType: [],
    // dynamic filter keys will be added when applied
  });
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (!categoryData) return; // no ID yet

    const fetchCategoryFilters = async () => {
      try {
        setLoading(true);
        const res = await getCategoryById(categoryData); // categoryData is ID here
        const filtersFromApi = res?.filters || [];

        // store filters for CategoryFilters component
        setCategoryFilters(filtersFromApi);

        // initialize filters state
        setFilters((prev) => {
          const newFilters = { ...prev };
          filtersFromApi.forEach((f) => {
            if (f.type === "range") {
              newFilters[f.name] = [0, 100000];
            } else {
              newFilters[f.name] = [];
            }
          });
          return newFilters;
        });
      } catch (err) {
        console.error("Failed to fetch category filters", err);
        setCategoryFilters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryFilters();
  }, [categoryData]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const safeCurrentPage = Math.min(currentPage, totalPages || 1);
  const paginatedProducts = (
    Array.isArray(filteredProducts) ? filteredProducts : []
  ).slice((safeCurrentPage - 1) * itemsPerPage, safeCurrentPage * itemsPerPage);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const applyFilters = () => {
    const getSellingPrice = (product) =>
      product?.variant?.[0]?.sizes?.[0]?.sellingPrice || 0;

    let result = [...products];
    const {
      brand,
      availability,
      colors,
      features,
      accessType,
      priceRange,
      ...dynamicFilters
    } = filters;

    if (brand.length > 0) {
      result = result.filter((p) => brand.includes(p.brand));
    }

    if (availability.length > 0) {
      result = result.filter((p) =>
        availability.includes(p.stock > 0 ? "In Stock" : "Out of Stock")
      );
    }

    if (colors.length > 0) {
      const selectedColors = colors.map((c) => c.trim().toLowerCase());
      result = result.filter((p) =>
        (p.variant || []).some((v) =>
          selectedColors.includes(v.title?.trim().toLowerCase())
        )
      );
    }

    if (features.length > 0) {
      result = result.filter((p) =>
        p.features?.some((f) =>
          features.some((selected) =>
            f.description?.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
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

    // 🔍 Filter by sellingPrice
    const [minPrice, maxPrice] = priceRange;
    result = result.filter((p) => {
      const sellingPrice = getSellingPrice(p);
      return sellingPrice >= minPrice && sellingPrice <= maxPrice;
    });

    console.log("Applying dynamic filters...");
    const dynamicFilterConfigs = categoryFilters.filter((f) =>
      Object.keys(dynamicFilters).includes(f.name)
    );

    // Check which dynamic filters are being applied
    console.log(
      "Dynamic filters being applied:",
      dynamicFilterConfigs.map((f) => f.name)
    );

    dynamicFilterConfigs.forEach((config) => {
      const filterName = config.name.toLowerCase();
      const filterType = config.type;
      const filterValues = dynamicFilters[config.name];

      console.log(`- Filtering by: ${config.name}`);
      console.log(`- Selected values:`, filterValues);

      if (!filterValues || filterValues.length === 0) {
        console.log(`- No values selected for ${config.name}, skipping.`);
        return;
      }

      result = result.filter((p) => {
        console.log(p);
        
        if (!p) {
        return false;
    }
        const techSpecEntry = p.tech_spec?.find(
          (ts) => ts.title.toLowerCase() === filterName
        );

        // Log the comparison to see if a match is found
        console.log(`-- Checking product '${p.title}'`);
        console.log(
          `-- Does '${p.name}' have a tech_spec with title matching '${config.name}'?`,
          !!techSpecEntry
        );

        if (!techSpecEntry) {
          return false;
        }

        const techSpecValue = techSpecEntry.value.toLowerCase();
        console.log(`-- Product tech_spec value is: '${techSpecValue}'`);

        if (filterType === "range") {
          const numericValue = parseFloat(
            techSpecValue.replace(/[^0-9.]/g, "")
          );
          const [min, max] = filterValues;
          // Log the range comparison
          console.log(
            `-- Comparing numeric value (${numericValue}) with range [${min}, ${max}]`
          );
          return numericValue >= min && numericValue <= max;
        } else {
          const lowerCaseFilterValues = filterValues.map((v) =>
            v.toLowerCase()
          );
          // Log the list comparison
          console.log(
            `-- Checking if selected values [${lowerCaseFilterValues}] include product value '${techSpecValue}'`
          );
          return lowerCaseFilterValues.includes(techSpecValue);
        }
      });
    });

    // Sort
    const normalizedSortOrder = sortOrder
      ?.trim()
      .toLowerCase()
      .replace(/–/g, "-");

    switch (normalizedSortOrder) {
      case "price, low to high":
        result.sort((a, b) => getSellingPrice(a) - getSellingPrice(b));
        break;
      case "price, high to low":
        result.sort((a, b) => getSellingPrice(b) - getSellingPrice(a));
        break;
      case "alphabetically, a-z":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "alphabetically, z-a":
        result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "date, old to new":
        result.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        );
        break;
      case "date, new to old":
        result.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default:
        break;
    }

    setCurrentPage(1);
    setFilteredProducts(result);
  };

  // 🛠️ Main filter effect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      applyFilters();
      setLoading(false);
    }, 100);
  }, [filters, sortOrder, products]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  const handleCheckboxChange = (filterName, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: checked
        ? [...(prev[filterName] || []), value]
        : (prev[filterName] || []).filter((item) => item !== value),
    }));
  };

  const handleResetFilters = () => {
    const resetFilters = {
      brand: [],
      availability: [],
      features: [],
      accessType: [],
      priceRange: [0, 10000],
      colors: [],
    };

    // Reset dynamic API filters
    categoryFilters?.forEach((f) => {
      resetFilters[f.name] = f.type === "range" ? [0, 100000] : [];
    });

    setFilters(resetFilters);
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
              categoryFilters={categoryFilters || []}
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
            categoryFilters={categoryFilters || []} // ⬅ pass API filters
          />
        </div>

        {/* Products + Sort + Pagination */}
        <div className="col-md-9">
          <div
            className="d-flex justify-content-between p-2 p-md-3 align-items-center mb-3 flex-wrap"
            style={{ border: "1px solid #DADADA", borderRadius: "4px" }}
          >
            <span className="item-count fw-medium" style={{ color: "#252525" }}>
              ({filteredProducts.length} Of {products.length} Items)
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
            ) : products.length > 0 ? (
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
