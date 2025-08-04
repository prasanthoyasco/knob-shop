import React from 'react'
import './BookConsult.css'
import NavbarTop from '../../Navbar/NavbarTop/NavbarTop'
import Footer from '../../Footer/Footer'
import Image from '../../../Assets/CategoriesImge/Knob Shop/image 36.jpg'
import { useNavigate } from 'react-router-dom'
import BookConsultForm from '../BookConsultForm/BookConsultForm'
function BookConsult() {
  const navigate = useNavigate()
  return (
    <>
    <NavbarTop/>
    <div className='book-consult-container'>
    <div className='book-page-container'>
      <img src={Image} className='book-image'/>
      <div className='book-image-overlay'></div>
      <div className='book-image-overlay-text'>
        <p><span style={{cursor:"pointer"}} onClick={()=>navigate('/')}>HOME / </span>SHOP BY CATEGORIES</p>
        <h1>Book Consultation</h1>
      </div>
    </div>
    <div className='book-page-form-section'>
    <div className='book-banner-text'>
        <p>Whether you’re building a new home or renovating a commercial space, our</p>
        <p>product experts can guide you to the right solution.</p>
        <p>Fill in the form below and schedule a personalized consultation.</p>
    </div>
    <BookConsultForm/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default BookConsult
