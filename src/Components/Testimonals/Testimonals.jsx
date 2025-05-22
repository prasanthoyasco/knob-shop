import React, { useState, useEffect } from 'react';
import './Testimonals.css';
import testinomalImage1 from '../../Assets/testimonal-image1.png';
import testinomalImage2 from '../../Assets/testimonal-image2.png';

const testimonials = [
  {
    imgage: testinomalImage1,
    name: "Aarav Mehta",
    location: "Mumbai, India",
    message: "The craftsmanship is exceptional! My solid wood dining table was delivered on time and looks exactly like the picture. Highly recommended!"
  },
  {
    imgage: testinomalImage2,
    name: "Sneha Kapoor",
    location: "Bangalore, India",
    message: "From custom sizing to fabric selection, the team helped me build the perfect sofa. It's beautiful, comfortable, and fits perfectly in my living room."
  },
  {
    imgage: testinomalImage1,
    name: "Raj Singh",
    location: "Delhi, India",
    message: "Absolutely love the design and finish. Will definitely shop again!"
  },
  {
    imgage: testinomalImage2,
    name: "Priya Desai",
    location: "Chennai, India",
    message: "Their team was so helpful and the delivery was quick!"
  },
];

function Testimonals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      // Reset index to 0 when switching views to avoid out of bounds
      setCurrentIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Number of cards to show at once
  const cardsToShow = isMobile ? 1 : 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - cardsToShow;
      return newIndex < 0 ? testimonials.length - cardsToShow : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + cardsToShow;
      return newIndex >= testimonials.length ? 0 : newIndex;
    });
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsToShow);

  // Handle wrapping when near the end and less than cardsToShow left
  if (visibleTestimonials.length < cardsToShow) {
    visibleTestimonials.push(...testimonials.slice(0, cardsToShow - visibleTestimonials.length));
  }

  return (
    <>
      <div className='heading-testimonial'>
        <h5>TESTIMONIALS</h5>
      </div>

      <div className='next-prev-icon'>
        <i className="bi bi-chevron-left" onClick={handlePrev}></i>
        <i className="bi bi-chevron-right" onClick={handleNext}></i>
      </div>

      <div className='testimonal-container'>
        <div className='testimonal-left-content'>
          <h1>READ WHAT</h1>
          <h1>OUR CLIENTS THINK</h1>
          <p>We can already call over 5,000 people our customer, When you are coming</p>
          <button>DISCOVER NOW</button>
        </div>

        <div className='testimonial-content'>
          <div className='testimonial-list'>
            {visibleTestimonials.map((item, index) => (
              <div key={index} className={`testimonial-card card-${index}`}>
                <img src={item.imgage} className='testimonal-image' alt={item.name} />
                <p className='testimonial-message'>“{item.message}”</p>
                <p className='testimonial-name'>{item.name}</p>
                <p className='testimonial-location'>{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonals;
