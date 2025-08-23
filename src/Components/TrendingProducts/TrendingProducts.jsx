import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard/ProductCard";
import "./TrendingProducts.css";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../API/productApi";
import { getReviewsByProduct } from "../../API/reviewApi";
import chair2 from "../../Assets/product-category/p6.jpg";

const tabs = [
  "All Products",
  "Latest Products",
  "Best Sellers",
  "Featured Products",
];

// helper: deterministic "random" index generator
function seededRandom(seed, max) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % max;
}

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollLeft = useRef(0);
  const navigate = useNavigate();

  // ✅ React Query for products
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", { random: true, limit: 60 }],
    queryFn: async () => {
      const response = await getAllProducts({ random: true, limit: 60 });
      const { data } = response;

      // Fetch ratings for each product
      return Promise.all(
        data.map(async (product) => {
          try {
            const reviews = await getReviewsByProduct(product._id);
            const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
            const avg =
              reviews.length > 0 ? (sum / reviews.length).toFixed(1) : 0;
            return { ...product, avgRating: avg };
          } catch {
            return { ...product, avgRating: 0 };
          }
        })
      );
    },
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const getFilteredProducts = () => {
    if (!products.length) return [];

    // Group by categoryId
    const categoryMap = {};
    products.forEach((product) => {
      const categoryId = product.category?._id || "Others";
      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = [];
      }
      categoryMap[categoryId].push(product);
    });

    // Deterministic daily seed
    const today = new Date().toISOString().split("T")[0];

    // Pick one product per category
    const onePerCategory = Object.keys(categoryMap).map((categoryId) => {
      const items = categoryMap[categoryId];
      const idx = seededRandom(today + categoryId, items.length);
      return items[idx];
    });

    switch (activeTab) {
      case "Latest Products":
        return onePerCategory
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
      case "Best Sellers":
        return onePerCategory.filter(
          (product) => product.variant?.[0]?.sizes?.[0]?.sellingPrice > 10000
        );
      case "Featured Products":
        return onePerCategory.filter(
          (product) => product.discount?.isActive || product.discount
        );
      default:
        return onePerCategory;
    }
  };

  const handleViewAll = () => {
    navigate("/category/all-products", {
      state: {
        product: {
          productList: products,
          text: "All Products",
        },
      },
    });
  };

  // auto-scroll carousel
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
    clearInterval(autoScrollRef.current);
    scrollRef.current.classList.add("dragging");
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startPos.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    startAutoScroll();
    scrollRef.current.classList.remove("dragging");
  };

  const onMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      scrollRef.current.classList.remove("dragging");
      startAutoScroll();
    }
  };

  if (isLoading) {
    return <div className="text-center py-10"></div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load products</div>;
  }

  return (
    <section className="container-fluied mx-4 py-5 trending-products">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="d-flex flex-column align-items-center mb-3 text-center">
            <h2 className="h5 text-uppercase fw-semibold product-head">
              <div className="section-line me-2"></div> Our Products
            </h2>
          </div>

          <ul className="custom-tabs mb-4">
            {tabs?.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabChange(tab)}
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
            >
              {getFilteredProducts()?.map((product, index) => {
                const {
                  _id,
                  name,
                  price,
                  compare_price,
                  images,
                  variant,
                  key_features,
                  discount,
                  features,
                  avgRating,
                } = product;

                const transformedProduct = {
                  id: _id,
                  title: name,
                  price: price || 0,
                  oldPrice: compare_price || price || 0,
                  discount: discount?.isActive ? discount.value : "",
                  rating: avgRating,
                  variant: variant,
                  hoverImage: images?.[1] || images?.[0] || chair2,
                  features: features || [],
                  icons: key_features,
                };

                return (
                  <div key={index} className="product-scroll-item">
                    <ProductCard product={transformedProduct} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <button className="ctn btn-animation" onClick={handleViewAll}>
              view All Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
