import React from 'react'
import './CategoriesHeader.css'
import Image from '../../../Assets/CategoriesImge/Knob Shop/image 36.jpg'
// import CategoriesGrid from '../CategoriesGrid/CategoriesGrid'
import CategoriesBanner from '../CategoriesBanner/CategoriesBanner'
import NavbarTop from '../../Navbar/NavbarTop/NavbarTop'
import Footer from '../../Footer/Footer'
import CatGrid from '../CatGrid/CatGrid'
function CategoriesHeader() {
  return (
    <>
    <NavbarTop/>
    <div className='categories-page-container'>
      <img src={Image} className='background-image'/>
      <div className='categories-image-overlay'></div>
      <div className='categories-image-overlay-text'>
        <p>HOME / SHOP BY CATEGORIES</p>
        <h1>Categories</h1>
      </div>
    </div>
    {/* <CategoriesGrid/> */}
    <CatGrid/>
    <CategoriesBanner/>
  
    <Footer/>
    </>
  )
}

export default CategoriesHeader
