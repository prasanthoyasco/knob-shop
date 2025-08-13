import { FaStar, FaHeart } from "react-icons/fa";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { useState,useEffect } from "react";
import {getReviewsByProduct} from '../../API/reviewApi'
const ProductCard = ({ product }) => {
  const [avgRating, setAvgRating] = useState(0);
  const navigate = useNavigate();

  const { addToCart, toggleDrawer } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const isWished = wishlistItems.some((w) => w.id === product.id);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const initialSizeLabel = product.variant?.[0]?.sizes?.[0]?.label ?? null;

  const [selectedSizeLabel, setSelectedSizeLabel] = useState(initialSizeLabel);

  const { id, title, rating } = product;
  const handleWishlistClick = () => {
    const authToken = localStorage.getItem("authToken");
    const authUser = localStorage.getItem("authUser");

    if (!authToken || !authUser) {
      // Optionally show a toast or redirect to login
      alert("Please login to add items to your wishlist.");
      navigate("/auth/register");
      // Or use a toast library: toast.error("Please login first.");
      return;
    }

    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!id) return; // avoid call if productId missing
        const reviews = await getReviewsByProduct(id);
        console.log("reviews data :",reviews)
        if (reviews?.length > 0) {
          const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
          const avg = sum / reviews.length;
          setAvgRating(avg.toFixed(1)); // keep 1 decimal place
        } else {
          setAvgRating(0);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [id]);
  

  // Use default icons if not present
  const icons =
    Array.isArray(product.key_features) && product.key_features.length > 0
      ? product.key_features.map((f) => ({
          title: f.title,
          image: f.image,
        }))
      : product.icons;

  const selectedVariant = product.variant?.[selectedColorIndex] ?? {};
  const selectedSize =
    selectedVariant?.sizes?.find((s) => s.label === selectedSizeLabel) ??
    selectedVariant?.sizes?.[0] ??
    {};
  const calculatedDiscount =
    selectedSize.mrp && selectedSize.sellingPrice
      ? Math.round(
          ((selectedSize.mrp - selectedSize.sellingPrice) / selectedSize.mrp) *
            100
        )
      : 0;

  function getCloudinaryTransformedUrl(url, width = 500, height = 500) {
    if (!url?.includes("/upload/")) return url;

    return url.replace(
      /\/upload\/(v\d+\/)?/,
      `/upload/w_${width},h_${height},c_pad,f_webp,q_auto:best,e_upscale,dpr_auto/$1`
    );
  }

  return (
    <div className="card product-card h-100 position-relative cursor-pointer">
      {calculatedDiscount > 0 && (
        <span className="badge bg-dark border-0 text-white position-absolute top-0 start-0 m-2">
          {calculatedDiscount}% off
        </span>
      )}
      <div
        className={`wishlist-icon-wrapper position-absolute top-0 end-0 m-2 ${
          isWished ? "text-danger" : "text-muted"
        }`}
        onClick={handleWishlistClick}
      >
        <FaHeart
          size={20}
          className={`wishlist-icon ${isWished ? "active" : ""}`}
        />
      </div>
      {avgRating > 0 && (
      <div className="position-absolute bottom-50 end-0 m-2 d-flex align-items-center rounded px-2 py-1 rating-overlay">
        <FaStar className="text-warning me-1" size={18} />
        <span className="normal">{avgRating}</span>
      </div>
      )}
      <div
        className="image-wrapper position-relative"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img
          src={getCloudinaryTransformedUrl(selectedVariant.images?.[0]?.url)}
          alt={title?.substring(0, 30)}
          className="card-img-top default-img"
        />
        <img
          src={getCloudinaryTransformedUrl(
            selectedVariant.images?.[1]?.url || selectedVariant.images?.[0]?.url
          )}
          alt={selectedVariant.images?.[1]?.url}
          className="card-img-top hover-img position-absolute top-0 start-0"
          onError={(e) => {
            const img = e.target;
            const originalUrl = getCloudinaryTransformedUrl(
              selectedVariant.images?.[1]?.url ||
                selectedVariant.images?.[0]?.url
            );

            if (!img.dataset.retried) {
              img.dataset.retried = "true";
              img.src = originalUrl + `?retry=${Date.now()}`; // retry once
            } else {
              img.src = "/fallback.png"; // fallback image path
            }
          }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        {/* Icons */}

        {icons?.length > 0 && (
          <div className="icons">
            {icons?.map((icon, index) => (
              <div className="icon" key={icon._id || icon.title || index}>
                <img src={`/${icon.image}`} alt={icon.title} />
                <span className="tooltip">{icon.title}</span>
              </div>
            ))}
          </div>
        )}

        {icons?.length > 0 && <hr />}

        {/* Title & Price */}
        <div className="mt-5 d-flex flex-column flex-grow-1">
          <h5 className="card-title single-line">{title}</h5>

          <p className="mb-2">
            <del className="text-muted">
              ₹{(selectedSize.mrp ?? 0).toLocaleString("en-IN")}
            </del>{" "}
            <strong style={{ color: "#D6791F" }}>
              ₹{(selectedSize.sellingPrice ?? 0).toLocaleString("en-IN")}
            </strong>
          </p>

          <p className="text-success mb-2">
            You Save ₹
            {Math.max(
              (selectedSize.mrp ?? 0) - (selectedSize.sellingPrice ?? 0),
              0
            ).toLocaleString("en-IN")}
          </p>

          {/* Color Select */}
          <div className="product-colors d-flex align-items-center gap-2 my-2">
            {product.variant?.map((color, index) => (
              <input
                key={index}
                type="radio"
                name={`color-${id}`}
                title={color.title}
                style={{
                  backgroundColor: color.value,
                  width: "24px",
                  height: "24px",
                  borderRadius: "9999px",
                  border:
                    selectedColorIndex === index
                      ? "2px solid gray"
                      : "1px solid gray",
                  cursor: "pointer",
                  appearance: "none",
                }}
                onChange={() => {
                  setSelectedColorIndex(index);
                  setSelectedSizeLabel(color.sizes?.[0]?.label ?? null);
                }}
              />
            ))}
          </div>

          {/* Size Select */}
          <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
            {selectedVariant.sizes?.filter((size) => size.label?.length)
              .length > 0 ? (
              <>
                {selectedVariant.sizes
                  .filter((size) => size.label?.length)
                  .slice(0, 1)
                  .map((size, idx) => (
                    <button
                      key={idx}
                      className={`px-3 py-1 rounded-pill border text-sm ${
                        selectedSizeLabel === size.label
                          ? "bg-dark text-white"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedSizeLabel(size.label)}
                    >
                      {size.label.split(" ")[0].slice(0, 8) + "..."}
                    </button>
                  ))}

                {selectedVariant.sizes.filter((s) => s.label?.length).length >
                  2 && <span className="text-muted text-sm">+ more..</span>}
              </>
            ) : (
              <button
                className="px-3 py-1 rounded-pill border text-sm border-gray-300 hover:bg-gray-100"
                onClick={() => setSelectedSizeLabel( "Default")}
              >
                Default size
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="card-buttons mt-2">
            <button
              className="View-detail"
              onClick={() => navigate(`/product/${id}`)}
            >
              View Details
            </button>
            <button
              className="Addtocart"
              onClick={() => {
                const itemToAdd = {
                  ...product,
                  color: selectedVariant?.value, // color hex or name
                  size: selectedSizeLabel,
                  quantity: 1,
                  price: selectedSize.sellingPrice, // optional but useful for clarity
                };
                addToCart(itemToAdd);
                toggleDrawer(true);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
