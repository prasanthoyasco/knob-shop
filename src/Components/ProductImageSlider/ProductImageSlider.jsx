import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import "./ProductImageSlider.css";
import { useSwipeable } from "react-swipeable";

// ✅ Accept dynamic images and fallback to fetching from API
const ProductImageSlider = ({ images: propImages = [], fetchById = true }) => {
  const [product, setProduct] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef([]);
    const intervalRef = useRef(null);

  // Optional: Only fetch from API if fetchById is true
  useEffect(() => {
    const fetchProduct = async () => {
      if (!fetchById) return;

      const { id } = await import("react-router-dom").then((mod) =>
        mod.useParams()
      );
      const { getProductById } = await import("../../API/productApi");

      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [fetchById]);

  // ✅ Use prop images if passed, otherwise fall back to API data
  const images =
    propImages.length > 0
      ? propImages
      : product?.images?.length
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  // Scroll active thumbnail into view
  useEffect(() => {
    // Reset to first image when images change
    setCurrentIndex(0);
  }, [images]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    thumbnailRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
useEffect(() => {
    startAutoSlide();
    return stopAutoSlide; // cleanup
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) return; // prevent multiple timers
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000); // 3s per slide
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // const getTransformedImageUrl = (url, width = 700, height = 700) => {
  //   if (!url?.includes("/upload/")) return url;

  //   return url.replace(
  //     /\/upload\/(v\d+\/)?/,
  //     `/upload/w_${width},h_${height},c_pad,b_white,q_auto:best,e_upscale,f_auto,dpr_auto/$1`
  //   );
  // };

  return (
    <div className="d-flex flex-column-reverse flex-md-row gap-3 position-relative">
      {/* Thumbnails */}
      {/* <div
        className="d-flex flex-row flex-md-column align-items-center"
        style={{ maxHeight: 700 }}
      >
        <button
          onClick={handlePrev}
          className="btn d-none d-md-block w-100 mb-2"
          style={{ borderRadius: 0, background: "#EFEFEF", border: 0 }}
          disabled={currentIndex === 0}
        >
          <ChevronUp size={18} />
        </button>

        <div
          className="d-flex flex-row flex-md-column gap-2 overflow-auto"
          style={{
            maxHeight: 510,
            maxWidth: "100%",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              ref={(el) => (thumbnailRefs.current[i] = el)}
              src={img.url}
              alt={`Thumb ${i + 1}`}
              onClick={() => handleThumbnailClick(i)}
              className={`img-thumbnail ${
                currentIndex === i ? "border border-dark" : ""
              }`}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: 4,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="btn d-none d-md-block w-100 mt-2"
          style={{ borderRadius: 0, background: "#EFEFEF", border: 0 }}
        >
          <ChevronDown size={18} />
        </button>
      </div> */}

      {/* Main Image */}
       <div
      className="product-image-wrapper w-100 mx-auto position-relative text-center"
      {...swipeHandlers}
      onMouseEnter={stopAutoSlide} // pause on hover
      onMouseLeave={startAutoSlide} // resume on leave
    >
      {imageLoading && (
        <div
          className="position-absolute top-0 start-0 mx-auto w-100 h-100 d-flex align-items-center justify-content-center bg-light"
          style={{ zIndex: 1 }}
        >
          <span className="spinner-border text-secondary" role="status"></span>
        </div>
      )}

      <img
        src={images[currentIndex]?.url}
        alt="Main Product"
        className="img-fluid mx-auto main-image"
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />

      {/* Left Arrow */}
      <button onClick={handlePrev} className="arrow-btn left-arrow">
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button onClick={handleNext} className="arrow-btn right-arrow">
        <ChevronRight size={20} />
      </button>
    </div>
    </div>
  );
};

export default ProductImageSlider;
