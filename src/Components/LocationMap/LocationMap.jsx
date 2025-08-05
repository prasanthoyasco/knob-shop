import React from "react";
import "./LocationMap.css";

const LocationMap = () => {
  return (
    <div className="map-wrapper mt-4">
      <div className="map-container">
        <iframe
          title="Knobsshop Google Map"
          src="https://www.google.com/maps/d/embed?mid=1DWLaSKN-jdvsPYApqmsFjX2JnAbJ_wM&noprof=1"
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
