import React from 'react'
import './CategoriesHeader.css'
import Image from '../../../Assets/CategoriesImge/Knob Shop/image 36.jpg'
import CategoriesGrid from '../CategoriesGrid/CategoriesGrid'
import CategoriesBanner from '../CategoriesBanner/CategoriesBanner'
function CategoriesHeader() {
  return (
    <>
    <div className='categories-page-container'>
      <img src={Image} className='background-image'/>
      <div className='categories-image-overlay'></div>
      <div className='categories-image-overlay-text'>
        <p>HOME / SHOP BY CATEGORIES</p>
        <h1>Categories</h1>
      </div>
    </div>
    <CategoriesGrid/>
    <CategoriesBanner/>
    </>
  )
}

export default CategoriesHeader
