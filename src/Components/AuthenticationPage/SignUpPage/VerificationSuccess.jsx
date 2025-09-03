import { useEffect } from "react";
import Confetti from "react-confetti";

const VerificationSuccess = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000); // 3 seconds delay
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Confetti numberOfPieces={300} recycle={false} />
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Success"
          style={{ width: "220px", marginBottom: "1rem" }}
        />
        <h2 className="fw-bold text-success">Email Verified!</h2>
        <p className="text-muted">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default VerificationSuccess;
