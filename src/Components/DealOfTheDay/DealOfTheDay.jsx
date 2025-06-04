import React, { useEffect, useState } from "react";
import "./DealOfTheDay.css";
import dealoftheday from "../../Assets/dealoftheday.jpg";
import dealdaybtnarrow from "../../Assets/dealdaybtnarrow.svg";
const DealOfTheDay = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-07-10T00:00:00");
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
      <div className="deal-image">
        <img
          data-aos="fade-right"
          data-aos-delay="100"
          src={dealoftheday}
          alt="Deal Visual"
        />
      </div>
      <div className="deal-content" data-aos="fade-down" data-aos-delay="200">
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
