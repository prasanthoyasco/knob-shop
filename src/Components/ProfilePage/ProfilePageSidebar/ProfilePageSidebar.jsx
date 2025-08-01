import React from 'react'
import './ProfilePageSidebar.css'
import profileImage from '../../../Assets/CategoriesImge/Knob Shop/personImage.jpg'
import NavbarTop from '../../Navbar/NavbarTop/NavbarTop'
function ProfilePageSidebar({ setActiveSection }) {
  return (
    <>
    <div className='profile-page-sidebar-con'>
      <div className='profile-page-sidebar-image'>
        <img src={profileImage}/>
        <h4>Name</h4>
        <p>email</p>
      </div>
      <div>
        <div className='profile-page-sidebar-info'> 
            <div className='profile-page-sidebar-icon-text'onClick={() => setActiveSection('personal')}>
                <i class="bi bi-info-circle"></i>
                <h5>Personal Information</h5>
            </div>
            <div className='profile-page-sidebar-icon-text'onClick={() => setActiveSection('address')}>
                <i class="bi bi-geo-alt"></i>
                <h5>Addresses</h5>
            </div>
        </div>
        <div className='profile-page-sidebar-info'>
            <div className='profile-page-sidebar-icon-text'onClick={() => setActiveSection('cart')}>
                <i class="bi bi-cart"></i>
                <h5>My cart</h5>
            </div>
            <div className='profile-page-sidebar-icon-text'onClick={() => setActiveSection('wishlist')}>
                <i class="bi bi-heart"></i>
                <h5>My wishlist</h5>
            </div>
            <div className='profile-page-sidebar-icon-text'onClick={() => setActiveSection('orders')}>
                <i class="bi bi-box-seam"></i>
                <h5>My orders</h5>
            </div>
        </div>
        <div className='profile-page-sidebar-info'>
            <div className='profile-page-sidebar-icon-text'onClick={() => setActiveSection('help')}>
                <i class="bi bi-patch-question"></i>
                <h5>Need Help</h5>
            </div>
        </div>
        <div className='profile-page-sidebar-info'>
            <div className='profile-page-sidebar-icon-text'>
                <i class="bi bi-box-arrow-in-left"></i>
                <h5>Sign Out</h5>
            </div>
        </div>

        </div>
    </div>
    </>
  )
}

export default ProfilePageSidebar
