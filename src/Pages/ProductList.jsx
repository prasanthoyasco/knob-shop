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

  // unified query (from either URL param or search param)
  const queryParam = query || new URLSearchParams(location.search).get("query");

  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let res;

        // 🔍 Search query case
        if (queryParam) {
          console.log("Searching for query:", queryParam);
          res = await searchProductsByParam(queryParam, {
            page: currentPage,
            limit: itemsPerPage,
          });

          const data = res?.results  || [];
          const backendTotal =
            res?.pagination?.totalProducts ||
            res?.total ||
            res?.count ||
            0;

        console.log("API Response for query:", res); // ✅ log full response
        console.log("Mapped products:", data.map(mapProduct)); // ✅ log mapped products
          setProducts(data.map(mapProduct));
          setCount(backendTotal);
          setTotalCount(backendTotal);
          return;
        }


        // 🏷️ Brand filter
        if (brandName) {
          res = await getProductsByBrand(brandName, {
            page: currentPage,
            limit: itemsPerPage,
          });

          const data = res?.products || [];
          const backendTotal =
            res?.pagination?.totalProducts ||
            res?.total ||
            res?.count ||
            0;


          setProducts(data.map(mapProduct));
          setCount(backendTotal);
          setTotalCount(backendTotal);
          return;
        }


        // 📦 All products with API pagination
        if (categoryId === "all-products") {
          res = await getAllProducts({ page: currentPage, limit: itemsPerPage });

          const data = res?.products || res?.data || [];

          console.log("API Response:", res);
          console.log("Products returned (current page):", data.length);
          console.log("Backend total:", res?.total);


          setProducts(data.map(mapProduct));

          const backendTotal = res?.pagination?.totalProducts || data.length;

          console.log("Correct backend total:", backendTotal);

          setCount(backendTotal);
          setTotalCount(backendTotal);


          return;
        }



        // 🧭 Category filter
        res = await fetchProductsByCategory(categoryId, {
          page: currentPage,
          limit: itemsPerPage,
        });

        const data = res?.products || res?.data || [];
        setProducts(data.map(mapProduct));
        setCount(res?.total || data.length);
        setTotalCount(res?.total || data.length);
        console.log("Total Products Count:", res?.total || data.length);


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
  }, [location, currentPage]);

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
        categoryData={categoryId}
        searchQuery={queryParam}

        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
      <Footer />
    </>
  );
};
