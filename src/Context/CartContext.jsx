import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    setDrawerOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  };

  const recommendedItems = [
    {
      id: 'ydm4109a',
      title: 'YDM4109 A',
      image: '/images/feature-alarm.png',
      oldPrice: 49000,
      price: 57699,
    },
    {
      id: 'ydm4107a',
      title: 'YDM4109 B',
      image: '/images/feature-battery.png',
      oldPrice: 49000,
      price: 57699,
    },
    {
      id: 'ydm4108a',
      title: 'YDM4109 C',
      image: '/images/feature-fingerprint.png',
      oldPrice: 49000,
      price: 57699,
    },
  ];

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        drawerOpen,
        toggleDrawer,
        recommendedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
