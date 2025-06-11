import CategoryHero from "../Components/CategoryHero/CategoryHero"
import CategoryPageLayout from "../Components/CategoryPageLayout/CategoryPageLayout"
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop"
import lockerBg from "/categoryBg.jpg"
import chair from "../Assets/product-category/p1.jpg";
import chair2 from "../Assets/product-category/p6.jpg";
import sofa from "../Assets/product-category/p2.jpg";
import sofa2 from "../Assets/product-category/p3.jpg";
import sofa3 from "../Assets/product-category/p4.jpg";
import bchair from "../Assets/product-category/p3.jpg";
import bchair1 from "../Assets/product-category/p7.jpg";
import Footer from "../Components/Footer/Footer";

const products = [
  {
    id: 1,
    title: "Door Knob",
    price: 22490,
    oldPrice: 23599,
    discount: 5,
    rating: 4.9,
    image: bchair,
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
    hoverImage: bchair1,
  },
  {
    id: 3,
    title: "Safty Locker",
    price: 9490,
    oldPrice: 17997,
    discount: 47,
    rating: 4.9,
    image: chair,
    hoverImage: chair2,
  },
  {
    id: 4,
    title: "Door Hinje",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
  },
  {
    id: 2,
    title: "Knobs- Door Knob",
    price: 16290,
    oldPrice: 19412,
    discount: 25,
    rating: 4.9,
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
    image: sofa2,
    hoverImage: sofa,
  },
  {
    id: 7,
    title: "Safty Locker",
    price: 9490,
    oldPrice: 17997,
    discount: 47,
    rating: 4.9,
    image: chair,
    hoverImage: chair2,
  },
  {
    id: 8,
    title: "Door Hinje",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
  },
  {
    id: 5,
    title: "Knobs",
    price: 19490,
    oldPrice: 23997,
    discount: 19,
    rating: 4.9,
    image: sofa,
    hoverImage: sofa2,
  },
  {
    id: 6,
    title: "Door Hinje",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
  },
  {
    id: 9,
    title: "Door Hinje",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
  },
];

export const ProductList = () => {
  return (
     <>
     <NavbarTop/>
      <CategoryHero
        title="Digital Safe Lockers"
        count={200}
        backgroundImage={lockerBg}
      />
      <CategoryPageLayout products={products}/>
      <Footer />
      </>
  )
}

