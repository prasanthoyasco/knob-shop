import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';
import faqImage from '../../Assets/FAQ-image.png';
import faqImage2 from '../../Assets/sofo3.jpg';
import faqImage3 from '../../Assets/right-image-interior.png';

const faqData = [
  {
    question: "Do you offer any discounts or promotions?",
    answer: "Limit rock sail forest whiten army lump bad such separate he walk trade widower feather tongue substance bath wet hill "
  },
  {
    question: "What types of products do you offer?",
    answer: "Yes, we offer customization in terms of size, fabric, color, and finish for selected furniture pieces."
  },
  {
    question: "How can i provide feedback about my experience?",
    answer: "Standard delivery takes 7–10 business days, while customized items may take up to 3–4 weeks."
  },
  {
    question: "Do you offer customer supoort?",
    answer: "We use high-quality solid wood, engineered wood, metal, and premium upholstery depending on the design and functionality of each product."
  },
];

const images = [faqImage, faqImage2, faqImage3];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const headingRef = useRef();
  const itemRefs = useRef([]);

  const [headingVisible, setHeadingVisible] = useState(false);
  const [faqItemsVisible, setFaqItemsVisible] = useState([]);
  const [startFaqObservation, setStartFaqObservation] = useState(false);

  useEffect(() => {
    // Image auto slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Observe heading for visibility (unchanged)
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          const headingCount = 4;
          const delayPerItem = 300;
          const animationDuration = 600;
          const totalHeadingAnimationTime = headingCount * delayPerItem + animationDuration;
          setTimeout(() => {
            setStartFaqObservation(true);
          }, totalHeadingAnimationTime);
        } else {
          setHeadingVisible(false);
          setStartFaqObservation(false);
          setFaqItemsVisible([]);
        }
      },
      { threshold: 0.2 }
    );
    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }
    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
    };
  }, []);

  useEffect(() => {
    if (!startFaqObservation) return;

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setFaqItemsVisible(prev => {
              const newArr = [...prev];
              const idx = Number(entry.target.dataset.index);
              newArr[idx] = true;
              return newArr;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach(el => {
      if (el) itemObserver.observe(el);
    });

    return () => {
      itemRefs.current.forEach(el => {
        if (el) itemObserver.unobserve(el);
      });
    };
  }, [startFaqObservation]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="Faq-container">
      <div className="faq-image-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`FAQ Visual ${index + 1}`}
            className={`faq-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ display: index === currentImageIndex ? 'block' : 'none' }}
          />
        ))}
      </div>

      <div className='faq-content'>

        {/* Heading block with staggered animation */}
        <div ref={headingRef} className="faq-header">
          {["FAQ's", "YOU HAVE DIFFERENT QUESTIONS?", "Our team will answer all your questions.", "We ensure a quick response."].map((text, i) => (
            <div
              key={i}
              className={`faq-animate ${headingVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.3}s` }}
            >
              {i === 0 && <h6>{text}</h6>}
              {i === 1 && <h1>{text}</h1>}
              {i > 1 && <p>{text}</p>}
            </div>
          ))}
        </div>

        {/* FAQ list */}
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              ref={el => (itemRefs.current[index] = el)}
              data-index={index}
              className={`faq-item faq-animate ${faqItemsVisible[index] ? 'visible' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h6>{item.question}</h6>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default FAQ;
