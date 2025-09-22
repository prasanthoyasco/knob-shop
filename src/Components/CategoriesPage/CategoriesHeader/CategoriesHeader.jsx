import React from 'react'
import './CategoriesHeader.css'
import Image from '../../../Assets/CategoriesImge/Knob Shop/image 36.jpg'
// import CategoriesGrid from '../CategoriesGrid/CategoriesGrid'
import CategoriesBanner from '../CategoriesBanner/CategoriesBanner'
import NavbarTop from '../../Navbar/NavbarTop/NavbarTop'
import Footer from '../../Footer/Footer'
import CatGrid from '../CatGrid/CatGrid'
import { useLocation, useNavigate } from 'react-router-dom'
import OurDesign from '../../OurDesign/OurDesign'
function CategoriesHeader() {
    const location = useLocation();
  const navigate = useNavigate()
    const title = location.state?.title || "SHOP BY CATEGORIES";
  const category = location.state?.Subtitles || "Categories"
  const rowsData = location.state?.rowsData
  return (
    <>
    <NavbarTop/>
    <div className='categories-page-container'>
      <img src={Image} className='background-image'/>
      <div className='categories-image-overlay'></div>
      <div className='categories-image-overlay-text'>
        <p><span style={{cursor:"pointer"}} onClick={()=>navigate('/')}>HOME / {title} </span></p>
        <h1>{category}</h1>
      </div>
    </div>
     {rowsData? <OurDesign rows={rowsData} /> : <CatGrid/>}
    {/* <CategoriesGrid/> */}
    
    <CategoriesBanner/>
    <Footer/>
    </>
  )
}

export default CategoriesHeader
