import React from 'react'
import './CategoriesHeader.css'
import Image from '../../../Assets/CategoriesImge/Knob Shop/image 36.jpg'
// import CategoriesGrid from '../CategoriesGrid/CategoriesGrid'
import CategoriesBanner from '../CategoriesBanner/CategoriesBanner'
import NavbarTop from '../../Navbar/NavbarTop/NavbarTop'
import Footer from '../../Footer/Footer'
import CatGrid from '../CatGrid/CatGrid'
import { useNavigate } from 'react-router-dom'
function CategoriesHeader() {
  const navigate = useNavigate()
  return (
    <>
    <NavbarTop/>
    <div className='categories-page-container'>
      <img src={Image} className='background-image'/>
      <div className='categories-image-overlay'></div>
      <div className='categories-image-overlay-text'>
        <p><span style={{cursor:"pointer"}} onClick={()=>navigate('/')}>HOME / </span>SHOP BY CATEGORIES</p>
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
