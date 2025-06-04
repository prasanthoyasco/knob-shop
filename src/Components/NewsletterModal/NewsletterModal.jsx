import React, { useEffect, useState } from 'react';
import './NewsletterModal.css';

const NewsletterModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const doNotShow = localStorage.getItem('hideNewsletter');
    if (!doNotShow) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => setShowModal(false);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      localStorage.setItem('hideNewsletter', 'true');
    } else {
      localStorage.removeItem('hideNewsletter');
    }
  };

  if (!showModal) return null;

  return (
    <div className="newsletter-overlay">
      <div className="newsletter-modal">
        <button className="close-button" onClick={handleClose}>×</button>
        <div className="newsletter-content">
          <div className="newsletter-image">
            <img src="/newsletter-image.jpg" alt="Newsletter" />
          </div>
          <div className="newsletter-form">
            <h2>Newsletter</h2>
            <p>
              Join over 1,000 people who get free and fresh content
              delivered automatically each time we publish
            </p>
            <input
              type="email"
              placeholder="email@example.com"
            />
            <button className="subscribe-button">SUBSCRIBE</button>
            <div className="checkbox-row">
              <input type="checkbox" id="dontShow" onChange={handleCheckboxChange} />
              <label htmlFor="dontShow">Don’t show this again</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
