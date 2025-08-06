import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addToWishlist as addToWishlistAPI,
  getWishlist,
  removeFromWishlist as removeFromWishlistAPI
} from '../API/wishlistApi';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const storedUserRaw = localStorage.getItem("authUser");
        const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

        if (!storedUser) return;

        const userId = storedUser.id || storedUser._id;
        const wishlist = await getWishlist(userId);
        setWishlistItems(wishlist);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

const addToWishlist = async (item) => {
  try {
    const storedUserRaw = localStorage.getItem("authUser");
    console.log("Stored User:", storedUserRaw);

    const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
    if (!storedUser) {
      console.error("No user found in localStorage");
      return;
    }

    const userId = storedUser.id || storedUser._id;
    console.log("Adding to wishlist for user:", userId);

    const productId = item.id || item._id;
    console.log("Product ID to add:", productId);

    await addToWishlistAPI({ userId, productId });

    const exists = wishlistItems.find(i => i.id === productId);
    if (!exists) {
      setWishlistItems((prev) => [...prev, item]);
    }
  } catch (error) {
    console.error('Add to wishlist failed:', error);
  }
};


  const removeFromWishlist = async (item) => {
  try {
    const { userId, id: productId } = item;
    await removeFromWishlistAPI({ userId, productId });

    setWishlistItems((prev) => prev.filter((i) => i.id !== productId));
  } catch (error) {
    console.error('Remove from wishlist failed:', error);
  }
};

  const clearWishlist = () => setWishlistItems([]);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        drawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
