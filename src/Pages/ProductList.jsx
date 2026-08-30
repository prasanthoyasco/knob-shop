import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Initialize filters from URL search params
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = {
      brand: params.get("brand")?.split(",").filter(Boolean) || [],
      colors: params.get("colors")?.split(",").filter(Boolean) || [],
      priceRange: [
        Number(params.get("minPrice")) || 0,
        Number(params.get("maxPrice")) || 1000000,
      ],
    };

    // Any other key in URL is treated as a dynamic filter
    params.forEach((value, key) => {
      if (!["brand", "colors", "minPrice", "maxPrice", "sortBy", "query", "page", "limit"].includes(key)) {
        initialFilters[key] = value.split(",").filter(Boolean);
      }
    });

    return initialFilters;
  });

  const [sortOrder, setSortOrder] = useState(searchParams.get("sortBy") || "");
  // unified query (from either URL param or search param)
  const queryParam = query || searchParams.get("query");

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
      if (priceRange[0] > 0) {
        queryParams.minPrice = priceRange[0];
      }
      if (priceRange[1] < 1000000) {
        queryParams.maxPrice = priceRange[1];
      }
    }

    if (sortOrder) {
      queryParams.sortBy = sortOrder;
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
    console.log("Filters or Sort changed, resetting to page 1");
    setCurrentPage(1);
  }, [filters, sortOrder]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let res;

        // 🔍 Search query case
        if (queryParam) {
          console.log("Searching for query:", queryParam);
          res = await searchProductsByParam(queryParam, buildQueryParams());

          const data = res?.data || res?.results || [];
          const backendTotal =
            res?.pagination?.totalProducts ||
            res?.total ||
            res?.count ||
            (data ? data.length : 0);

          setProducts(data.map(mapProduct));
          setCount(backendTotal);
          setTotalCount(backendTotal);
          return;
        }

        // 🏷️ Brand filter
        if (brandName) {
          res = await getProductsByBrand(brandName, buildQueryParams());
          const data = res?.data || [];
          const backendTotal = res?.pagination?.totalProducts || 0;
          setProducts(data.map(mapProduct));
          setCount(backendTotal);
          setTotalCount(backendTotal);
          return;
        }

        // 📦 All products with API pagination
        if (categoryId === "all-products") {
          const queryParams = buildQueryParams();
          res = await getAllProducts(queryParams);
          const data = res?.data || [];
          setProducts(data.map(mapProduct));
          const total = res?.pagination?.totalProducts || 0;
          setCount(total);
          setTotalCount(total);
          return;
        }

        // 🧭 Category filter
        res = await fetchProductsByCategory(categoryId, buildQueryParams());
        const data = res?.data || [];
        const backendTotal = res?.pagination?.totalProducts || 0;
        setProducts(data.map(mapProduct));
        setCount(backendTotal);
        setTotalCount(backendTotal);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [location.pathname, currentPage, filters, sortOrder]);

  // 🔄 Sync filters state back to URL search params
  useEffect(() => {
    const newParams = new URLSearchParams();

    // Preserve existing special params like query
    if (queryParam) newParams.set("query", queryParam);

    // Sync static filters
    if (filters.brand?.length > 0) newParams.set("brand", filters.brand.join(","));
    if (filters.colors?.length > 0) newParams.set("colors", filters.colors.join(","));

    if (filters.priceRange?.[0] > 0) newParams.set("minPrice", filters.priceRange[0]);
    if (filters.priceRange?.[1] < 1000000) newParams.set("maxPrice", filters.priceRange[1]);

    // Sync dynamic filters
    Object.keys(filters).forEach((key) => {
      if (!["brand", "colors", "priceRange"].includes(key)) {
        const val = filters[key];
        if (Array.isArray(val) && val.length > 0) {
          newParams.set(key, val.join(","));
        }
      }
    });

    if (sortOrder) newParams.set("sortBy", sortOrder);

    // Update URL without triggering a full page reload or unnecessary state updates
    setSearchParams(newParams, { replace: true });
  }, [filters, sortOrder]);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalCount / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

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
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default ProductList;
