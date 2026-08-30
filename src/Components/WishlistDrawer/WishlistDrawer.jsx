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
  const navigate = useNavigate();
  const { addToCart, toggleDrawer } = useCart();
  // const [addedItemIds, setAddedItemIds] = useState([]);

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
                        <button
                          className="btn btn-sm btn-dark me-2"
                          onClick={() => {
                            const variant = item.variant?.[0];
                            const sizeObj = variant?.sizes?.[0];

                            const cartItem = {
                              // Backend required fields
                              productId: item._id,
                              quantity: 1,
                              colorName: variant?.title || "",
                              colorCode: variant?.value || "",
                              sizeLabel: sizeObj?.label || "",

                              mrp: sizeObj?.mrp || 0,
                              sellingPrice: sizeObj?.sellingPrice || 0,

                              discountPercentage: sizeObj?.mrp
                                ? Math.round(
                                  ((sizeObj.mrp - sizeObj.sellingPrice) / sizeObj.mrp) * 100
                                )
                                : 0,

                              taxPercentage: sizeObj?.tax || 0,

                              image: variant?.images?.[0]?.url || item.images?.[0],

                              // Optional UI fields
                              title: item.name,
                              sku: item.productId,
                              categoryId: item.category?._id,
                              brand: item.brand,
                              category: item.category?.category_name || "",
                              colorsText: variant?.title || "",

                              savePrice:
                                (sizeObj?.mrp || 0) -
                                (sizeObj?.sellingPrice || 0),
                            };

                            addToCart(cartItem);
                            toggleDrawer(true);   // 🔥 This opens cart drawer like product page
                            onClose();            // Close wishlist
                          }}
                        >
                          Add to Cart
                        </button>

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
      </div>
    </>
  );
};

export default WishlistDrawer;
