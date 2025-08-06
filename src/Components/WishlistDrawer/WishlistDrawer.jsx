import { X, Heart } from "lucide-react";
import "./WishlistDrawer.css"; // Reuse same styling
import { useNavigate } from "react-router-dom";

const WishlistDrawer = ({
  show,
  onClose,
  wishlistItems = [],
  onRemove,
  onMoveToCart,
}) => {
  console.log("WishlistDrawer rendered with items:", wishlistItems);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`cart-backdrop ${show ? "show" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`cart-drawer ${show ? "open" : ""}`}>
        <div className="cart-drawer-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <h5 className="mb-0 fs-6 fw-normal">Your Wishlist</h5>
          <button className="btn p-0 m-0 border-0" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="cart-drawer-body px-3 py-2">
          {wishlistItems.length === 0 ? (
            <div className="text-center my-5 d-flex flex-column align-items-center">
              <Heart size={36} className="mb-3 text-muted" />
              <p>Your wishlist is empty</p>
              <button className="btn btn-dark mt-3" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <>
                <div key={item.id} className="d-flex my-3" onClick={() => navigate(`/product/${item.id}`)}>
                  <img
                    src={
                      item.variant[0]?.images?.[0]?.url ||
                      item.images?.[0] ||
                      "/fallback.png"
                    }
                    alt={item.title || item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.title || item.name}</h6>
                    <p className="text-muted mb-1">
                      {item.color || item.variant?.[0]?.title}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold text-warning">
                        ₹{item.variant?.[0]?.sizes?.[0].mrp.toLocaleString()}
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-dark me-2"
                          style={{ marginTop: "0" }}
                          onClick={() => onMoveToCart(item)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={() => onRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="cart-drawer-footer p-3">
            <button
              className="btn btn-dark w-100 mb-2 py-3"
              onClick={() => {
                onClose();
                navigate("/wishlist");
              }}
            >
              View Full Wishlist
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
