import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Lottie from "lottie-react";
import loadingAnimation from "../Assets/LoadingAnimation.json"; // ✅ your JSON file

const SharedCartLoader = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loadSharedCart } = useCart();

  useEffect(() => {
    (async () => {
      await loadSharedCart(token);
      navigate("/view-cart");
    })();
  }, [token, loadSharedCart, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#fff",
      }}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ width: 180, height: 180 }}
      />
      <h5 style={{ marginTop: "1rem", color: "#333" }}>
        Loading Handpicked Items For you...
      </h5>
    </div>
  );
};

export default SharedCartLoader;
