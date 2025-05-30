import { useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./TrendingProducts.css";

import chair from "../../Assets/product-category/p1.jpg";
import chair2 from "../../Assets/product-category/p6.jpg";
import sofa from "../../Assets/product-category/p2.jpg";
import sofa2 from "../../Assets/product-category/p3.jpg";
import sofa3 from "../../Assets/product-category/p4.jpg";
import bchair from "../../Assets/product-category/p3.jpg";
import bchair1 from "../../Assets/product-category/p7.jpg";

const tabs = [
  "All Products",
  "Latest Products",
  "Best Sellers",
  "Featured Products",
];

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
    id: 5,
    title: "Knobs",
    price: 19490,
    oldPrice: 23997,
    discount: 19,
    rating: 4.9,
    image: sofa,
    hoverImage: sofa2,
  },
];

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollLeft = useRef(0);

  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container?.firstChild?.offsetWidth || 300;
    const gap = 16;
    let scrollAmount = container.scrollLeft;

    autoScrollRef.current = setInterval(() => {
      if (!container) return;

      scrollAmount += cardWidth + gap;

      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
      }

      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 2000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(autoScrollRef.current);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startPos.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    clearInterval(autoScrollRef.current); // Stop auto-scroll on drag
    scrollRef.current.classList.add("dragging");
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startPos.current) * 2; // Adjust multiplier for drag speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    startAutoScroll(); // Resume auto-scroll after drag ends
    scrollRef.current.classList.remove("dragging");
  };

  const onMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      scrollRef.current.classList.remove("dragging");
      startAutoScroll(); // Resume auto-scroll if mouse leaves while dragging
    }
  };

  return (
    <section className="container-fluied mx-4 py-5 trending-products">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="">
            <div className="d-flex flex-column align-items-center mb-3 text-center">
              <h2 className="h5 text-uppercase fw-semibold product-head">
                <div className="section-line me-2"></div> Our Products
              </h2>
            </div>
          </div>

          <ul className="custom-tabs mb-4">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          <div className="position-relative">
            <div
              ref={scrollRef}
              className={"product-scroll-container"}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              // You can keep these if you still want auto-scroll to pause on hover
              // onMouseEnter={() => clearInterval(autoScrollRef.current)}
              // onMouseLeave={startAutoScroll}
            >
              {products.map((product, index) => (
                <div key={index} className="product-scroll-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <button className="ctn btn-animation"> view All Products</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;