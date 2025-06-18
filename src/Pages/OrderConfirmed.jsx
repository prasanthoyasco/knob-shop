import { FaMapMarkerAlt } from 'react-icons/fa';
import Lottie from 'lottie-react';
import successAnimation from '../Assets/order-confirmed.json';
import NavbarTop from '../Components/Navbar/NavbarTop/NavbarTop';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrderConfirmed = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 5000); 
        return () => clearTimeout(timeout);
      }, []);
    
      if (loading) {
        return (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <img
                src="/favIcon.png"
                alt="logo"
                className="spinner-border"
                style={{ width: "60px", height: "60px", border: "none" }}
              />
              <p className="mt-3 fw-semibold">Loading...</p>
            </div>
          </div>
        );
      }
  return (
    <>
      {/* <NavbarTop /> */}
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 pt-1 pb-3 bg-white">
        {/* Success Animation */}
        <div style={{ width: '280px', height: '280px' }} className="mb-1">
          <Lottie animationData={successAnimation} loop={false} speed={0.5} />
        </div>

        {/* Heading */}
        <h2 className="fw-bold mb-2 text-center">Your order has been confirmed</h2>
        <p className="text-secondary text-center mb-1">
          Thanks for your order <a href="#" className="text-primary text-decoration-underline">RB19011</a>. Arriving by <strong>19 Jun 2025</strong>.
        </p>
        <p className="text-muted small mb-4 text-center">
          Order within <strong>20h 34m</strong> for same-day processing.
        </p>

        {/* Address Section */}
        <div
          className="row border border-dark p-4 mb-4 w-100 justify-content-center"
          style={{ maxWidth: '800px', width:'80%', borderWidth: '5px', borderRadius: '20px' }}
        >
          {/* Start Location */}
          <div className="col-12 col-md-5 d-flex flex-row flex-md-column align-items-center mb-4 mb-md-0 position-relative">
            {/* Circle */}
            <div className="border border-dark rounded-circle p-2 mb-2" style={{ width: 'fit-content' }}>
              <div style={{ width: '15px', height: '15px', background: '#000', borderRadius: '50%' }}></div>
            </div>

            {/* Connector Line (vertical on mobile, horizontal on md+) */
    //         width: 2px;
    // position: absolute;
    // left: 11%;
    // top: 3rem;
    // height: 60px;
    // background-color: rgb(0, 0, 0);
    }
            <div
              className="d-block d-md-none"
              style={{ width: '2px', height: '60px',position:'absolute',left:"11%",top:'3rem', backgroundColor: '#000' }}
            ></div>
            <div
              className="d-none d-md-block position-absolute translate-middle-y"
              style={{ width: '85%', height: '2px', backgroundColor: '#000', left: '57%', top: '15%' }}
            ></div>

            {/* Address */}
            <div className="small text-md-center text-start mt-2 ms-2 ms-md-0" style={{maxWidth:'200px'}}>
              746-747, Mettupalayam Road,
              X-Cut, Coimbatore – 641002,
              Tamilnadu – India.
            </div>
          </div>

          {/* End Location */}
          <div className="col-12 col-md-5 d-flex flex-row flex-md-column align-items-center">
            {/* Location Icon */}
            <div className="border border-dark rounded-circle p-1 mb-2" style={{ width: 'fit-content' }}>
              <FaMapMarkerAlt size={24} className="text-dark" />
            </div>

            {/* Address */}
            <div className="small text-md-center text-start mt-2 ms-3 ms-md-0" style={{maxWidth:'200px'}}>
              Lg – 17, Ramnagar Road,
              X-Cut, Chennai – 641012,
              Tamilnadu – India.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 w-100" style={{ maxWidth: 800 }}>
          <button className="btn btn-dark px-4 py-3 text-white rounded-0 m-0 small" style={{ flex: '0 0 40%' }} onClick={()=>{Navigate('/Tracking')}}>
            Track Delivery
          </button>
          <button className="btn btn-outline-dark rounded-0 m-0 px-4 py-3 small" style={{ flex: '0 0 40%' }} onClick={()=>{Navigate('/')}}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmed;
