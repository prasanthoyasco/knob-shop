import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPageLayout2.css";
import SortDropdown from "./SortDropdown";
import CategoryFilters from "./CategoryFilters";
import { getCategoryById } from "../../API/categoriesApi";

const CategoryPageLayout2 = ({ products = [], allProducts = [], categoryData, totalCount = 0, currentPage = 1, onPageChange, itemsPerPage = 12, filters, setFilters, sortOrder, setSortOrder, loading }) => {
  console.log("category", categoryData);
  console.log("product from category", products);

  // const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const paginatedProducts = products;


  console.log("totalCount:", totalCount);
  console.log("itemsPerPage:", itemsPerPage);
  console.log("totalPages:", totalPages);

  // default filters if undefined
  const [internalFilters, setInternalFilters] = useState(filters || {
    brand: [],
    availability: [],
    priceRange: [0, 1000000],
    colors: [],
    features: [],
    accessType: [],
  });

  const currentFilters = filters || internalFilters;
  const currentSetFilters = setFilters || setInternalFilters;

  // Initial sort state if somehow passed prop is missing
  const [internalSortOrder, setInternalSortOrder] = useState("");
  const currentSortOrder = sortOrder !== undefined ? sortOrder : internalSortOrder;
  const currentSetSortOrder = setSortOrder || setInternalSortOrder;

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (!categoryData || categoryData === "all-products") return;

    const fetchCategoryFilters = async () => {
      try {
        setFiltersLoading(true);
        const res = await getCategoryById(categoryData); // categoryData is ID here
        const filtersFromApi = res?.filters || [];

        // store filters for CategoryFilters component
        setCategoryFilters(filtersFromApi);

        // initialize filters state
        currentSetFilters((prev) => {
          let hasChange = false;
          const newFilters = prev ? { ...prev } : {};
          filtersFromApi.forEach((f) => {
            if (!(f.name in newFilters)) {
              hasChange = true;
              if (f.type === "range") {
                newFilters[f.name] = [0, 1000000];
              } else {
                newFilters[f.name] = [];
              }
            }
          });
          return hasChange ? newFilters : prev;
        });
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setFiltersLoading(false);
      }
    };

    fetchCategoryFilters();
  }, [categoryData]);

  //   const itemsPerPage = 12;
  //   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // const safeCurrentPage = Math.min(currentPage, totalPages || 1);
  // const paginatedProducts = (
  //   Array.isArray(filteredProducts) ? filteredProducts : []
  // ).slice((safeCurrentPage - 1) * itemsPerPage, safeCurrentPage * itemsPerPage);


  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  //   const applyFilters = () => {
  //     const getSellingPrice = (product) =>
  //       product?.variant?.[0]?.sizes?.[0]?.sellingPrice || 0;

  //     let result = [...products];
  //     const {
  //       brand,
  //       availability,
  //       colors,
  //       features,
  //       accessType,
  //       priceRange,
  //       ...dynamicFilters
  //     } = filters;

  //     if (brand.length > 0) {
  //       const selectedBrands = brand.map((b) => b.trim().toLowerCase());
  //       result = result.filter((p) =>
  //         selectedBrands.includes(p.brand?.trim().toLowerCase())
  //       );
  //     }

  //     if (availability.length > 0) {
  //       result = result.filter((p) =>
  //         availability.includes(p.stock > 0 ? "In Stock" : "Out of Stock")
  //       );
  //     }

  //     if (colors.length > 0) {
  //       const selectedColors = colors.map((c) => c.trim().toLowerCase());
  //       result = result.filter((p) =>
  //         (p.variant || []).some((v) =>
  //           selectedColors.includes(v.title?.trim().toLowerCase())
  //         )
  //       );
  //     }

  //     if (features.length > 0) {
  //       result = result.filter((p) =>
  //         p.features?.some((f) =>
  //           features.some((selected) =>
  //             f.description?.toLowerCase().includes(selected.toLowerCase())
  //           )
  //         )
  //       );
  //     }

  //     if (accessType.length > 0) {
  //       result = result.filter((p) => {
  //         const iconNames =
  //           p.icons?.map((icon) => icon.name?.toLowerCase()) || [];
  //         return accessType.some((type) =>
  //           iconNames.some((icon) => icon.includes(type.toLowerCase()))
  //         );
  //       });
  //     }

  //     // 🔍 Filter by sellingPrice
  //     const [minPrice, maxPrice] = priceRange;
  //     result = result.filter((p) => {
  //       const sellingPrice = getSellingPrice(p);
  //       return sellingPrice >= minPrice && sellingPrice <= maxPrice;
  //     });

  //     console.log("Applying dynamic filters...");
  //     const dynamicFilterConfigs = categoryFilters.filter((f) =>
  //       Object.keys(dynamicFilters).includes(f.name)
  //     );

  //     // Check which dynamic filters are being applied
  //     console.log(
  //       "Dynamic filters being applied:",
  //       dynamicFilterConfigs.map((f) => f.name)
  //     );

  // dynamicFilterConfigs.forEach((config) => {
  //     const filterName = config.name.trim().toLowerCase();
  //     const filterType = config.type;
  //     const filterValues = dynamicFilters[config.name];

  //     if (!filterValues || filterValues.length === 0) return;

  //     result = result.filter((p) => {
  //       if (!p?.tech_spec || p.tech_spec.length === 0) return false;

  //       // Get ALL matching tech_spec entries
  //       const matchingSpecs = p.tech_spec.filter(
  //         (ts) =>
  //           ts.title?.trim().toLowerCase() === filterName
  //       );

  //       if (matchingSpecs.length === 0) return false;

  //       if (filterType === "range") {
  //         const [min, max] = filterValues;

  //         return matchingSpecs.some((spec) => {
  //           const numericValue = parseFloat(
  //             spec.value.replace(/[^0-9.]/g, "")
  //           );

  //           if (isNaN(numericValue)) return false;

  //           return numericValue >= min && numericValue <= max;
  //         });
  //       } else {
  //         const lowerCaseFilterValues = filterValues.map((v) =>
  //           v.toLowerCase()
  //         );

  //         return matchingSpecs.some((spec) => {
  //           const techSpecValue = spec.value.toLowerCase();

  //           return lowerCaseFilterValues.some((selected) =>
  //             techSpecValue.includes(selected)
  //           );
  //         });
  //       }
  //     });
  //   });


  //     // Sort
  //     const normalizedSortOrder = sortOrder
  //       ?.trim()
  //       .toLowerCase()
  //       .replace(/–/g, "-");

  //     switch (normalizedSortOrder) {
  //       case "price, low to high":
  //         result.sort((a, b) => getSellingPrice(a) - getSellingPrice(b));
  //         break;
  //       case "price, high to low":
  //         result.sort((a, b) => getSellingPrice(b) - getSellingPrice(a));
  //         break;
  //       case "alphabetically, a-z":
  //         result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  //         break;
  //       case "alphabetically, z-a":
  //         result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
  //         break;
  //       case "date, old to new":
  //         result.sort(
  //           (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  //         );
  //         break;
  //       case "date, new to old":
  //         result.sort(
  //           (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  //         );
  //         break;
  //       default:
  //         break;
  //     }

  //     // onPageChange(1);
  // setFilteredProducts(result);


  //   };

  // 🛠️ Main filter effect
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     applyFilters();
  //     setLoading(false);
  //   }, 100);
  // }, [filters, sortOrder]);


  //   useEffect(() => {
  //   onPageChange(1);
  //   applyFilters();
  // }, [filters, sortOrder]);


  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     setCurrentPage(totalPages || 1);
  //   }
  // }, [totalPages]);

  const handleCheckboxChange = (filterName, value, checked) => {
    currentSetFilters((prev) => ({
      ...prev,
      [filterName]: checked
        ? [...(prev?.[filterName] || []), value]
        : (prev?.[filterName] || []).filter((item) => item !== value),
    }));
  };

  const handleResetFilters = () => {
    const resetFilters = {
      brand: [],
      availability: [],
      features: [],
      accessType: [],
      priceRange: [0, 1000000],
      colors: [],
    };

    // Reset dynamic API filters
    categoryFilters?.forEach((f) => {
      resetFilters[f.name] = f.type === "range" ? [0, 1000000] : [];
    });

    currentSetFilters(resetFilters);
    currentSetSortOrder("");
    setOpenSections({});
    window.history.replaceState(null, "", window.location.pathname); // Clear URL search params
    if (onPageChange) onPageChange(1);
  };

  // const handlePageChange = (pageNum) => {
  //   if (pageNum >= 1 && pageNum <= totalPages) {
  //     setCurrentPage(pageNum);
  //   }
  // };
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };
  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [products]);


  return (
    <div className="container-fluid py-4">
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
              className={`bi ${showMobileFilters ? "bi-chevron-up" : "bi-chevron-down"
                }`}
            ></i>
          </button>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="col-12 d-md-none mb-3">
            <CategoryFilters
              products={allProducts.length > 0 ? allProducts : products}
              filters={currentFilters}
              setFilters={currentSetFilters}
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
            products={allProducts.length > 0 ? allProducts : products}
            filters={currentFilters}
            setFilters={currentSetFilters}
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
              ({products.length} Of {totalCount} Items)
            </span>

            <div className="d-flex align-items-center gap-2 sort-control">
              <span className="text-muted small">Sort by:</span>
              <SortDropdown
                value={currentSortOrder}
                onChange={(sortValue) => currentSetSortOrder(sortValue)}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="row g-3 position-relative" style={{ minHeight: "400px" }}>
            {loading && (
              <div
                className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  zIndex: 10,
                  top: 0,
                  left: 0,
                }}
              >
                <div className="text-center">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 fw-medium text-dark">Updating products...</p>
                </div>
              </div>
            )}

            <div
              className={`row g-3 m-0 p-0 ${loading ? "opacity-50" : ""}`}
              style={{ transition: "opacity 0.3s ease" }}
            >
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-4 products"
                    key={product.id || product._id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : !loading && (
                <div className="col-12 text-center py-5">
                  <p className="text-muted w-100 max-w-full">No products found matching your criteria. <br /> <span style={{ marginTop: "1rem" }}>Try Changing the Filter</span> </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {Math.ceil(totalCount / itemsPerPage) > 1 && (
            <div className="d-flex justify-content-center my-4">
              <nav>
                <ul className="pagination pagination-sm custom-pagination mb-0">
                  {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }, (_, index) => {
                    const page = index + 1;

                    if (
                      page === 1 ||
                      page === Math.ceil(totalCount / itemsPerPage) ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <button
                            className={`page-link ${currentPage === page ? "active-link" : "no-border"}`}
                            onClick={() => {
                              console.log("Clicked page:", page);
                              onPageChange(page);
                            }}

                          >
                            {page}
                          </button>
                        </li>
                      );
                    }

                    if (page === currentPage - 2 || page === 2 || page === currentPage + 2 || page === Math.ceil(totalCount / itemsPerPage) - 1) {
                      return (
                        <li key={page} className="page-item disabled">
                          <span className="page-link px-0">...</span>
                        </li>
                      );
                    }

                    return null;
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
