// src/components/Cart/CartItemsList.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
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
      <div className="text-center my-5 py-5 d-flex flex-column align-items-center">
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
        <div key={item._id} className="shopping-cart-table-product">
          <div>
            <div
              className="shopping-cart-table-product-image mb-5"
              style={{ cursor: "pointer" }}
              onClick={() =>
                Navigate(`/product/${item.productId?._id || item.productId}`)
              }
            >
              <img
                src={
                  item.productId?.variant?.[0]?.images?.[0]?.url ||
                  item.image ||
                  item.images?.[0] ||
                  item.variant?.[0]?.images?.[0]?.url
                }
                alt={item.title}
                loading="lazy"
              />
              <div className="shopping-cart-table-product-image-content">
                {item.brand && (
                  <p>
                    Brand :{" "}
                    <strong style={{ color: "#d6791f" }}>{item.brand}</strong>
                  </p>
                )}
                <h3>{item.title || item.name || item.productId.name}</h3>
                {(item.colorName ||
                  item.colorsText ||
                  item.productId?.variant?.find((v) => v.value === item.colorCode)?.title) && (
                    <p>
                      Color:{" "}
                      <strong style={{ color: "#d6791f" }}>
                        {item.colorName ||
                          item.colorsText ||
                          item.productId?.variant?.find(
                            (v) => v.value === item.colorCode
                          )?.title ||
                          item.colorCode}
                      </strong>
                    </p>
                  )}
                <p>
                  {item.sizeLabel && (
                    <span>
                      {" "}
                      Size:{" "}
                      <strong style={{ color: "#d6791f" }}>
                        {item.sizeLabel}
                      </strong>
                    </span>
                  )}
                </p>
              </div>
            </div>
            {/* <button
              className="continue-shopping-btn"
              onClick={() => {
                Navigate("/");
              }}
            >
              CONTINUE SHOPPING
            </button> */}
          </div>

          <div className="shopping-cart-table-product-count">
            <div className="shopping-cart-table-product-count-btn">
              <button
                onClick={() => handleDecrement(item)}
                disabled={item.quantity === 1 || isTrackingPage}
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item)}
                disabled={isTrackingPage}
              >
                +
              </button>
            </div>
            {!isTrackingPage && (
              <div
                className="delete-icon cursor-pointer"
                onClick={() => handleDelete(item)}
              >
                <i className="bi bi-trash"></i>
              </div>
            )}
          </div>

          <div className="shopping-cart-table-product-total">
            <h3>
              {(() => {
                const variant =
                  item.productId?.variant?.find(
                    (v) => v.value === item.colorCode
                  ) || item.variant?.find((v) => v.value === item.colorCode);

                const sizeData = variant?.sizes?.find(
                  (s) => s.label === item.sizeLabel
                );

                const price =
                  sizeData?.sellingPrice ||
                  item.sellingPrice ||
                  item.price ||
                  null;

                return price
                  ? `₹${price.toLocaleString("en-IN")}`
                  : "Price not available";
              })()}
            </h3>
          </div>
        </div>
      ))}

      <div className="mobile-cart-page-container">
        {cartItems.map((item, index) => {
          console.log("Mobile Cart Item:", JSON.stringify(item, null, 2)); // Debugging log

          const color =
            item.colorName ||
            item.colorsText ||
            item.productId?.variant?.find((v) => v.value === item.colorCode)?.title ||
            item.productId?.variant?.[0]?.title;

          const size =
            item.sizeLabel ||
            item.size ||
            item.label ||
            item.variant?.label;

          console.log(
            "Rendering mobile item:",
            item._id,
            "Color:",
            color,
            "Size:",
            size,
            "Raw SizeLabel:", item.sizeLabel,
            "Raw ColorCode:", item.colorCode
          );
          return (
            <div key={item._id || `${item.productId}-${item.colorCode}-${index}`} className="cart-mobile-product">
              <div className="d-flex">
                <div
                  className="cart-mobile-left"
                  onClick={() =>
                    Navigate(
                      `/product/${item.productId?._id || item.productId}`
                    )
                  }
                >
                  <img src={item.productId?.variant?.[0]?.images?.[0]?.url ||
                    item.image ||
                    item.images?.[0] ||
                    item.variant?.[0]?.images?.[0]?.url} alt={item.title} loading="lazy" />
                </div>
                <div className="cart-mobile-right">
                  <h3
                    className="mt-2"
                    onClick={() =>
                      Navigate(
                        `/product/${item.productId?._id || item.productId}`
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {item.title || item.name || item.productId.name}
                  </h3>
                  <p className="variant-text">
                    {color && <span>Color: {color}</span>}
                    {size && <span> | Size: {size}</span>}
                  </p>

                  <div className="price-row d-flex justify-content-between gap-2 align-items-center">
                    <span className="discount-price">
                      {item.sellingPrice != null
                        ? `₹${item.sellingPrice.toLocaleString("en-IN")}`
                        : item.price != null
                          ? `₹${item.price.toLocaleString("en-IN")}`
                          : item.productId?.variant?.[0]?.sizes?.[0]?.sellingPrice != null
                            ? `₹${item.productId.variant[0].sizes[0].sellingPrice.toLocaleString("en-IN")}`
                            : "Price not available"}
                    </span>
                    <div className="quantity-remove-row">
                      <div className="quantity-box">
                        <button
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantity === 1 || isTrackingPage}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item)}
                          disabled={isTrackingPage}
                        >
                          +
                        </button>
                      </div>
                      {!isTrackingPage && (
                        <div
                          className="remove-box"
                          onClick={() => handleDelete(item)}
                        >
                          <i className="bi bi-trash"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
