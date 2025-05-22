import React from 'react'
import './Footer.css'
import footerImage from '../../Assets/footer-logo.png';
import FbInstaYoutubeImage from '../../Assets/fb-insta-youTube.png'
const shopContent = [
  {text : "Living room" , href : "/living-room"},
  {text : "Bed room" , href : "/bed-room"},
  {text : "Dining room" , href : "/dining-room"},
  {text : "Home office" , href : "/home-office"},
  {text : "Kitchen" , href : "/kitchen"},
]
const aboutContent = [
  {text : "About Us" , href : "/about-us"},
  {text : "Blogs" , href : "/blogs"},
]
const policyContent = [
  {text : "Terms &  Condition" , href : "/terms-condition"},
  {text : "Privacy policy" , href : "/privac-policy"},
  {text : "Furniture" , href : "/furniture"},
]
const helpContent = [
  {text : "Payment" , href : "/payment"},
  {text : "Shipping" , href : "/shipping"},
  {text : "FAQ's" , href : "/faq"},
]
function Footer() {
  return (
    <div style={{backgroundColor:"#F8F8F8"}}>
    <div className='footer-container'>
      <div className='footer-logo-text'>
        <img src={footerImage} className='footer-logo'/>
        <p>Subscribe to receive inspiration,ideas and news to your inbox</p>
      </div>

      <div className='footer-shop-container'>
        <h2>Shop</h2>
        <div className='shop-content'>
          {shopContent.map((content,index)=>(
            <a href={content.href}>{content.text}</a>
          ))}
          </div>
      </div>

      <div className='footer-about-container'>
        <h2>About</h2>
        <div className='about-content'>
        {aboutContent.map((content,index)=>(
          <a href={content.href}>{content.text}</a>
        ))}
        </div>
      </div>

      <div className='footer-policy-container'>
        <h2>Policy</h2>
        <div className='policy-content'>
        {policyContent.map((content,index)=>(
          <a href={content.href}>{content.text}</a>
        ))}
        </div>
      </div>

      <div className='footer-help-container'>
        <h2>Help</h2>
        <div className='help-content'>
        {helpContent.map((content,index)=>(
          <a href={content.href}>{content.text}</a>
        ))}
        </div>
      </div>

      <div className='contact-info-container'>
        <h2>Contact Info</h2>
         <div className='icon-phone-number'>
            <i class="bi bi-telephone-fill"></i>
            <div className='phone-number'>
              <p>+91 9876543210</p>
              <p>+91 9876543211</p>
            </div>
          </div>
          <div className='icon-and-mail-id'>
          <i class="bi bi-envelope-fill"></i>
            <div className='email-id'>
              <p>akashrajan1602@gmail.com</p>
              <p>ecom@knobsshop.store</p>
            </div>
          </div>

      </div>

    </div>
    <div className='email-section-footer'>
      <h4>Sign Up to our Newsletter</h4>
      <p>Be the first to know the least releases,news,collabortions,exclusive and offers</p>
      <div className='footer-search-box-text'>
        <input type='text' placeholder='Email'/>
        <button>subscribe</button>
      </div>
    </div>

    <div className='fb-insta-youTube-icon'>
      <img src={FbInstaYoutubeImage}/>
      <p>Copyright <i class="bi bi-c-circle"></i> 2025 <span style={{color:"#AB7B53"}}>Knobs Shop.</span> All Rights Reserved.</p>
    </div>
    </div>
  )
}

export default Footer
