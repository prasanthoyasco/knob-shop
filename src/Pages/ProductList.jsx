import CategoryHero from "../Components/CategoryHero/CategoryHero"
import CategoryPageLayout2 from "../Components/CategoryPageLayout2/CategoryPageLayout2"
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
    brand: "Yale",
    category: "Knobs",
    availability: "In Stock",
    price: 22490,
    oldPrice: 23599,
    discount: 5,
    rating: 4.9,
    image: bchair,
    hoverImage: bchair1,
    colors: ["#000000", "#fbe9e7"],
    features: ["Accessory", "IP camera"],
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
  },
  {
    id: 2,
    title: "Knobs- Door Knob",
    brand: "Godrej",
    category: "Knobs",
    availability: "Out of Stock",
    price: 16290,
    oldPrice: 19412,
    discount: 25,
    rating: 4.9,
    image: sofa2,
    hoverImage: sofa,
    colors: ["#ff6f00", "#7ec6e3"],
    features: ["Accessory"],
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
  },
  {
    id: 3,
    title: "Safty Locker",
    brand: "Yale",
    category: "Lockers",
    availability: "In Stock",
    price: 9490,
    oldPrice: 17997,
    discount: 47,
    rating: 4.9,
    image: chair,
    hoverImage: chair2,
    colors: ["#5c3b1e", "#f8bbd0"],
    features: ["Wardrobe locks", "IP camera"],
    icons: [
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
    ],
  },
  {
    id: 4,
    title: "Door Hinje",
    brand: "Hettich",
    category: "Hinges",
    availability: "In Stock",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
    colors: ["#1565c0", "#43a047"],
    features: ["Video door phone"],
    icons: [],
  },
  {
    id: 5,
    title: "Knobs",
    brand: "Yale",
    category: "Knobs",
    availability: "In Stock",
    price: 19490,
    oldPrice: 23997,
    discount: 19,
    rating: 4.9,
    image: sofa,
    hoverImage: sofa2,
    colors: ["#ff6f00", "#a1887f"],
    features: ["Accessory"],
    icons: [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
       { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Store Manual key", imgUrl: "/product-icon/machnic_key.svg" },
    ],
  },
  {
    id: 6,
    title: "Door Hinje",
    brand: "Hettich",
    category: "Hinges",
    availability: "Out of Stock",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
    colors: ["#aa00ff", "#ffa726"],
    features: ["Video door phone"],
    icons: [],
  },
  {
    id: 7,
    title: "Safty Locker",
    brand: "Godrej",
    category: "Lockers",
    availability: "In Stock",
    price: 9490,
    oldPrice: 17997,
    discount: 47,
    rating: 4.9,
    image: chair,
    hoverImage: chair2,
    colors: ["#5c6bc0"],
    features: ["Wardrobe locks", "Accessory"],
    icons: [
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
    ],
  },
  {
    id: 8,
    title: "Door Hinje",
    brand: "Hettich",
    category: "Hinges",
    availability: "In Stock",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
    colors: ["#a1887f"],
    features: ["Video door phone"],
    icons: [],
  },
  {
    id: 9,
    title: "Door Hinje",
    brand: "Hettich",
    category: "Hinges",
    availability: "In Stock",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: sofa3,
    hoverImage: sofa3,
    colors: ["#d32f2f"],
    features: ["Video door phone"],
    icons: [],
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
      {/* <CategoryPageLayout products={products}/> */}
      <CategoryPageLayout2 products={products}/>
      <Footer />
      </>
  )
}

