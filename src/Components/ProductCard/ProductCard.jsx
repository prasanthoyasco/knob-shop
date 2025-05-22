// components/ProductCard.jsx
import { FaStar, FaHeart } from "react-icons/fa";
import "./ProductCard.css";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useState } from "react";

const ProductCard = ({ product }) => {
    // const [isWishlisted, setIsWishlisted] = useState(false);

  // const toggleWishlist = () => {
  //   setIsWishlisted(!isWishlisted);
  // };
  const {
    title,
    price,
    oldPrice,
    discount,
    rating,
    image,
  } = product;

  return (
   <div className="card product-card h-100 position-relative">
  {discount && (
    <span className="badge bg-dark text-white position-absolute top-0 start-0 m-2">
      {discount}% off
    </span>
  )}

  <div className="position-absolute top-0 end-0 m-2 d-flex align-items-center bg-white rounded px-2 py-1 shadow-sm">
    <FaStar className="text-warning me-1" size={12} />
    <span className="small">{rating}</span>
  </div>

  <div className="image-wrapper position-relative">
  <img src={image} alt={title} className="card-img-top default-img" />
  <img src={product.hoverImage} alt={title} className="card-img-top hover-img position-absolute top-0 start-0" />
</div>


  <div className="card-body d-flex flex-column">
    <h5 className="card-title">{title}</h5>

    <p className="mb-1">
      <strong style={{ color: "#222" }}>
        ₹ {(price ? +price : 0).toLocaleString("en-IN")}
      </strong>{" "}
      <del className="text-muted ms-2">
        ₹ {oldPrice.toLocaleString("en-IN")}
      </del>
    </p>
    <p className="text-success mb-2">
      You Save ₹ {(oldPrice - price).toLocaleString("en-IN")}
    </p>

<div className="product-colors d-flex gap-2 mt-2">
  <input type="radio" name="color" className="color-dot brown" />
  <input type="radio" name="color" className="color-dot gray" />
  <input type="radio" name="color" className="color-dot red" />
</div>
    {/* <div className="product-colors">
      <span className="color-dot brown"></span>
      <span className="color-dot grey"></span>
      <span className="color-dot red"></span>
      <input type="radio" className="color-dot brown" />
      <input type="radio" className="color-dot gray" />
      <input type="radio" className="color-dot red" />
    </div> */}

    {/* <div className="card-actions mt-auto">
      <button
        className="btn btn-sm"
        style={{
          background: "#B07D51",
          color: "#fff",
          padding: "0.4rem 1.5rem",
          fontSize: "0.75rem",
        }}
      >
        Choose Option
      </button>
      <div onClick={toggleWishlist} className="wishlist-icon-wrapper">
        {isWishlisted ? (
          <AiFillHeart className="wishlist-icon animate" color="#ff002b" />
        ) : (
          <AiOutlineHeart className="wishlist-icon animate" />
        )}
      </div>
    </div> */}
  </div>
</div>

  );
};

export default ProductCard;
