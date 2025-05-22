import React, { useState } from 'react';
import './FAQ.css';
import faqImage from '../../Assets/FAQ-image.png';

const faqData = [
  {
    question: "What materials are used in your furniture?",
    answer: "We use high-quality solid wood, engineered wood, metal, and premium upholstery depending on the design and functionality of each product."
  },
  {
    question: "Do you offer customization options?",
    answer: "Yes, we offer customization in terms of size, fabric, color, and finish for selected furniture pieces."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 7–10 business days, while customized items may take up to 3–4 weeks."
  },
  {
    question: "What materials are used in your furniture?",
    answer: "We use high-quality solid wood, engineered wood, metal, and premium upholstery depending on the design and functionality of each product."
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className='Faq-container'>
      <img src={faqImage} className='faq-image' alt="FAQ Visual" />
      <div className='faq-content'>
        <h6>FAQ's</h6>
        <h1>YOU HAVE DIFFERENT QUESTIONS?</h1>
        <p>Our team will answer all your questions.</p>
        <p>We ensure a quick response.</p>
        <hr/>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h6>{item.question}</h6>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer"><p>{item.answer}</p></div>
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
