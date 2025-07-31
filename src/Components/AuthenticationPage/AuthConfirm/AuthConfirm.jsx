import { FaMapMarkerAlt } from 'react-icons/fa';
import Lottie from 'lottie-react';
import successAnimation from '../../../Assets/order-confirmed.json';
import NavbarTop from '../../Navbar/NavbarTop/NavbarTop';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logoImage from "../../../Assets/logo.png";
const AuthConfirm = () => {
     const navigate = useNavigate();
  return (
    <>
        <>
    <div className="navbar-middle-container">
      <div className="navbar-middle-logo-wrapper">
        <a href="/">
          <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
        </a>
      </div>
    </div>
    <hr />
  </>
      {/* <NavbarTop /> */}
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 pt-0 pb-3 bg-white">
        {/* Success Animation */}
        <div style={{ width: '280px', height: '280px' }} className="mb-1">
          <Lottie animationData={successAnimation} loop={false} speed={0.5} />
        </div>

        {/* Heading */}
        <h2 className="fw-bold mb-2 text-center">Your have been signed in successfully</h2>
        <div className='confirm-btn-div'>
        <button className='confirm-page-btn' onClick={()=>navigate('/auth/password')}>continue</button>
      </div>
      </div>
    </>
  );
};

export default AuthConfirm;
