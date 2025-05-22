import React from 'react'
import './NavbarTop.css'
import NavbarMiddle from '../NavbarMiddle/NavbarMiddle'
import facebook_icon from '../../../Assets/facebook-icon.svg'
import insta_icon from '../../../Assets/insta-icon.svg'
import mail_icon from '../../../Assets/mail-icon.svg'
import call_icon from '../../../Assets/call-icon.svg'
import NavbarBottom from '../NavbarBottom/NavbarBottom'
function NavbarTop() {
  return (
    <>
    <div className='navbar-top-container'>
        <div className='navbar-top-phone-number'>
            <img src={call_icon} alt="Call"/>
            <p>9876543210</p>
        </div>

        <div className='navbar-top-offer'>
            <p>Sign up and <strong style={{color:'#E18436'}}>GET 25% OFF</strong> for your first order</p>
        </div>

        <div className='navbar-top-facebook-insta-icon-div'>
            
        <div className='navbar-top-mail-id'>
           <img src={mail_icon} alt="E-mail" />
            <p>akashrajan1602@gmail.com, ecom@knobsshop.store</p>
        </div>
            <div className='navbar-top-facebook-insta-icon'>
               <img src={facebook_icon} alt="Facebook" />
               <img src={insta_icon} alt="Instagram" />
            </div>
        </div>
    </div>
    <NavbarMiddle/>
    <NavbarBottom/>
    </>
  )
}

export default NavbarTop
