import React, { useState, useEffect, useRef } from 'react';
import './Testimonals.css';
import testinomalImage1 from '../../Assets/testimonal-image1.png';
import testinomalImage2 from '../../Assets/testimonal-image2.png';
import testinomalImage3 from '../../Assets/testimonal-image3.png';
import testinomalImage4 from '../../Assets/testimonal-image4.png';

const testimonials = [
  {
    idx:0,
    imgage: testinomalImage1,
    name: "Jane Lee",
    profession : "Expert",
    message: "“My family built with Hallmark 16 years ago.The quality of their craftsmanship truly speaks for itself. Quality house still to this day, so this really helped us to make a decision.I’ve recommended them to several of my clients because their builds speak for themselves.”"
  },
  {
    idx:1,
    imgage: testinomalImage2,
    name: "Joshua Keith",
    profession: "Senior client",
    message: "“The contractor installing them said they’re some of the best he’s ever seen. Everyone that sees them wants to know where I bought them.I’ve recommended them to several of my clients because their builds speak for themselves.”"
  },
  {
    idx:2,
    imgage: testinomalImage4,
    name: "Audrey Deleon",
    profession: "Expert",
    message: "The process was smooth.The quality of their craftsmanship truly speaks for itself, and the results exceeded all of my expectations without any compromises.The attention to detail and care shown throughout the entire build made this experience truly remarkable."
  },
  {
    idx:3,
    imgage: testinomalImage3,
    name: "Deandre Rodgers",
    profession: "Senior client",
    message: "The quality of their craftsmanship truly speaks for itself, and the results exceeded all of my expectations without any compromises.I’ve recommended them to several of my clients because their builds speak for themselves."
  },
  {
    idx:0,
    imgage: testinomalImage1,
    name: "Audrey Deleon",
    profession: "Expert",
    message: "The process was smooth.The quality of their craftsmanship truly speaks for itself, and the results exceeded all of my expectations without any compromises.The attention to detail and care shown throughout the entire build made this experience truly remarkable."
  },
  {
    idx:1,
    imgage: testinomalImage2,
    name: "Deandre Rodgers",
    profession: "Senior client",
    message: "The quality of their craftsmanship truly speaks for itself, and the results exceeded all of my expectations without any compromises.I’ve recommended them to several of my clients because their builds speak for themselves."
  },
  {
    idx: 2,
    imgage: testinomalImage3,
    name: "Sophia Martinez",
    profession: "Homeowner",
    message: "We couldn't be happier. From planning to execution, everything was handled with such professionalism. The final result is a dream come true.I’ve recommended them to several of my clients because their builds speak for themselves."
  },
  {
    idx: 3,
    imgage: testinomalImage4,
    name: "Michael Chen",
    profession: "Interior Designer",
    message: "The design, the finish, the service—every element exceeded our expectations. I would recommend this team to anyone serious about quality.I’ve recommended them to several of my clients because their builds speak for themselves."
  },
  {
    idx: 0,
    imgage: testinomalImage1,
    name: "Emma Thompson",
    profession: "First-time Buyer",
    message: "As a first-time homebuyer, I had a lot of questions. Their team was patient, clear, and always ready to help. I'm so glad I chose them!I’ve recommended them to several of my clients because their builds speak for themselves."
  },
  {
    idx: 1,
    imgage: testinomalImage2,
    name: "Carlos Rivera",
    profession: "Real Estate Consultant",
    message: "I’ve recommended them to several of my clients because their builds speak for themselves. Clean, strong, and built to last.I’ve recommended them to several of my clients because their builds speak for themselves."
  }
];

const useScrollFadeIn = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return [ref, hasAnimated];
};


function Testimonals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const [ref1, visible1] = useScrollFadeIn();
  const [ref2, visible2] = useScrollFadeIn();
  const [ref3, visible3] = useScrollFadeIn();
  const [ref4, visible4] = useScrollFadeIn();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      triggerFade(handleNext);
    }, 4000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [isMobile]);

  const cardsToShow = isMobile ? 1 : 2;

  const triggerFade = (callback) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      callback();
      setFadeClass('fade-in');
    }, 300);
  };

  const handlePrev = () => {
    triggerFade(() => {
      setCurrentIndex((prev) => {
        let newIndex = prev - cardsToShow;
        if (newIndex < 0) {
          newIndex = testimonials.length - cardsToShow;
        }
        return newIndex;
      });
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      let newIndex = prev + cardsToShow;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  const visibleIndexes = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleIndexes.push((currentIndex + i) % testimonials.length);
  }

  return (
    <>
      <div className='heading-testimonial'>
        <h5>TESTIMONIALS</h5>
      </div>

      <div className='next-prev-icon'>
        <i className="bi bi-chevron-left" onClick={handlePrev}></i>
        <i className="bi bi-chevron-right" onClick={() => triggerFade(handleNext)}></i>
      </div>

      <div className='testimonal-container'>
        <div className='testimonal-left-content'>
          <h1 ref={ref1} className={`scroll-fade ${visible1 ? 'visible' : ''}`}>READ WHAT</h1>
          <h1 ref={ref2} className={`scroll-fade ${visible2 ? 'visible' : ''}`}>OUR CLIENTS THINK</h1>
          <div ref={ref3} className={`scroll-fade ${visible3 ? 'visible' : ''}`} style={{ marginTop: "20px" }}>
            <p>We can already call over 5,000 people our customer, When you are coming</p>
          </div>
          <button ref={ref4} className={`scroll-fade ${visible4 ? 'visible' : ''}`}>DISCOVER NOW</button>
        </div>

        <div className='testimonial-content'>
          <div className={`testimonial-list ${fadeClass}`}>
            {visibleIndexes.map((idx) => {
              const item = testimonials[idx];
              return (
                <div key={item.name + item.profession} className={`testimonial-card card-${item.idx}`}>
                  <img src={item.imgage} className='testimonal-image' alt={item.name} />
                  <p className='testimonial-message'>“{item.message}”</p>
                  <p className='testimonial-name'>{item.name}</p>
                  <p className='testimonial-location'>{item.profession}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonals;
