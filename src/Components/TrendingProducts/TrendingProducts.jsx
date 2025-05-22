import { useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { IoIosArrowRoundForward, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./TrendingProducts.css";

import chair from "../../Assets/chair-acc-3.jpg";
import chair2 from "../../Assets/chair-acc-main.jpg";
import bed from "../../Assets/bed.png";
import locker from "../../Assets/locker.png";

const tabs = [
  "All Products",
  "Latest Products",
  "Best Sellers",
  "Featured Products",
];

const products = [
  {
    id: 1,
    title: "Digital Home Door Locker",
    price: 22490,
    oldPrice: 23599,
    discount: 5,
    rating: 4.9,
    image: locker,
    hoverImage: locker
  },
  {
    id: 2,
    title: "Ergonomic Office Chair",
    price: 16290,
    oldPrice: 19412,
    discount: 25,
    rating: 4.9,
    image: chair,
    hoverImage: chair2
  },
  {
    id: 3,
    title: "Bed Memory Foam Mattress",
    price: 9490,
    oldPrice: 17997,
    discount: 47,
    rating: 4.9,
    image: bed,
    hoverImage: bed
  },
  {
    id: 4,
    title: "Modern Wooden Chair",
    price: 12290,
    oldPrice: 14412,
    discount: 15,
    rating: 4.8,
    image: chair,
    hoverImage: chair2
  },
  {
    id: 5,
    title: "Luxury King Bed",
    price: 19490,
    oldPrice: 23997,
    discount: 19,
    rating: 4.9,
    image: bed,
    hoverImage: bed
  },
];

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  const startAutoScroll = () => {
    const container = scrollRef.current;
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

  const handleScrollLeft = () => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="container-fluied mx-4 py-5 trending-products">
      <div className="row mb-4">
        {/* Left Text */}
        {/* <div className="col-md-4 left-text">
          <h2 className="display-6 fw-semibold ">
            Everything
            <br />
            In
            <br />
            One Place
          </h2>
          <p className="text-muted mt-3 product-p">
            From timeless classics to modern must-haves — explore our full
            catalog of home and interior essentials.
          </p>
        </div> */}

        {/* Right Content */}
        <div className="col-md-12">
          <div className="">
            <div className="d-flex flex-column align-items-center mb-3 text-center">
              <h2 className="h5 text-uppercase fw-semibold product-head">
                <div className="section-line me-2"></div> Our Products
              </h2>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Products */}
          <div className="position-relative">
             {/*<button className="scroll-button left" onClick={handleScrollLeft}>
              <IoIosArrowBack size={18} />
            </button>*/}
            <div
              ref={scrollRef}
              className="product-scroll-container"
              onMouseEnter={() => clearInterval(autoScrollRef.current)}
              onMouseLeave={startAutoScroll}
            >
              {products.map((product, index) => (
                <div key={index} className="product-scroll-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* <button className="scroll-button right" onClick={handleScrollRight}>
              <IoIosArrowForward size={18} />
           </button>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
