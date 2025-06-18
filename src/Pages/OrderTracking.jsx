import React, { useEffect, useState } from 'react'
import NavbarTop from '../Components/Navbar/NavbarTop/NavbarTop'
import { Tracking } from '../Components/Tracking/Tracking'
import defaultImage from "/images/feature-alarm.png";
import CartItemsList from '../Components/CartPage/CartItemsList'

import { useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer';

export const OrderTracking = () => {
    const location = useLocation();

    const passedItems = location.state?.cartItems;
    
      const [cartItems, setCartItems] = useState(
        passedItems?.length
          ? passedItems
          : [
              {
                id: 1,
                title: "YDME50NxT Smart Door Lock",
                brand: "Yale",
                color: "Black",
                price: 89299,
                quantity: 1,
                image: defaultImage,
              },
            ]
      );

 const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

//   const handleDelete = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <img
            src="/favIcon.png"
            alt="logo"
            className="spinner-border"
            style={{ width: "60px", height: "60px", border: "none" }}
          />
          <p className="mt-3 fw-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <><NavbarTop/>
    <div className='container-flued mx-5'>
    <Tracking/>
     <CartItemsList
      cartItems={cartItems}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
    //   handleDelete={handleDelete}
      isTrackingPage={true}
    />
    </div>
    <Footer/>
    </>
  )
}

