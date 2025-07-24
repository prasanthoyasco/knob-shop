import CategoryHero from "../Components/CategoryHero/CategoryHero"
import CategoryPageLayout2 from "../Components/CategoryPageLayout2/CategoryPageLayout2"
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop"
import lockerBg from "../Assets/CategoriesImge/image.jpg"
// import chair from "../Assets/product-category/p1.jpg";
// import chair2 from "../Assets/product-category/p6.jpg";
// import sofa from "../Assets/product-category/p2.jpg";
// import sofa2 from "../Assets/product-category/p3.jpg";
// import sofa3 from "../Assets/product-category/p4.jpg";
// import bchair from "../Assets/product-category/p3.jpg";
// import bchair1 from "../Assets/product-category/p7.jpg";
import Footer from "../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../API/productApi";
export const ProductList = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const passedState = location.state?.product;
  const [products, setProducts] = useState([]);
  console.log("Received Product Data:", products);
  const mapProduct = (item) => ({
    id: item._id,
    title: item.name,
    brand: item.brand,
    category: item.category?.category_name,
    availability: item.stock > 0 ? "In Stock" : "Out of Stock",
    price: item.price,
    oldPrice: item.compare_price,
    discount: item.discount?.value || 0,
    rating: 4.5, // Optional: set from backend
    image: item.images?.[0],
    hoverImage: item.images?.[1] || item.images?.[0],
    colors: item.variant?.map((v) => v.value) || ["#000"],
    features: item.features?.map((f) => f.title) || [],
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      // Case 1: Navigated via "View All Products" (state passed)
      if (categoryId === "all-products" && passedState?.productList) {
        const transformed = passedState.productList.map(mapProduct);
        setProducts(transformed);
        setLoading(false);
        return;
      }

      // Case 2: Specific categoryId from params (fetch from API)
      try {
        const res = await fetchProductsByCategory(categoryId);
        const mapped = res.data.map(mapProduct);
        setProducts(mapped);
      } catch (err) {
        console.error("Error fetching category products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId, passedState]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000); 
    return () => clearTimeout(timeout);
  }, []);

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
          <p className="mt-3 fw-semibold">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
     <>
     <NavbarTop/>
      <CategoryHero
        title="Digital Safe Lockers"
        count={200}
        backgroundImage={lockerBg}
      />
      {/* <CategoryPageLayout products={products}/> */}
      <CategoryPageLayout2 products={products}/>
      <Footer />
      </>
  )
}

