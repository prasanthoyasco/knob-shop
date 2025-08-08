import React, { useEffect, useState } from 'react';
import ProfilePageSidebar from './ProfilePageSidebar/ProfilePageSidebar';
import ProfilePageInfo from './ProfilePageInfo/ProfilePageInfo';
import './ProfilePage.css';
import NavbarTop from '../Navbar/NavbarTop/NavbarTop';
import ProductPageAddress from './ProductPageAddress/ProductPageAddress';
import Wishlist from './Wishlist/Wishlist';
import { useLocation } from 'react-router-dom';
import CartPageProfile from './CartPageProfile/CartPageProfile';
import MyOrders from './MyOrders/MyOrders';

function ProfilePage() {
   const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal');
  const storedUser = localStorage.getItem("authUser");
  const userId = storedUser.id || JSON.parse(storedUser).id || storedUser._id; 
  console.log("User ID:", userId);
  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  return (
    <>
    <NavbarTop/>
    <div className='profile-page-wrapper'>
      <ProfilePageSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className='profile-page-right-section'>
        {activeSection === 'personal' && <ProfilePageInfo />}
        {activeSection === 'address' && <ProductPageAddress/>}
        {activeSection === 'cart' && <CartPageProfile/>}
        {activeSection === 'wishlist' && <Wishlist userId={userId} />}
        {activeSection === 'orders' && <MyOrders userId={userId} />}
        {activeSection === 'help' && <div><h1>Help Section</h1></div>}
      </div>
    </div>
    </>
  );
}

export default ProfilePage;
