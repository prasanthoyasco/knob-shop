// src/components/Cart/CartItemsList.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CartItemsList = ({
  cartItems,
  handleIncrement,
  handleDecrement,
  handleDelete,
  isTrackingPage = false,
}) => {
  const Navigate = useNavigate();
  console.log("CartItemsList rendered with items:", cartItems);

  if (!cartItems.length) {
    return (
      <div className="text-center my-5 d-flex flex-column align-items-center">
        <img src="/cart_empty.svg" alt="Empty Cart" style={{ width: "90px" }} />
        <p>Your cart is empty</p>
        <button
          className="btn btn-dark mt-3"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-100">
      <div className="shopping-cart-table-head">
        <div className="head-product">PRODUCT</div>
        <div className="head-quantity">QUANTITY</div>
        <div className="head-total">TOTAL</div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="shopping-cart-table-product">
          <div>
            <div className="shopping-cart-table-product-image">
              <img
                src={item.productId.variant?.[0]?.images[0]?.url || item.image || item.images[0]}
                alt={item.title}
                loading="lazy"
              />
              <div className="shopping-cart-table-product-image-content">
                {item.brand && <p>Brand : {item.brand}</p>}
                <h3>{item.title || item.name || item.productId.name}</h3>
                {item.productId.variant?.[0]?.title !== "0" &&
                item.productId.variant?.[0]?.title !== 0 &&
                item.productId.variant?.[0]?.title ? (
                  <p>Color : {item.productId.variant[0].title}</p>
                ) : item.colorsText !== "0" &&
                  item.colorsText !== 0 &&
                  item.colorsText ? (
                  <p>Color : {item.colorsText}</p>
                ) : null}
              </div>
            </div>
            <button
              className="continue-shopping-btn"
              onClick={() => {
                Navigate("/");
              }}
            >
              CONTINUE SHOPPING
            </button>
          </div>

          <div className="shopping-cart-table-product-count">
            <div className="shopping-cart-table-product-count-btn">
              <button
                onClick={() => handleDecrement(item.id)}
                disabled={item.quantity === 1 || isTrackingPage}
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.id)}
                disabled={isTrackingPage}
              >
                +
              </button>
            </div>
            {!isTrackingPage && (
              <div
                className="delete-icon cursor-pointer"
                onClick={() => handleDelete(item.id)}
              >
                <i className="bi bi-trash"></i>
              </div>
            )}
          </div>

          <div className="shopping-cart-table-product-total">
            <h3>
              {item.productId.variant?.[0]?.sizes?.[0]?.sellingPrice != null
                ? `₹${item.productId.variant[0].sizes[0].sellingPrice.toLocaleString(
                    "en-IN"
                  )}${
                    item.price
                      ? ` | ₹${item.price.toLocaleString("en-IN")}`
                      : ""
                  }`
                : item.price != null
                ? `₹${item.price.toLocaleString("en-IN")}`
                : `₹${item.variant[0].sizes[0].sellingPrice.toLocaleString(
                  "en-IN"
                )}`
                }
            </h3>
          </div>
        </div>
      ))}

      <div className="mobile-cart-page-container">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-mobile-product">
            <div className="cart-mobile-left">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="cart-mobile-right">
              <h3>{item.title}</h3>
              <div className="price-row">
                <span className="discount-price">
                  {item.variant?.[0]?.sizes?.[0]?.sellingPrice != null
                    ? `₹${item.variant[0].sizes[0].sellingPrice.toLocaleString(
                        "en-IN"
                      )}${
                        item.price
                          ? ` | ₹${item.price.toLocaleString("en-IN")}`
                          : ""
                      }`
                    : item.price != null
                    ? `₹${item.price.toLocaleString("en-IN")}`
                    : "Price not available"}
                </span>
              </div>
              <div className="quantity-remove-row">
                <div className="quantity-box">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity === 1 || isTrackingPage}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    disabled={isTrackingPage}
                  >
                    +
                  </button>
                </div>
                {!isTrackingPage && (
                  <div
                    className="remove-box"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CartItemsList.propTypes = {
  cartItems: PropTypes.array.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isTrackingPage: PropTypes.bool,
};

export default CartItemsList;
