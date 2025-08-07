import { useState,useEffect } from "react";
import RecommendedSlider from "./cart-drawer-recommend";
import { getAllProducts } from "../../API/productApi";
import "./CartDrawer.css";
import { NotebookPen, TruckIcon, X } from "lucide-react";
import { CountrySelect } from "./CountrySelect";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({
  show,
  onClose,
  cartItems = [],
  onRemove,
  onAddToCart,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [note, setNote] = useState("");
  const [country, setCountry] = useState("India");
  const [postalCode, setPostalCode] = useState("");
  const ShipPrice = 123456;
  const [shippingRate, setShippingRate] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const total = cartItems.reduce(
    (sum, item) => sum + item.variant?.[0]?.sizes[0].sellingPrice * item.quantity,
    0
  );
  useEffect(() => {
    // Fetch recommended items on mount or when drawer opens
    const fetchRecommended = async () => {
      try {
        const data = await getAllProducts(); // Or fetchProductsByCategory()
        setRecommendedItems(data || []);
      } catch (error) {
        console.error("Failed to fetch recommended items", error);
      }
    };

    if (show) fetchRecommended(); // fetch only if cart drawer is open
  }, [show]);

  return (
    <>
      <div
        className={`cart-backdrop ${show ? "show" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`cart-drawer ${show ? "open" : ""}`}>
        <div className="cart-drawer-header d-flex justify-content-between align-items-center px-3 py-1 py-md-2 border-bottom">
          <h5 className="mb-0 fs-6 fw-normal">
            {cartItems.length ? "Item Added to Your Cart" : "Shopping Cart"}
          </h5>
          <button
            className="btn p-0 m-0 border-0"
            title="Close cart"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className="cart-drawer-body px-3 py-2">
          {cartItems.length === 0 ? (
            <div className="text-center my-5 d-flex flex-column align-items-center">
              <img
                src="/cart_empty.svg"
                alt="Empty Cart"
                className="mb-3"
                style={{ width: "90px" }}
              />
              <p>Your cart is empty</p>
              <button className="btn btn-dark mt-3" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex my-3">
                  <img
  src={
    item.image || item.images?.[0] || item.variant?.[0]?.images?.[0]?.url || "/fallback.png"
  }
                    alt={item.title || item.name}
                    className="me-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.title || item.name}</h6>
                    <p className="text-muted mb-1">
  {item.colorsText
    ? item.colorsText
    : item.variant?.[0]?.title
    ? item.variant[0].title
    : "Variant info unavailable"}
</p>

                    <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold" style={{ color: "#d6791f" }}>
  ₹
  {item.variant?.[0]?.sizes?.[0]?.sellingPrice
    ? `${item.variant[0].sizes[0].sellingPrice.toLocaleString("en-IN")}` +
      (item.price ? ` | ₹${item.price.toLocaleString("en-IN")}` : "")
    : `${item.price?.toLocaleString("en-IN") || "0"}`}
</span>


                      <button
                        className="btn btn-link btn-sm text-danger p-0"
                        onClick={() => onRemove(item._id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* You may also like */}
        {/* <div className="cart-drawer-recommend px-3 py-3 border-top">
        <h6 className="mb-3">You may also like</h6>
        {recommendedItems.map((item) => (
          <div key={item.id} className="d-flex mb-3">
            <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} className="me-3" />
            <div className='d-flex align-items-center justify-content-between w-100'>
             <div> <p className="mb-1 fw-semibold">{item.title}</p>
              <p className="mb-1 small text-decoration-line-through text-muted">₹{item.oldPrice}</p>
              <p className="mb-1 fw-bold price">₹{item.price}</p></div>
              <button className="btn btn-link m-0 btn-sm p-2 text-dark rounded" onClick={() => onAddToCart(item)}>+ Add to Cart</button>
            </div>
          </div>
        ))}
      </div> */}
        {(!activeTab || cartItems.length === 0) && (
          <RecommendedSlider
          recommendedItems={recommendedItems}
          onAddToCart={(item) => {
            console.log("Adding from slider:", item); // Optional Debug
            onAddToCart(item); // ✅ Pass full item object
          }}
        />
        )}

        {cartItems.length > 0 && (
          <>
            <div className="border-top p-3 mt-3">
              {/* Tab Buttons */}
              <div className="d-flex justify-content-around align-items-center mb-3 gap-3">
                <button
                  className={`btn d-flex align-items-center gap-2 border-0 rounded-0 m-0 px-2 py-1 ${
                    activeTab === "notes" ? "text-dark" : "text-muted"
                  }`}
                  onClick={() =>
                    setActiveTab(activeTab === "notes" ? null : "notes")
                  }
                >
                  <NotebookPen size={18} />
                  <span>Note</span>
                </button>

                <div
                  style={{ height: "20px", width: "1px", background: "#ccc" }}
                ></div>

                <button
                  className={`btn d-flex align-items-center gap-2 border-0 rounded-0 m-0 px-2 py-1 ${
                    activeTab === "shipping" ? "text-dark" : "text-muted"
                  }`}
                  onClick={() =>
                    setActiveTab(activeTab === "shipping" ? null : "shipping")
                  }
                >
                  <TruckIcon size={18} />
                  <span>Shipping</span>
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === "notes" && (
                <div className="mb-3">
                  <textarea
                    className="form-control costum-textarea"
                    placeholder="Order Special instruction"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                  <div className="d-flex border-bottom gap-2 mt-3">
                    <button
                      className="btn btn-dark rounded-0 h-100 m-0"
                      style={{ flex: "0 0 60%" }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline-dark rounded-0 m-0 h-100"
                      style={{ flex: "0 0 40%" }}
                      onClick={() => setActiveTab(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="mb-3">
                  <CountrySelect country={country} setCountry={setCountry} />
                  <input
                    type="text"
                    className="form-control mb-3 costum-textarea"
                    placeholder="Postal/zip Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-dark rounded-0 m-0 h-100"
                      style={{ flex: "0 0 60%" }}
                      onClick={() => {
                        setShippingRate(123);
                      }}
                    >
                      Calculate
                    </button>
                    <button
                      className="btn btn-outline-dark rounded-0 m-0 h-100"
                      style={{ flex: "0 0 40%" }}
                      onClick={() => setActiveTab(null)}
                    >
                      Cancel
                    </button>
                  </div>

                  {shippingRate && (
                    <div className="mt-2">
                      <small>
                        <div className="Ship">
                          <p className="tex-muted">
                            We found 1 shipping rate(s) for your address
                            International Shipping:{" "}
                            <strong style={{ color: "#d6791f" }}>
                              ₹ {shippingRate.toLocaleString()}
                            </strong>
                          </p>
                        </div>
                      </small>
                    </div>
                  )}
                </div>
              )}

              {/* Subtotal */}
              <div className="d-flex justify-content-between fw-bold mt-3">
                <strong className="fs-4">Subtotal</strong>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div
              className={`cart-drawer-footer p-3 ${
                !show ? "mobile-footer-hidden" : ""
              }`}
            >
              <button
                className="btn btn-outline-dark rounded-0 py-2 w-100 m-0"
                onClick={() => {
                  onClose();
                  navigate("/view-cart", { state: { cartItems } });
                }}
              >
                View Cart
              </button>
              <button className="btn btn-dark w-100 h-100 m-0 py-2" onClick={()=>{onClose(); navigate('/payment', { state: { cartItems } })}}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
