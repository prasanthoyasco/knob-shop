import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToWishlist = (item) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      return exists ? prev : [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
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
