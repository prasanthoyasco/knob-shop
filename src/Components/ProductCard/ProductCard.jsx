import { FaStar, FaHeart } from "react-icons/fa";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useState } from "react";

import chair from "../../Assets/product-category/p1.jpg";
import chair2 from "../../Assets/product-category/p6.jpg";
import sofa from "../../Assets/product-category/p2.jpg";
import sofa2 from "../../Assets/product-category/p3.jpg";
import sofa3 from "../../Assets/product-category/p4.jpg";
import bchair from "../../Assets/product-category/p3.jpg";
import bchair1 from "../../Assets/product-category/p7.jpg";

const productsDefault = [
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

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleDrawer } = useCart();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const initialSizeLabel = product.variant?.[0]?.sizes?.[0]?.label ?? null;

  const [selectedSizeLabel, setSelectedSizeLabel] = useState(initialSizeLabel);

  const { id, title, rating } = product;

  let icons = product.icons;

  // Use default icons if not present
  if (!icons || icons.length === 0) {
    const defaultMatch = productsDefault.find(
      (p) => p.title?.trim().toLowerCase() === title?.trim().toLowerCase()
    );
    icons = defaultMatch?.icons || [
      { name: "Card Key", imgUrl: "/product-icon/card_key.svg" },
      { name: "Pin Code", imgUrl: "/product-icon/pin_code.svg" },
      { name: "Fingerprint", imgUrl: "/product-icon/fingerprint.svg" },
      { name: "Machnic Key", imgUrl: "/product-icon/machnic_key.svg" },
    ];
  }

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

  return (
    <div className="card product-card h-100 position-relative cursor-pointer">
      {calculatedDiscount > 0 && (
        <span className="badge bg-dark border-0 text-white position-absolute top-0 start-0 m-2">
          {calculatedDiscount}% off
        </span>
      )}

      <div className="position-absolute top-0 end-0 m-2 d-flex align-items-center rounded px-2 py-1 rating-overlay">
        <FaStar className="text-warning me-1" size={18} />
        <span className="normal">{rating}</span>
      </div>

      <div
        className="image-wrapper position-relative"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img
          src={selectedVariant.images?.[0]?.url}
          alt={title}
          className="card-img-top default-img"
        />
        <img
          src={selectedVariant.images?.[1]?.url}
          alt={title}
          className="card-img-top hover-img position-absolute top-0 start-0"
        />
      </div>

      <div className="card-body d-flex flex-column">
        {/* Icons */}
        {(Array.isArray(icons) && icons.length > 0) ||
        (Array.isArray(product.key_features) &&
          product.key_features.length > 0) ? (
          <div className="icons">
            {(Array.isArray(icons) && icons.length > 0
              ? icons
              : product.key_features
            ).map((icon, index) => (
              <div className="icon" key={icon.id || icon.title || index}>
                <img src={`/${icon.image}`} alt={icon.title} />
                <span className="tooltip">{icon.title}</span>
              </div>
            ))}
          </div>
        ) : null}

        <hr />

        {/* Title & Price */}
        <div className="mt-2">
          <h5 className="card-title">{title}</h5>

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
          <div className="d-flex flex-wrap gap-2 mb-3">
                        {selectedVariant.sizes?.map((size, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded-pill border text-sm ${
                  selectedSizeLabel === size.label
                    ? "bg-dark text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedSizeLabel(size.label)}
              >
                {size.label}
              </button>
            ))}
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
                addToCart(product);
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
