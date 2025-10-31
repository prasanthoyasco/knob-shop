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
          res = await searchProductsByParam(queryParam);
          const data = res?.results || res?.data || [];
          setProducts(data.map(mapProduct));
          setCount(data.length);
          return;
        }

        // 🏷️ Brand filter
        if (brandName) {
          res = await getProductsByBrand(brandName);
          const data = Array.isArray(res) ? res : res.data || [];
          setProducts(data.map(mapProduct));
          setCount(data.length);
          return;
        }

        // 📦 All products
        if (categoryId === "all-products") {
          res = await getAllProducts();
          const data = Array.isArray(res) ? res : res.data || [];
          setProducts(data.map(mapProduct));
          setCount(data.length);
          return;
        }

        // 🧭 Category filter
        res = await fetchProductsByCategory(categoryId);
        const productArray = Array.isArray(res) ? res : res.data || [];
        setProducts(productArray.map(mapProduct));
        setCount(productArray.length);
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
  }, [location]);

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
      />
      <Footer />
    </>
  );
};
