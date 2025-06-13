import CategoryHero from "../Components/CategoryHero/CategoryHero"
import CategoryPageLayout2 from "../Components/CategoryPageLayout2/CategoryPageLayout2"
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop"
import lockerBg from "/categoryBg.jpg"
// import chair from "../Assets/product-category/p1.jpg";
// import chair2 from "../Assets/product-category/p6.jpg";
// import sofa from "../Assets/product-category/p2.jpg";
// import sofa2 from "../Assets/product-category/p3.jpg";
// import sofa3 from "../Assets/product-category/p4.jpg";
// import bchair from "../Assets/product-category/p3.jpg";
// import bchair1 from "../Assets/product-category/p7.jpg";
import Footer from "../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
export const ProductList = () => {
  const location=useLocation()
  const productData = location.state?.product
  console.log("Received Product Data:", productData);
  const products = productData?.productList?.map((item, index) => ({
    id: index + 1,
    title: item.name || "Product",
    brand: "Brand Name",
    category: productData?.text || "Category",
    availability: "In Stock",
    price: 9990, // Optional: set dynamically if available
    oldPrice: 10990,
    discount: 10,
    rating: 4.8,
    image: item.image,
    hoverImage: item.image,
    colors: ["#000000", "#fbe9e7"],
    features: ["Feature 1", "Feature 2"],
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
  }));
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

