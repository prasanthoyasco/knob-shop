import React, { useState } from "react";
import "./ProductDetailsHead.css";
import ProductImageSlider from "../ProductImageSlider/ProductImageSlider";
import { useCart } from "../../context/CartContext"; 

export default function ProductDetailsHead() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { addToCart, toggleDrawer } = useCart();

  const cartItem = {
    id: "ydme100nxt",
    title: "YDM50NXT Smart Door Lock",
    image:
      "https://yaleonline.in/cdn/shop/products/3_81f1fa71-fe33-40c6-afa8-fc7243435f3f.jpg",
    price: 89299,
    quantity: quantity,
    color: selectedColor,
  };

  const handleCheck = () => {
    if (pincode.trim()) {
      setIsChecked(true);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this product!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  return (
    <>
      <div className="container-fluid pt-4 px-3 px-md-5">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-4 small">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-item">Shop by Categories</span>
          <span className="breadcrumb-item">Digital Lockers</span>
          <span className="breadcrumb-item active">YDME100NxT</span>
        </nav>

        <div className="row g-4">
          {/* Image Section */}
          <div className="col-12 col-md-6">
            <ProductImageSlider />
          </div>

          {/* Details */}
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-2">
              <p className="text-muted fw-semibold mb-0">Brand : Yale</p>
              <div className="d-flex gap-3">
                <img
                  src="/share.svg"
                  alt="Share"
                  className="cursor-pointer"
                  onClick={handleShare}
                />
                <img
                  src="/wishList.svg"
                  alt="Wishlist"
                  className="cursor-pointer"
                />
              </div>
            </div>

            <h3 className="fw-bold mb-2">YDME50NxT Smart Door Lock</h3>

            <div className="d-flex align-items-center mb-2 flex-wrap gap-1">
              <span className="text-warning me-2 fs-5">★ ★ ★ ★ ☆</span>
              <span className="text-muted fw-medium">4.5</span>
              <span className="mx-2 text-muted">|</span>
              <span className="text-muted btn-link">Write a review</span>
            </div>

            <div className="mb-3 d-flex gap-2">
              <img src="/up-arrow.svg" alt="" style={{ height: "18px" }} />
              <span className="text-muted small">
                Ordered by 39 Customers
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-3">
              <h4 className="fw-bold d-flex align-items-center flex-wrap gap-2">
                <span style={{ color: "#D6791F" }}>₹ 89,299</span>
                <span
                  className="fw-semibold text-info"
                  style={{ fontSize: "14px" }}
                >
                  05% OFF
                </span>
              </h4>
              <p className="text-muted">
                MRP: ₹ <s>90,000</s>{" "}
                <span className="text-success fw-semibold ms-2">
                  You Save ₹ 701
                </span>
              </p>
              <p className="text-muted small">Inclusive of all taxes</p>
            </div>

            {/* Color Selection */}
            <div className="mb-3">
              <p className="text-muted mb-1">
                Color:{" "}
                <span className="fw-semibold">Black & Gray Pattern</span>
              </p>
              <div className="d-flex gap-2">
                {["black", "gray"].map((color) => (
                  <button
                    key={color}
                    className={`rounded-circle border ${
                      selectedColor === color ? "border-dark p-1" : ""
                    }`}
                    style={{
                      backgroundColor: color === "black" ? "#000" : "#ddd",
                      width: 24,
                      height: 24,
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 mb-3">
              <div
                className="border rounded-pill d-flex align-items-center justify-content-between gap-2 px-3 quantity"
                style={{ height: 50 }}
              >
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.max(prev - 1, 1))
                  }
                  className="btn btn-sm px-2"
                >
                  −
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="btn btn-sm px-2"
                >
                  ＋
                </button>
              </div>

              <button
                className="btn btn-dark cart-btn py-3 m-0 rounded-pill"
                style={{ padding: "0 3rem" }}
                onClick={() => {
                  addToCart(cartItem);
                  toggleDrawer(true);
                }}
              >
                ADD TO CART
              </button>
            </div>

            {/* Payment Icons */}
            <div className="d-flex gap-2 flex-wrap mb-3">
              {["visa", "paypal", "master", "discover"].map((p) => (
                <img
                  key={p}
                  src={`/payment-icon/${p}.svg`}
                  alt={p}
                  height={38}
                />
              ))}
            </div>

            {/* Features */}
            <div className="d-flex flex-wrap flex-md-nowrap justify-content-between gap-2 border rounded p-3 mb-3 fw-semibold small">
              <div className="d-block w-100 mb-3 d-md-none">
                <span
                  style={{
                    color: "#d6791f",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  Product Specifications
                </span>
              </div>

              {[
                { icon: "fingerprint", label: "Fingerprint" },
                { icon: "card_key", label: "Manual Card Access" },
                { icon: "machnic_key", label: "Manual Key Access" },
                { icon: "pin_code", label: "RFID" },
              ].map((item) => (
                <div
                  key={item.icon}
                  className="icons-data d-flex align-items-center gap-2"
                >
                  <div
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: 34,
                      height: 34,
                      border: "1px solid #515151",
                      background: "#F8F8F8",
                    }}
                  >
                    <img
                      src={`/product-icon/${item.icon}.svg`}
                      alt={item.label}
                      height={20}
                    />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Pincode checker */}
            <div className="mb-3">
              <div className="d-flex flex-column align-items-center flex-md-row gap-3">
                <div className="pin">
                  <div className="d-flex pincode-checker">
                    <input
                      type="text"
                      className="form-control border-0 py-2 px-3"
                      placeholder="Enter pincode"
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        setIsChecked(false);
                      }}
                    />
                    <button
                      className="btn text-white px-4"
                      style={{
                        backgroundColor: "#212121",
                        borderRadius: 0,
                      }}
                      onClick={handleCheck}
                    >
                      CHECK
                    </button>
                  </div>
                </div>
                <div className="broucher fs-5 btn btn-link text-decoration-none">
                  <h5 className="d-flex align-items-center m-0 gap-1">
                    <i className="bi bi-cloud-arrow-down-fill fs-4 me-1" />
                    Download Broucher
                  </h5>
                </div>
              </div>
              {isChecked && (
                <p className="text-success mt-1 ms-3 fw-semibold small">
                  Hurray!! Delivery is available!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
