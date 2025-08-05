import React, { useState } from "react";
import "./LocationMap.css";

const locations = [
  {
    id: "townhall",
    name: "Knobsshop",
    address: "746 747, Mettupalayam Rd, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641002",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.461947827669!2d76.94498073909953!3d11.01118069696043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85902fb7cb79d%3A0x208296a86fc1b726!2sKnobs%20Shop!5e0!3m2!1sen!2sin!4v1754131833225!5m2!1sen!2sin&zoom=21",
    directionLink: "https://maps.app.goo.gl/Fy3kZwVMZZDkZ6az9",
  },
  {
    id: "goldwins",
    name: "Knobsshop - Goldwins",
    address: `No 3/151-5A, Palanivel Nagar, Goldwins,\nCoimbatore, Tamil Nadu – 641014`,
    mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62654.5700716275!2d77.00853840059774!3d11.045327157984481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857acf26cf9e9%3A0x867b3ac4ec9ea8ac!2sKnobs%20Shop%20Goldwins!5e0!3m2!1sen!2sin!4v1754131637083!5m2!1sen!2sin&zoom=21",
    directionLink: "https://maps.app.goo.gl/07vCTWDmunzKk3cs7?g_st=awb",
  },
  {
    id: "pankaj",
    name: "Pankaj Plywoods",
    address: "736, Mettupalayam Rd, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641002",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62661.74847691778!2d76.91403720048731!3d11.011647375706675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85902f1e58af9%3A0xabe5350037c2f750!2sPankaj%20Plywoods!5e0!3m2!1sen!2sin!4v1754131944887!5m2!1sen!2sin&zoom=21",
    directionLink: "https://maps.app.goo.gl/nkQhwVZWeKQQLdCq8",
  },
  {
    id: "decor",
    name: "Decor Point",
    address: "735, Mettupalayam Rd, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641002",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62661.742645768936!2d76.9139410004874!3d11.011674775692269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858fd139aca4d%3A0x4b129a92fa083c59!2sDecor%20Point!5e0!3m2!1sen!2sin!4v1754132039473!5m2!1sen!2sin&zoom=21",
    directionLink: "https://maps.app.goo.gl/BcfzZSKkhbATJrhK6",
  },
];

const LocationMap = () => {
  const [activeTab, setActiveTab] = useState(locations[0]);

  return (
    <div className="map-wrapper mt-4">
      <div className="tab-buttons">
        {locations.map((loc) => (
          <button
            key={loc.id}
            className={`tab-button ${
              activeTab.id === loc.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(loc)}
          >
            {loc.name}
          </button>
        ))}
      </div>

      <div className="map-container">
        <iframe
          title={activeTab.name}
          src={activeTab.mapUrl}
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="map-overlay">
          <h3>{activeTab.name}</h3>
          <p>{activeTab.address}</p>
          <a
            href={activeTab.directionLink}
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
