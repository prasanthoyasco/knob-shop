import React, { useState } from 'react';
import ProfilePageSidebar from './ProfilePageSidebar/ProfilePageSidebar';
import ProfilePageInfo from './ProfilePageInfo/ProfilePageInfo';
import './ProfilePage.css';
import NavbarTop from '../Navbar/NavbarTop/NavbarTop';
import ProductPageAddress from './ProductPageAddress/ProductPageAddress';

function ProfilePage() {
  const [activeSection, setActiveSection] = useState('personal');

  return (
    <>
    <NavbarTop/>
    <div className='profile-page-wrapper'>
      <ProfilePageSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className='profile-page-right-section'>
        {activeSection === 'personal' && <ProfilePageInfo />}
        {activeSection === 'address' && <ProductPageAddress/>}
        {activeSection === 'cart' && <div><h1>My Cart</h1></div>}
        {activeSection === 'wishlist' && <div><h1>My Wishlist</h1></div>}
        {activeSection === 'orders' && <div><h1>My Orders</h1></div>}
        {activeSection === 'help' && <div><h1>Help Section</h1></div>}
      </div>
    </div>
    </>
  );
}

export default ProfilePage;
