import React from "react";
import "./LocationMap.css";

const LocationMap = () => {
  return (
    <div className="map-wrapper">
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.512311589366!2d-75.70191452342486!3d45.41661893855339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b4fc8fcbfb%3A0xd8eab9e640392d7e!2s151%20O'Connor%20St%2C%20Ottawa%2C%20ON%20K2P%202L8%2C%20Canada!5e0!3m2!1sen!2sin!4v1716360143245!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="map-overlay">
          <h3>Wonder Store</h3>
          <p>
            151 O’Connor Street, Ground floor,<br />
            Ottawa ON, K2P 2L8
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=151+O'Connor+Street,+Ottawa,+ON"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="direction-button">Get Directions</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
