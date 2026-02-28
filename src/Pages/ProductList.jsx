import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import CategoryHero from "../Components/CategoryHero/CategoryHero";
import CategoryPageLayout2 from "../Components/CategoryPageLayout2/CategoryPageLayout2";
import Footer from "../Components/Footer/Footer";
import lockerBg from "../Assets/CategoriesImge/image.jpg";
import {
  fetchProductsByCategory,
  getAllProducts,
  getProductsByBrand,
  searchProductsByParam,
} from "../API/productApi";

export const ProductList = () => {
  const { categoryId, brandName, query } = useParams();
  const location = useLocation();
  const passedState = location.state?.product;
  const [filters, setFilters] = useState({
    brand: [],
    colors: [],
    priceRange: [0, 100000],
  });
  // unified query (from either URL param or search param)
  const queryParam = query || new URLSearchParams(location.search).get("query");

  const [products, setProducts] = useState([]);
  const [allProductsForFilters, setAllProductsForFilters] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const mapProduct = (item) => ({
    id: item._id,
    title: item.name,
    brand: item.brand,
    category: item.category?.category_name,
    availability: item.stock > 0 ? "In Stock" : "Out of Stock",
    price: item.price,
    oldPrice: item.compare_price,
    discount: item.discount?.value || 0,
    rating: 4.5,
    tech_spec: item.tech_spec,
    image: item.images?.[0],
    hoverImage: item.images?.[1] || item.images?.[0],
    colors: item.variant?.map((v) => v.value) || ["#000"],
    features: item.features?.map((f) => f.title) || [],
    icons: item.key_features,
    variant: item.variant,
  });
  const buildQueryParams = () => {
    const { brand, colors, priceRange, ...dynamicFilters } = filters;
    const queryParams = {
      page: currentPage,
      limit: itemsPerPage,
    };

    if (brand?.length > 0) {
      queryParams.brand = brand.join(",");
    }

    if (colors?.length > 0) {
      queryParams.color = colors.join(",");
    }

    if (priceRange?.length === 2) {
      queryParams.minPrice = priceRange[0];
      queryParams.maxPrice = priceRange[1];
    }

    // Append all dynamic API filters
    Object.keys(dynamicFilters).forEach((key) => {
      const filterValue = dynamicFilters[key];
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        if (typeof filterValue[0] === "number" && filterValue.length === 2) {
          // It's a range filter.
          queryParams[`min_${key}`] = filterValue[0];
          queryParams[`max_${key}`] = filterValue[1];
        } else {
          // Checkbox/Radio string array
          queryParams[key] = filterValue.join(",");
        } // Ignore empty strings or values not handled
      }
    });

    return queryParams;
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let res;

        // 🔍 Search query case
        if (queryParam) {
          console.log("Searching for query:", queryParam);
          res = await searchProductsByParam(
            queryParam,
            buildQueryParams()
          );

          const data = res?.data || res?.results || [];
          const backendTotal =
            res?.pagination?.totalProducts ||
            res?.total ||
            res?.count ||
            (data ? data.length : 0);

          console.log("API Response for query:", res); // ✅ log full response
          console.log("Mapped products:", data.map(mapProduct)); // ✅ log mapped products
          setProducts(data.map(mapProduct));
          setCount(backendTotal);
          setTotalCount(backendTotal);
          return;
        }


        // 🏷️ Brand filter
        if (brandName) {
          res = await getProductsByBrand(
            brandName,
            buildQueryParams()
          );

          const data = res?.data || [];
          const backendTotal = res?.pagination?.totalProducts || 0;

          setProducts(data.map(mapProduct));
          setCount(backendTotal);
          setTotalCount(backendTotal);
          return;
        }


        // 📦 All products with API pagination
        if (categoryId === "all-products") {
          const queryParams = {
            page: currentPage,
            limit: itemsPerPage,
          };

          // 🔥 Add filters to API call
          if (filters.brand.length > 0) {
            queryParams.brand = filters.brand.join(",");
          }

          if (filters.colors.length > 0) {
            queryParams.color = filters.colors.join(",");
          }

          if (filters.priceRange) {
            queryParams.minPrice = filters.priceRange[0];
            queryParams.maxPrice = filters.priceRange[1];
          }

          res = await getAllProducts(queryParams);

          const data = res?.data || [];

          setProducts(data.map(mapProduct));
          setTotalCount(res?.pagination?.totalProducts || 0);
          return;
        }



        // 🧭 Category filter
        res = await fetchProductsByCategory(
          categoryId,
          buildQueryParams()
        );

        const data = res?.data || [];
        const backendTotal = res?.pagination?.totalProducts || 0;
        setProducts(data.map(mapProduct));
        setCount(backendTotal);
        setTotalCount(backendTotal);
        console.log("Total Products Count:", backendTotal);


      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Depend on location so it refreshes whenever query/path changes
    loadProducts();
  }, [location, currentPage, filters]);

  useEffect(() => {
    const fetchAllForFilters = async () => {
      try {
        let res;
        const noFilterParams = { limit: 1000 };
        if (queryParam) {
          res = await searchProductsByParam(queryParam, noFilterParams);
          setAllProductsForFilters((res?.data || res?.results || []).map(mapProduct));
        } else if (brandName) {
          res = await getProductsByBrand(brandName, noFilterParams);
          setAllProductsForFilters((res?.data || []).map(mapProduct));
        } else if (categoryId === "all-products") {
          res = await getAllProducts(noFilterParams);
          setAllProductsForFilters((res?.data || []).map(mapProduct));
        } else if (categoryId) {
          res = await fetchProductsByCategory(categoryId, noFilterParams);
          setAllProductsForFilters((res?.data || []).map(mapProduct));
        }
      } catch (err) {
        console.error("Error fetching all products for filters:", err);
        setAllProductsForFilters([]);
      }
    };
    fetchAllForFilters();
  }, [categoryId, brandName, queryParam]);

  // Pagination handler for all-products
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalCount / itemsPerPage)) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    console.log("Current Page Changed:", currentPage);
  }, [currentPage, categoryId, brandName, queryParam]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <img
            src="/favIcon.png"
            alt="logo"
            className="spinner-border"
            style={{ width: "60px", height: "60px", border: "none" }}
          />
          <p className="mt-3 fw-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavbarTop />
      <CategoryHero
        title={
          queryParam
            ? `Search results for "${queryParam}"`
            : brandName
              ? `${brandName} Products`
              : categoryId === "all-products"
                ? "All Products"
                : "Digital Safe Lockers"
        }
        count={count}
        backgroundImage={lockerBg}
      />
      <CategoryPageLayout2
        products={products}
        allProducts={allProductsForFilters.length > 0 ? allProductsForFilters : products}
        categoryData={categoryId}
        searchQuery={queryParam}

        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}

        filters={filters}
        setFilters={setFilters}
      />
      <Footer />
    </>
  );
};
