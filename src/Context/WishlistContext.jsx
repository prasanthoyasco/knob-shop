import React, { createContext, useContext, useState } from "react";
import {
  addToWishlist as addToWishlistAPI,
  removeFromWishlist as removeFromWishlistAPI
} from '../API/wishlistApi';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

const addToWishlist = async (item) => {
  try {
    const storedUser = localStorage.getItem("authUser");
    const userId = storedUser.id || storedUser._id; 
    console.log("Adding to wishlist for user:", userId);
    const productId = item.id;
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
