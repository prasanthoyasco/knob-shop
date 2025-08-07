import React, { createContext, useContext, useState,useEffect } from 'react';
import { addProductToCart as addToCartAPI, deleteCartItem } from '../API/cartApi';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = async (item) => {
    const storedUser = localStorage.getItem('authUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id;
  
    console.log("userId :", userId);
  
    setCartItems((prev) => {
      // Find item with matching ID (either id or _id)
      const existingItem = prev.find(
        i =>
          (i.id === item.id || i._id === item._id) &&
          i.color === item.color &&
          i.size === item.size
      );
      
      if (existingItem) {
        return prev.map(i => {
          const match =
            (i.id === item.id || i._id === item._id) &&
            i.color === item.color &&
            i.size === item.size;
      
          return match ? { ...i, quantity: i.quantity + item.quantity } : i;
        });
      }
      
      return [...prev, { ...item, quantity: item.quantity || 1 }];
      
  
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  
    setDrawerOpen(true);
  
    // Sync with backend if user is logged in
    if (userId) {
      try {
        await addToCartAPI({
          userId,
          productId: item.id || item._id,
          quantity: item.quantity || 1,
          price: item.price
        });
      } catch (error) {
        console.error('Add to cart (API) failed:', error);
      }
    } else {
      console.warn("Guest user - item only added to local cart.");
    }
  };
  
  
  

  const removeFromCart = async (itemToRemove) => {
    const storedUser = localStorage.getItem('authUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id;
  
    if (userId) {
      try {
        await deleteCartItem(itemToRemove.id || itemToRemove._id);
      } catch (error) {
        console.warn('API remove failed:', error.message);
      }
    }
  
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            (item.id === itemToRemove.id || item._id === itemToRemove._id) &&
            item.color === itemToRemove.color &&
            item.size === itemToRemove.size
          )
      )
    );
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
