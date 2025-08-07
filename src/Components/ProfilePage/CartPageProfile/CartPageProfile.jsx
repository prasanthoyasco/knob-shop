import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';

function CartPageProfile() {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // ✅ Use CartContext

  useEffect(() => {
    console.log("Cart items from context:", cartItems);
  }, [cartItems]);

  return (
    <div className="wishlist-container">
      <h2>My Cart</h2>
      <div className="wishlist-grid mt-5">
        {cartItems?.map((product) => {
          console.log("Cart product:", product); // ✅ Debugging each item
          return (
            <div
              key={product.id}
              className="wishlist-item"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product.id}`)} // ✅ Fixed camelCase
            >
              <img
                src={
                  product?.variant?.[0]?.images?.[0]?.url ||
                  product.images?.[0] ||product.image ||
                  'https://via.placeholder.com/150' // fallback image
                }
                alt={product.name || 'Product'}
              />
              <h6>{product.name?.split(' ').slice(0, 3).join(' ') || product.title}</h6>
              {product.brand && product.brand !== "0" && (
  <p>
    Brand: <strong>{product.brand}</strong>
  </p>
)}


{(product.variant?.[0]?.title || product.colorsText) &&
 (product.variant?.[0]?.title || product.colorsText) !== "0" && (
  <p>
    Color: <strong>{product.variant?.[0]?.title || product.colorsText}</strong>
  </p>
)}


              <p>
                Price: <strong>₹{product.variant?.[0]?.sizes?.[0]?.sellingPrice || product.price}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CartPageProfile;
