import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Lottie from "lottie-react";
import loadingAnimation from "../Assets/LoadingAnimation.json";

const SharedCartLoader = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loadSharedCart } = useCart();

  const hasLoaded = useRef(false); // ✅ Prevent multiple runs

  useEffect(() => {
    if (!token) return;
    if (hasLoaded.current) return;

    hasLoaded.current = true; // Block future calls

    (async () => {
      await loadSharedCart(token);
      navigate("/view-cart");
    })();

  }, [token]); // 👈 removed loadSharedCart & navigate to avoid re-trigger

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
        Loading Handpicked Items For You...
      </h5>
    </div>
  );
};

export default SharedCartLoader;
