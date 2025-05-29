import React, { useEffect, useState } from 'react';
import './DealOfTheDay.css';
import dealoftheday from '../../Assets/dealoftheday.jpg'
import dealdaybtnarrow from '../../Assets/dealdaybtnarrow.svg'
const DealOfTheDay = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-06-01T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
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
          src={dealoftheday}
          alt="Deal Visual"
        />
      </div>
      <div className="deal-content ">
        <h2 className='mt-2' >Deal Of The Day</h2>
        <p className='my-2' style={{maxWidth:'480px'}}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor esse atque sapiente voluptatum recusandae possimus! Deleniti, sapiente eum! Reiciendis.
        </p>
        <div className="countdown-timer mt-4">
          {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
            <div key={idx} className="time-segment">
              <div className="time-value">{timeLeft[unit]}</div>
              <div className="time-label">{unit.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <button className="shop-button">
            SHOP NOW <img src={dealdaybtnarrow} alt="arrow" className="ml-2 inline-block" />
          </button>
      </div>
    </section>
  );
};

export default DealOfTheDay;
