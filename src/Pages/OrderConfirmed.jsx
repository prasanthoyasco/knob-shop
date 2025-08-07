import { FaMapMarkerAlt } from 'react-icons/fa';
import Lottie from 'lottie-react';
import successAnimation from '../Assets/order-confirmed.json';
import failAnimation from '../Assets/payment-failed.json'; // <-- Add this animation
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Detect success or failure based on pathname
  const isSuccess = location.pathname === '/order-confirmed';

  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState(
    isSuccess ? "Payment initiated..." : "Verifying payment..."
  );

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const messages = isSuccess
      ? [
          "Payment initiated...",
          "Processing your order...",
          "Placing your order...",
          "Finalizing...",
        ]
      : [
          "Verifying payment...",
          "Attempting to confirm payment...",
          "Oops, something went wrong...",
        ];

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setStatusText(messages[index]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loading, isSuccess]);

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
          <p className="mt-3 fw-semibold">{statusText}</p>
        </div>
      </div>
    );
  }

  // ===========================
  // ✅ SUCCESS UI
  // ===========================
  if (isSuccess) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 pt-1 pb-3 bg-white">
        <div style={{ width: '280px', height: '280px' }} className="mb-1">
          <Lottie animationData={successAnimation} loop={false} speed={0.5} />
        </div>
        <h2 className="fw-bold mb-2 text-center">Your order has been confirmed</h2>
        <p className="text-secondary text-center mb-1">
          Thanks for your order <a href="#" className="text-primary text-decoration-underline">RB19011</a>. Arriving by <strong>19 Jun 2025</strong>.
        </p>
        <p className="text-muted small mb-4 text-center">
          Order within <strong>20h 34m</strong> for same-day processing.
        </p>

        {/* Your address and buttons block here */}
        {/* --- Address --- */}
        {/* --- Buttons --- */}
      </div>
    );
  }

  // ===========================
  // ❌ FAIL UI
  // ===========================
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 pt-1 pb-3 bg-white">
      <div style={{ width: '600px', height: "280px" }} className="mb-1">
        <Lottie animationData={failAnimation} loop={false} />
      </div>
      {/* <h2 className="fw-bold mb-2 text-center text-danger">Payment Failed</h2> */}
      <p className="text-secondary text-center my-4">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <div className="d-flex gap-3">
        <button className="btn btn-dark px-4 py-3 m-0" onClick={() => navigate('/')}>
          Return to Home
        </button>
        <button className="btn btn-outline-dark px-4 py-3 rounded-0" style={{width:"150px"}} onClick={() => navigate('/payment')}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;
