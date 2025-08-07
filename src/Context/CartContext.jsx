import React, { createContext, useContext, useState } from 'react';
import { addProductToCart as addToCartAPI, deleteCartItem } from '../API/cartApi';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addToCart = async (item) => {
    const storedUser = localStorage.getItem('authUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id;
    console.log("userId :", userId);
  
    // Update the local state cart
    setCartItems((prev) => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  
    setDrawerOpen(true);
  
    // If user is logged in, sync to backend
    if (userId) {
      try {
        await addToCartAPI({
          userId,
          productId: item.id,
          quantity: item.quantity || 1,
          price:item.price
        });
      } catch (error) {
        console.error('Add to cart (API) failed:', error);
      }
    } else {
      console.warn("Guest user - item only added to local cart.");
    }
  };
  
  

  const removeFromCart = async (id) => {
  try {
    await deleteCartItem(id);
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  } catch (error) {
    console.error('Remove from cart failed:', error);
  }
};

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  };
  const clearCart = () => setCartItems([]);

  const recommendedItems = [
    {
      id: 'ydm4109a',
      title: 'YDM4109 A',
      image: '/images/feature-alarm.png',
      oldPrice: 49000,
      price: 57699,
      brand: 'Yale',
      color: 'Black',
    },
    {
      id: 'ydm4107a',
      title: 'YDM4109 B',
      image: '/images/feature-battery.png',
      oldPrice: 49000,
      price: 57699,
      brand: 'Yale',
      color: 'Black',
    },
    {
      id: 'ydm4108a',
      title: 'YDM4109 C',
      image: '/images/feature-fingerprint.png',
      oldPrice: 49000,
      price: 57699,
      brand: 'Yale',
      color: 'Black',
    },
  ];

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        drawerOpen,
        clearCart,
        toggleDrawer,
        recommendedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
