import React, { useState } from 'react'
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

  return (
    <div className='container-flued mx-5'>
    <NavbarTop/>
    <Tracking/>
     <CartItemsList
      cartItems={cartItems}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
    //   handleDelete={handleDelete}
      isTrackingPage={true}
    />
    <Footer/>
    </div>
  )
}

