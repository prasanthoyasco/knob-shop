import React, { useState, useEffect } from 'react';
import './Testimonals.css';
import testinomalImage1 from '../../Assets/testimonal-image1.png';
import testinomalImage2 from '../../Assets/testimonal-image2.png';

const testimonials = [
  {
    imgage: testinomalImage1,
    name: "Aarav Mehta",
    profession: "Expert",
    message: "“My family built with Hallmark 16 years ago. Quality house still to this day, so this really helped us to make a decision.”"
  },
  {
    imgage: testinomalImage2,
    name: "Sneha Kapoor",
    profession: "Senior client",
    message: "“These are the most beautiful cabinets!! So well made. The contractor installing them said they’re some of the best he’s ever seen. Everyone that sees them wants to know where I bought them.”"
  },
  {
    imgage: testinomalImage1,
    name: "Raj Singh",
    profession: "Expert",
    message: "My family built with Hallmark 16 years ago. Quality house still to this day, so this really helped us to make a decision."
  },
  {
    imgage: testinomalImage2,
    name: "Priya Desai",
    profession: "Senior client",
    message: "These are the most beautiful cabinets!! So well made. The contractor installing them said they’re some of the best he’s ever seen. Everyone that sees them wants to know where I bought them."
  },
];

function Testimonals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Keep this for mobile logic

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
  // This will be 2 on desktop (>= 1024px) and 1 on mobile (< 1024px)
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
          <div style={{ marginTop: "20px" }}>
            <p>We can already call over 5,000 people our customer, When you are coming</p></div>
          <button>DISCOVER NOW</button>
        </div>

        <div className='testimonial-content'>
          <div className='testimonial-list'>
            {visibleTestimonials.map((item, index) => (
              <div key={index} className={`testimonial-card card-${index}`}>
                <img src={item.imgage} className='testimonal-image' alt={item.name} />
                <p className='testimonial-message'>“{item.message}”</p>
                <p className='testimonial-name'>{item.name}</p>
                <p className='testimonial-location'>{item.profession}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='next-prev-icon d-md-none'>
        <i className="bi bi-chevron-left" onClick={handlePrev}></i>
        <i className="bi bi-chevron-right" onClick={handleNext}></i>
      </div>
      </div>
    </>
  );
}

export default Testimonals;