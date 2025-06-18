import React from 'react'
import NavbarTop from '../Components/Navbar/NavbarTop/NavbarTop'
import Footer from '../Components/Footer/Footer'
import page404animi from '../Assets/page404.json'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'

export const Notfound = () => {
  return (
    <div>
      <NavbarTop/>
       <div style={{ width: '480px', height: '480px',margin:'auto',display:'flex',alignItems:'center',flexDirection:'column'
        }} className="mb-2">
         <Lottie animationData={page404animi} loop={true} speed={0.5} />
         <Link to="/" className="btn btn-dark px-4 mt-4">Go to Homepage</Link>
         </div>
          
      <Footer/>
    </div>
  )
}


