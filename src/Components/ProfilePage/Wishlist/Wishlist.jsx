import React, { useEffect, useState } from "react";
import { getWishlist } from "../../../API/wishlistApi";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";

function Wishlist({ userId }) {
    const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWishlist(userId);
        setWishlist(response);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchWishlist();
  }, [userId]);

  if (loading) return <p>Loading wishlist...</p>;
  console.log("Wishlist items:", wishlist);

  if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid mt-5">
        {wishlist?.map((product) => (
          <div key={product._id} className="wishlist-item" style={{cursor: 'pointer'}} onclick={() => navigate(`/product/${product._id}`)}>
            <img
              src={
                product?.variant?.[0]?.images?.[0]?.url || product.images?.[0]
              }
              alt={product.name}
            />
            <h6>{product.name.split(' ').slice(0, 3).join(' ')}</h6>
            <p>Brand: <strong>{product.brand}</strong></p>

            {/* Variant Title */}
            <p>Color: <strong> {product.variant?.[0]?.title}</strong></p>

            {/* Size & Selling Price */}
            {product.variant?.[0]?.sizes?.map((size, index) => (
              <div key={index}>
                <p>Price: <strong>₹{size.sellingPrice}</strong></p>
                {/* {size.label && <p>Size: {size.label}</p>} */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
