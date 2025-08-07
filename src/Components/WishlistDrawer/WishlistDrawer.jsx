import { X, Heart } from "lucide-react";
import "./WishlistDrawer.css"; // Reuse same styling
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useState } from "react";
const WishlistDrawer = ({
  show,
  onClose,
  wishlistItems = [],
  onRemove,
  onMoveToCart,
}) => {
  console.log("WishlistDrawer rendered with items:", wishlistItems);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedItemIds, setAddedItemIds] = useState([]);

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
                <div key={item.id} className="d-flex my-3">
                  <img
                    src={
                      item.variant[0]?.images?.[0]?.url ||
                      item.images?.[0] ||
                      "/fallback.png"
                    }
                    alt={item.title || item.name}
                    onClick={() => navigate(`/product/${item.id || item._id}`)}
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
                      {addedItemIds.includes(item.id || item._id) ? (
  <button className="btn btn-sm btn-dark me-2" disabled>
    Added
  </button>
) : (
  <button
    className="btn btn-sm btn-dark me-2"
    onClick={() => {
      const variant = item.variant?.[0];
      const sellingPrice =
        variant?.sizes?.[0]?.sellingPrice || item.price || 0;
      const cartItem = {
        id: item._id,
        title: item.name,
        price: sellingPrice,
        quantity: 1,
        variant: variant,
        image: variant?.images?.[0]?.url || item.images?.[0],
      };

      addToCart(cartItem);
      setAddedItemIds((prev) => [...prev, item.id || item._id]);
    }}
  >
    Add to Cart
  </button>
)}

                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={() => onRemove(item)}
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
                navigate("/account", { state: { section: "wishlist" } });
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
