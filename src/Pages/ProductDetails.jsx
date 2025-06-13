import React from 'react'
import NavbarTop from '../Components/Navbar/NavbarTop/NavbarTop'
import Footer from '../Components/Footer/Footer'
import ProductDetailsHead from '../Components/ProductDetailsHead/ProductDetailsHead'
import ProductTabs from '../Components/ProductTabs/ProductTabs'

export const ProductDetails = () => {
  return (
<>
     <NavbarTop/>
     <ProductDetailsHead/>
     <ProductTabs/>
       <Footer />
</>
  )
}
