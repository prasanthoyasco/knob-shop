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
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchProductsByCategory,getAllProducts,getProductsByBrand  } from "../API/productApi";
import { searchProductsByParam } from '../API/productApi'
export const ProductList = () => {
  const { categoryId,brandName,query } = useParams();
  const location = useLocation();
  const passedState = location.state?.product;
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  console.log("items", products);
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
    image: item.images?.[0],
    variant: item.variant,
    hoverImage: item.images?.[1] || item.images?.[0],
    colors: item.variant?.map((v) => v.value) || ["#000"],
    features: item.features?.map((f) => f.title) || [],
    icons: item.key_features,
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let res;
        
        if (query) {
          res = await searchProductsByParam(query);
          const data = res?.results || res?.data || [];
          console.log("querry data res : ", res)
          console.log("querry data : ", data)
          setProducts(data.map(mapProduct));
          setCount(data.length);
          return;
        }
        
        if (brandName) {
          res = await getProductsByBrand(brandName);
          console.log(res.data);
          
          setCount(res?.data?.length);
        } else if (categoryId === "all-products") {
          res = await getAllProducts();
          setCount(res?.length);
        } else {
          res = await fetchProductsByCategory(categoryId);
        }
    
        // Normalize: support both array and { data: [...] }
        const productArray = Array.isArray(res) ? res : res.data;
        console.log("productArray", productArray);
        const mapped = productArray.map(mapProduct);
        setProducts(productArray);
      } catch (err) {
        console.error("Error fetching products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [categoryId, brandName, passedState,searchQuery]);
const [loading, setLoading] = useState(true);


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
        count={count}
        backgroundImage={lockerBg}
      />
      {/* <CategoryPageLayout products={products}/> */}
      <CategoryPageLayout2 products={products} categoryData={categoryId}/>
      <Footer />
      </>
  )
}

