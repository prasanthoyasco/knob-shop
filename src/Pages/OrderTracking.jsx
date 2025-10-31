import React, { useEffect, useState } from "react";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import { Tracking } from "../Components/Tracking/Tracking";
import CartItemsList from "../Components/CartPage/CartItemsList";
import Footer from "../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { trackShipment } from "../api/DTDCTracking";

export const OrderTracking = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const consignmentNumber = location.state?.dtdcReferenceNumber || "7D155376386";

  const fetchTracking = async () => {
    setTrackingLoading(true);
    try {
      const data = await trackShipment(consignmentNumber);
      console.log("Tracking Data:", data);
      setTrackingData(data);
    } catch (err) {
      console.error("Failed to fetch tracking info:", err);
      alert("Failed to fetch tracking info");
    } finally {
      setTrackingLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;

  return (
    <>
      <NavbarTop />
      <div className="container-flued mx-5">
        <Tracking trackingData={trackingData} loading={trackingLoading} />
        <CartItemsList
          cartItems={cartItems}
          handleIncrement={(id) =>
            setCartItems((prev) =>
              prev.map((item) => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item))
            )
          }
          handleDecrement={(id) =>
            setCartItems((prev) =>
              prev.map((item) =>
                item._id === id && item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            )
          }
          isTrackingPage={true}
        />
      </div>
      <Footer />
    </>
  );
};
