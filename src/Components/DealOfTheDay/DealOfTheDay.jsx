import React, { useEffect, useState, useMemo } from "react";
import "./DealOfTheDay.css";
// import dealoftheday from "../../Assets/dealoftheday.jpg"; // Removed unused import
import dealdaybtnarrow from "../../Assets/dealdaybtnarrow.svg";
import { useNavigate } from "react-router-dom";
const DealOfTheDay = () => {
  const navigate = useNavigate();

  const images = useMemo(() => [
    "/dealoftheday/M14V2.png",
    "/dealoftheday/M18V1.png",
    "/dealoftheday/VIEW16_1.6.jpg"
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Preloading useEffect removed - images are now rendered in DOM

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const targetDate = useMemo(() => {
    const getRandomFutureDate = () => {
      const now = new Date();

      const minDays = 1;   // minimum 1 day in future
      const maxDays = 7;   // maximum 7 days in future

      const randomDays =
        Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

      const randomHours = Math.floor(Math.random() * 24);
      const randomMinutes = Math.floor(Math.random() * 60);

      const future = new Date(now);
      future.setDate(now.getDate() + randomDays);
      future.setHours(randomHours, randomMinutes, 0, 0);

      return future;
    };
    return getRandomFutureDate();
  }, []);

  const calculateTimeLeft = () => {

    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="deal-container">
      <div className="deal-image" data-aos="fade-right" data-aos-delay="100">
        {images.map((imgSrc, index) => (
          <img
            key={index}
            className={`deal-of-the-day-slider-image ${index === currentImageIndex ? "active" : ""
              }`}
            src={imgSrc}
            alt="Deal Visual"
          />
        ))}
      </div>
      <div className="deal-content" data-aos="fade-down" data-aos-delay="200">
        <div className="deal-watermark"></div>
        <h2 className="mt-2" data-aos="fade-up" data-aos-delay="100">
          Deal Of The Day
        </h2>
        <p
          className="my-2"
          data-aos="fade-up"
          data-aos-delay="150"
          style={{ maxWidth: "480px" }}
        >
          Enhance your living space with our handpicked daily special — a
          perfect blend of functionality, comfort, and modern aesthetics.
        </p>
        <p
          className="my-2"
          data-aos="fade-up"
          data-aos-delay="200"
          style={{ maxWidth: "480px" }}
        >
          Take advantage of exclusive pricing on this limited-time offer.
          Whether you're redesigning your room or adding a statement piece, now
          is the ideal time to elevate your interior with style and value.
        </p>
        <div
          className="countdown-timer mt-4"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
            <div key={idx} className="time-segment">
              <div className="time-value">{timeLeft[unit]}</div>
              <div className="time-label">{unit.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <button
          className="shop-button"
          data-aos="fade-right"
          data-aos-delay="230"
          onClick={() => {
            navigate("/offer");
          }}
        >
          SHOP NOW{" "}
          <img
            src={dealdaybtnarrow}
            alt="arrow"
            className="ml-2 inline-block"
          />
        </button>
      </div>
    </section>
  );
};

export default DealOfTheDay;
