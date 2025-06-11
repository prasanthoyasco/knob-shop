import React from 'react'
import './CategoriesBanner.css'
import image from '../../../Assets/CategoriesImge/Knob Shop/image.jpg'
function CategoriesBanner() {
  return (
    <div className='categories-banner-container'>
      <img src={image} className='categories-banner-image'/>
      <div className='categories-banner-image-overlay'></div>
      <div className='categories-banner-overlay-content'>
        <p className='categories-banner-overlay-content-para1'>YOU DREAM IT,WE DESIGN IT</p>
        <h1>We can build you the home docor of home dreams</h1>
        <p className='categories-banner-overlay-content-para2'>Get your own today,Connect with our designers</p>
        <button className='categories-banner-overlay-content-btn'>BOOK CONSULTATION</button>
      </div>
    </div>
  )
}

export default CategoriesBanner
