import React from "react";
import "./LocationMap.css";

const LocationMap = () => {
  return (
    <div className="map-wrapper mt-4">
      <div className="map-container">
        <iframe
          title="Knobsshop Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62654.5700716275!2d77.00853840059774!3d11.045327157984481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857acf26cf9e9%3A0x867b3ac4ec9ea8ac!2sKnobs%20Shop%20Goldwins!5e0!3m2!1sen!2sin!4v1754131637083!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="map-overlay">
        <h3>Knobsshop - Goldwins</h3>
          <p>
            No 3/151-5A, Palanivel Nagar, Goldwins, <br />
            Coimbatore, Tamil Nadu – 641014
          </p>
          <a
            href="https://maps.app.goo.gl/07vCTWDmunzKk3cs7?g_st=awb"
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
