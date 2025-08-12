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
              key={product._id}
              className="wishlist-item"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product.productId?._id}`)} // ✅ Fixed camelCase
            >
              <img
                src={
                  product?.variant?.[0]?.images?.[0]?.url ||
                  product.images?.[0] ||product.image || product.productId.images?.[0]||
                  'https://via.placeholder.com/150' // fallback image
                }
                alt={product.name || 'Product'}
              />
              <h6>{product.name?.split(' ').slice(0, 3).join(' ') || product.title || product.productId.name}</h6>
              {(product.brand || product.productId?.brand) && (product.brand || product.productId?.brand) !== "0" && (
  <p>
    Brand: <strong>{product.brand || product.productId?.brand}</strong>
  </p>
)}
{(() => {
  const colorTitle =
    product.variant?.[0]?.title ||
    product.colorsText ||
    product.productId?.variant?.[0]?.title ||
    product.productId?.color ||
    product.color;

  return colorTitle && colorTitle !== "0" && (
    <p>
      Color: <strong>{colorTitle}</strong>
    </p>
  );
})()}



              <p>
                Price: <strong>₹{product.variant?.[0]?.sizes?.[0]?.sellingPrice || product.price || product.productId.variant?.[0]?.sizes?.[0]?.sellingPrice}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CartPageProfile;
