import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addProductToCart as addToCartAPI,
  deleteCartItem,
  getCartByUserId,
  clearCartAPI,
} from "../API/cartApi";
import { useRef } from "react";
import { getSharedCart, shareCart } from "../API/cartShareApi";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const sharedLoadedRef = useRef(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const skipInitialCartLoad = /^\/share-cart\//.test(window.location.pathname);


  // -----------------------------
  // Load Initial Cart (User OR Guest)
  // -----------------------------
  useEffect(() => {

    if (skipInitialCartLoad) return; // ✅ BLOCK initial cart load during shared load

    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = storedUser?.id || storedUser?._id;

    if (userId) {
      (async () => {
        const response = await getCartByUserId(userId);
        setCartItems(response);
      })();
    } else {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }

  }, []);

  const refreshCart = async (userId) => {
    try {
      const response = await getCartByUserId(userId);
      setCartItems(response);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };
  // Save to guest cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // -----------------------------
  // ADD TO CART (Variant-Safe)
  // -----------------------------
  const addToCart = async (item) => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = storedUser?.id || storedUser?._id;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.colorCode === item.colorCode &&
          i.sizeLabel === item.sizeLabel
      );

      if (existingItem) {
        return prev.map((i) =>
          i.productId === item.productId &&
            i.colorCode === item.colorCode &&
            i.sizeLabel === item.sizeLabel
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });

    setDrawerOpen(true);

    // Backend sync for logged-in users
    if (userId) {
      try {
        await addToCartAPI({
          userId,
          productId: item.productId,
          colorCode: item.colorCode,
          colorName: item.colorName,
          sizeLabel: item.sizeLabel,
          quantity: item.quantity || 1,
          sellingPrice: item.sellingPrice,
        });
        refreshCart(userId);
      } catch (error) {
        console.error("Add to cart API failed:", error);
      }
    }
  };

  // -----------------------------
  // REMOVE SPECIFIC VARIANT
  // -----------------------------
  const removeFromCart = async (item) => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = storedUser?.id || storedUser?._id;

    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.productId === item._id ||
            (item.productId._id &&
              i.colorCode === item.colorCode &&
              i.sizeLabel === item.sizeLabel)
          )
      )
    );

    if (userId) {
      try {
        await deleteCartItem({
          userId,
          productId: item.productId?._id || item.productId,
          colorCode: item.colorCode,
          sizeLabel: item.sizeLabel,
        });
      } catch (error) {
        console.error("Failed to remove item from backend:", error);
      }
    }
  };

  // -----------------------------
  // UPDATE QUANTITY (Variant-Safe)
  // -----------------------------
  const updateCartItemQuantity = async (item, change) => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = storedUser?.id || storedUser?._id;

    setCartItems((prev) =>
      prev
        .map((i) =>
          i.productId === item.productId &&
            i.colorCode === item.colorCode &&
            i.sizeLabel === item.sizeLabel
            ? {
              ...i,
              quantity: Math.max(1, i.quantity + change),
            }
            : i
        )
        .filter((i) => i.quantity > 0)
    );

    if (userId) {
      try {
        await addToCartAPI({
          userId,
          productId: item.productId,
          colorCode: item.colorCode,
          sizeLabel: item.sizeLabel,
          quantity: change,
        });
        refreshCart(userId);
      } catch (error) {
        console.error("Failed to update backend quantity:", error);
      }
    }
  };

  // -----------------------------
  // SHARE CART
  // -----------------------------
  const shareCurrentCart = async () => {
    try {
      const response = await shareCart(cartItems);
      if (response.link) {
        await navigator.clipboard.writeText(response.link);
        alert("Share link copied!");
      }
    } catch (error) {
      console.error("Share cart failed:", error);
    }
  };

  // -----------------------------
  // LOAD SHARED CART (With API Sync)
  // -----------------------------
  const loadSharedCart = async (token) => {
    if (sharedLoadedRef.current) {
      console.log("Shared cart already loaded. Skipping API...");
      return;
    }

    sharedLoadedRef.current = true;
    try {
      const sharedItems = await getSharedCart(token);
      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      const userId = storedUser?.id || storedUser?._id;

      if (!Array.isArray(sharedItems)) return;

      // Clear current cart
      await clearCart();

      // Update UI cart
      setCartItems(sharedItems);
      console.log("shared cart items", sharedItems);

      // ✅ If user logged in, also push items to backend cart
      if (userId) {
        for (const item of sharedItems) {
          await addToCartAPI({
            userId,
            productId: item.productId?._id || item.productId,
            colorCode: item.colorCode,
            colorName: item.colorName,
            sizeLabel: item.sizeLabel,
            quantity: item.quantity,
            sellingPrice: item.price || item.sellingPrice,
            mode: "set",
          });
        }

        // Refresh cart from server
        refreshCart(userId);
      }
    } catch (error) {
      console.error("Failed to load shared cart:", error);
    }
  };

  // -----------------------------
  // HELPERS
  // -----------------------------
  const toggleDrawer = (state) => setDrawerOpen(state);
  const clearCart = async () => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = storedUser?.id || storedUser?._id;

    // Clear UI cart immediately
    setCartItems([]);

    // Guest user — clear local storage only
    if (!userId) {
      localStorage.removeItem("cart");
      return;
    }

    // Logged-in user — clear backend
    try {
      await clearCartAPI(userId);
    } catch (error) {
      console.error("Failed to clear backend cart:", error);
    }
  };


  // Recommended items (unchanged)
  const recommendedItems = [
    {
      id: "ydm4109a",
      title: "YDM4109 A",
      image: "/images/feature-alarm.png",
      oldPrice: 49000,
      price: 57699,
      brand: "Yale",
      color: "Black",
    },
    {
      id: "ydm4107a",
      title: "YDM4109 B",
      image: "/images/feature-battery.png",
      oldPrice: 49000,
      price: 57699,
      brand: "Yale",
      color: "Black",
    },
    {
      id: "ydm4108a",
      title: "YDM4109 C",
      image: "/images/feature-fingerprint.png",
      oldPrice: 49000,
      price: 57699,
      brand: "Yale",
      color: "Black",
    },
  ];

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        drawerOpen,
        clearCart,
        toggleDrawer,
        shareCurrentCart,
        loadSharedCart,
        recommendedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
