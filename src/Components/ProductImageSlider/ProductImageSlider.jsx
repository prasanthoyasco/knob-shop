import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import "./ProductImageSlider.css";
import { useSwipeable } from "react-swipeable";
import { useParams } from "react-router-dom";
import { getProductById } from "../../API/productApi";
const ProductImageSlider = () => {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        console.log("productsDetails : ", res);
        setProduct(res); // adjust if your API shape differs
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const images =
    product?.images?.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <div className="d-flex flex-column-reverse flex-md-row gap-3 position-relative">
      {/* Thumbnails */}
      <div
        className="d-flex flex-row flex-md-column align-items-center"
        style={{ maxHeight: 700 }}
      >
        {/* Arrow - Up (only visible on md+) */}
        <button
          onClick={handlePrev}
          className="btn d-none d-md-block w-100 mb-2"
          style={{ borderRadius: 0, background: "#EFEFEF", border: 0 }}
          disabled={currentIndex === 0}
        >
          <ChevronUp size={18} />
        </button>

        {/* Thumbnail List */}
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
              src={img}
              alt={`Thumb ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
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

        {/* Arrow - Down (only visible on md+) */}
        <button
          onClick={handleNext}
          className="btn d-none d-md-block w-100 mt-2"
          style={{ borderRadius: 0, background: "#EFEFEF", border: 0 }}
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Main Image */}
      <div
        className="product-image position-relative text-center"
        {...swipeHandlers}
      >
        {imageLoading && (
          <div
            className="position-absolute top-0 start-0 mx-auto w-100 h-100 d-flex align-items-center justify-content-center bg-light"
            style={{ zIndex: 1 }}
          >
            <span
              className="spinner-border text-secondary"
              role="status"
            ></span>
          </div>
        )}
        <img
          src={images[currentIndex]}
          alt="Main Product"
          className="img-fluid main-image"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "700px",
            objectFit: "cover",
            width: "100%",
          }}
        />
        <button
          onClick={handlePrev}
          className="btn border-0 position-absolute p-2 top-50 translate-middle-y"
          style={{
            zIndex: 2,
            left: "10px",
            background: "#ffffff6b",
            borderRadius: 0,
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="btn border-0 position-absolute p-2 top-50 translate-middle-y"
          style={{
            zIndex: 2,
            right: "10px",
            background: "#ffffff6b",
            borderRadius: 0,
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductImageSlider;
