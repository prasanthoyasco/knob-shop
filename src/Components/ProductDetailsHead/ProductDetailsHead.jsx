import React, { useState, useEffect } from "react";
import "./ProductDetailsHead.css";
import ProductImageSlider from "../ProductImageSlider/ProductImageSlider";
import { useCart } from "../../Context/CartContext"; // Make sure the path is correct
import { getProductById } from "../../API/productApi";
import { useParams } from "react-router-dom";

export default function ProductDetailsHead() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [pincodeInfo, setPincodeInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // Removed the unused 'selectedVariant' state variable as it's a derived value
  const { addToCart, toggleDrawer } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        console.log("product variant title: ", res?.variant?.[0]?.title); // Debug log, can be removed
        setProduct(res); // adjust if your API shape differs
        if (res?.variant?.length > 0) {
          const firstColor = res.variant[0].value;
          setSelectedColor(firstColor);

          // Auto-select first size of first color (if exists)
          const firstVariantWithSizes = res.variant[0];
          if (firstVariantWithSizes?.sizes?.length > 0) {
            setSelectedSize(firstVariantWithSizes.sizes[0].label);
          }
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Derive selectedVariant from product and selectedColor state
  const selectedVariant = product?.variant?.find(
    (v) => v.value === selectedColor
  );

  const selectedSizeObj = selectedVariant?.sizes?.find(
    (s) => s.label === selectedSize
  );

  const cartItem = {
    id: product?._id,
    title: product?.name,
    image: product?.images?.[0] || "default.jpg",
    price: selectedSizeObj?.sellingPrice || product?.price,
    productId: product?.productId,
    mrpPrice: selectedSizeObj?.mrp || product?.compare_price,
    brand: product?.brand,
    quantity,
    color: selectedColor || product?.variant?.[0]?.value || null,
    size: selectedSize || null,
    // Corrected to use selectedVariant's title, which reflects the chosen color
    colorsText: selectedVariant?.title || "",
    category: product?.category?.category_name || "",
    savePrice:
      (selectedSizeObj?.mrp || product?.compare_price || 0) -
      (selectedSizeObj?.sellingPrice || product?.price || 0),
    // Removed 'Features' and 'FeaturesIcon' as they were incorrectly mapped
    // from an array of key_features to single string properties for cartItem.
    // If you need to store features in the cart item, consider storing the
    // key_features array or a processed summary string.
  };

  const mrp = selectedSizeObj?.mrp || product?.compare_price || 0;
  const selling = selectedSizeObj?.sellingPrice || product?.price || 0;

  const discountPercent =
    mrp > 0 ? Math.round(((mrp - selling) / mrp) * 100) : 0;

  const handleCheck = async () => {
    const pinRegex = /^[1-9][0-9]{5}$/;

    if (!pinRegex.test(pincode)) {
      setIsChecked("invalid");
      setPincodeInfo(null);
      return;
    }

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();

      if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
        const office = data[0].PostOffice[0];
        setPincodeInfo({
          name: office.Name,
          district: office.District,
          state: office.State,
        });
        setIsChecked("valid");
      } else {
        setIsChecked("not_found");
        setPincodeInfo(null);
      }
    } catch (error) {
      console.error("Pincode check error:", error);
      setIsChecked("error");
      setPincodeInfo(null);
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

  const ProductDetailsSkeleton = () => (
    <div className="row g-4">
      <div className="col-12 col-md-6">
        <div className="skeleton-box w-100" style={{ height: "400px" }}></div>
      </div>
      <div className="col-12 col-md-6">
        <div
          className="skeleton-box mb-2"
          style={{ height: "20px", width: "30%" }}
        ></div>
        <div
          className="skeleton-box mb-3"
          style={{ height: "30px", width: "60%" }}
        ></div>
        <div
          className="skeleton-box mb-3"
          style={{ height: "100px", width: "100%" }}
        ></div>
        <div
          className="skeleton-box mb-2"
          style={{ height: "40px", width: "40%" }}
        ></div>
        <div className="d-flex gap-2">
          <div
            className="skeleton-box rounded-circle"
            style={{ height: 24, width: 24 }}
          ></div>
          <div
            className="skeleton-box rounded-circle"
            style={{ height: 24, width: 24 }}
          ></div>
          <div
            className="skeleton-box rounded-circle"
            style={{ height: 24, width: 24 }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid pt-4 px-3 px-md-5">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-4 small">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-item">Shop by Categories</span>
          <span className="breadcrumb-item">Digital Lockers</span>{" "}
          {/* Consider making this dynamic based on product.category */}
          <span className="breadcrumb-item active">{cartItem.title}</span>
        </nav>

        {loading ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="row g-4">
            {/* Image Section */}
            <div className="col-12 col-md-6">
              <ProductImageSlider
                images={selectedVariant?.images || []}
                fetchById={false}
              />
            </div>

            {/* Details */}
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-3 mb-md-2">
                <p className="text-muted fw-medium mb-0 d-flex gap-2">
                  <strong>Brand :</strong> {cartItem.brand}{" "}
                  <strong> SKU :</strong> {cartItem.productId}
                </p>
                <div className="d-flex gap-3">
                  <img
                    src="/share.svg"
                    alt="Share"
                    style={{ cursor: "pointer" }}
                    onClick={handleShare}
                  />
                  <img
                    src="/wishList.svg"
                    alt="Wishlist"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <h3 className="fw-bold mb-2">{cartItem.title}</h3>

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
                  <span style={{ color: "#D6791F" }}>
                    ₹ {cartItem.price?.toFixed(0)}
                  </span>
                  {discountPercent > 0 && (
                    <span
                      className="fw-semibold text-info ms-3"
                      style={{ fontSize: "14px" }}
                    >
                      {Number(discountPercent).toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                      % OFF
                    </span>
                  )}
                </h4>
                <p className="text-muted">
                  MRP: ₹ <s>{cartItem.mrpPrice}</s>{" "}
                  {cartItem.savePrice > 0 && (
                    <span className="text-success fw-semibold ms-2">
                      You Save ₹{" "}
                      {Number(cartItem.savePrice).toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  )}
                </p>
                <p className="text-muted small">Inclusive of all taxes</p>
              </div>

              {/* Color Selection */}
              <div className="mb-3">
                <p className="text-muted mb-1">
                  Color:{" "}
                  <span className="fw-semibold">
                    {Array.isArray(cartItem.colorsText)
                      ? cartItem.colorsText.join(" & ")
                      : cartItem.colorsText}
                  </span>
                </p>

                <div className="d-flex gap-2">
                  {(product?.variant || []).map((variantOption, index) => (
                    <button
                      key={index}
                      className={`rounded-circle border ${
                        selectedColor === variantOption.value
                          ? "border-dark p-1"
                          : ""
                      }`}
                      style={{
                        backgroundColor: variantOption.value || "#ddd",
                        width: 24,
                        height: 24,
                      }}
                      onClick={() => {
                        setSelectedColor(variantOption.value);

                        const variant = product?.variant?.find(
                          (v) => v.value === variantOption.value
                        );
                        if (variant?.sizes?.length > 0) {
                          setSelectedSize(variant.sizes[0].label);
                        } else {
                          setSelectedSize(null);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {selectedVariant?.sizes?.length > 0 && (
                <div className="mb-3">
                  <p className="text-muted mb-2">
                    Size:{" "}
                    <span className="fw-semibold">
                      {selectedSize || "Default Size"}
                    </span>
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    {selectedVariant.sizes.map((size, index) => {
                      if (!size.label?.length) return null;

                      return (
                        <button
                          key={index}
                          className={`btn py-1 px-3 fs-6 rounded-pill m-0 ${
                            selectedSize === size.label
                              ? "btn-dark"
                              : "btn-light"
                          }`}
                          onClick={() => setSelectedSize(size.label)}
                        >
                          {size.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 mb-3">
                <div
                  className="border rounded-pill d-flex align-items-center justify-content-between gap-2 px-3 quantity"
                  style={{ height: 50 }}
                >
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
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
                  className="btn btn-dark cart-btn py-3 m-0 rounded-pill cursor-pointer"
                  style={{ padding: "0 3rem" }}
                  // disabled={!selectedSize}
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
              {product?.key_features?.length > 0 && (
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-start gap-2 border rounded p-3 mb-3 fw-semibold small">
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

                  {product.key_features &&
                    product.key_features.map((feature, index) => (
                      <div
                        key={index}
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
                            src={`/${feature.image}`}
                            alt={feature.title}
                            height={20}
                          />
                        </div>
                        {feature.title}
                      </div>
                    ))}
                </div>
              )}

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
                  {product?.brochure && (
                    <div className="broucher fs-5 btn btn-link text-decoration-none text-black">
                      <a
                        href={product?.brochure}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center m-0 gap-1 text-decoration-none text-black"
                      >
                        <i className="bi bi-cloud-arrow-down-fill fs-4 me-1" />
                        Download Broucher
                      </a>
                    </div>
                  )}
                </div>

                {isChecked === "valid" && pincodeInfo && (
                  <p className="text-success mt-1 ms-3 fw-semibold small">
                    Delivery available to <strong>{pincodeInfo.name}</strong>,{" "}
                    {pincodeInfo.district}, {pincodeInfo.state}.
                  </p>
                )}

                {isChecked === "invalid" && (
                  <p className="text-danger mt-1 ms-3 fw-semibold small">
                    Invalid pincode format. Please enter a 6-digit pincode.
                  </p>
                )}

                {isChecked === "not_found" && (
                  <p className="text-warning mt-1 ms-3 fw-semibold small">
                    Could not find details for this pincode.
                  </p>
                )}

                {isChecked === "error" && (
                  <p className="text-danger mt-1 ms-3 fw-semibold small">
                    Something went wrong while checking pincode.
                  </p>
                )}
                <p className="text-gray mt-4 ms-3 fw-medium small">
                  For other Querys call this{" "}
                  <a href="tel:+919876543210" className="text-black fw-bold">
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
