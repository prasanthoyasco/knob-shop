import React, { useState } from "react";

const StoreLocator = ({ onStoreSelect }) => {
  const [selectedStore, setSelectedStore] = useState("metupalayam");

  const storeDetails = {
    metupalayam: {
      name: "Knobshop Metupalayam Road",
      phone: "04222550744",
      street: "746 747, Mettupalayam Rd",
      city: "Coimbatore",
      district: "R.S. Puram",
      state: "Tamil Nadu",
      pincode: "641002",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.461947827669!2d76.94498073909953!3d11.01118069696043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85902fb7cb79d%3A0x208296a86fc1b726!2sKnobs%20Shop!5e0!3m2!1sen!2sin!4v1754131833225!5m2!1sen!2sin",
      mapLink: "https://www.google.com/maps?q=Knobs+Shop+Metupalayam+Road",
    },
    goldwins: {
      name: "Knobshop Goldwins",
      phone: "04222541744",
      street: "RK Complex, 45-Sf595/2A-1, Palkarar Thottam",
      city: "Coimbatore",
      district: "Goldwins",
      state: "Tamil Nadu",
      pincode: "641014",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62654.5700716275!2d77.00853840059774!3d11.045327157984481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857acf26cf9e9%3A0x867b3ac4ec9ea8ac!2sKnobs%20Shop%20Goldwins!5e0!3m2!1sen!2sin!4v1754131637083!5m2!1sen!2sin",
      mapLink: "https://www.google.com/maps?q=Knobs+Shop+Goldwins",
    },
  };

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedStore(selected);
    if (onStoreSelect && storeDetails[selected]) {
      onStoreSelect(storeDetails[selected]);
    }
  };

  const selected = storeDetails[selectedStore];

  return (
    <div className="store-locator">
      <select
        className="select-box mt-3"
        style={{ cursor: "pointer" }}
        value={selectedStore}
        onChange={handleChange}
      >
        <option value="">Select Store Location</option>
        <option value="metupalayam">Knobshop Metupalayam Road</option>
        <option value="goldwins">Knobshop Goldwins</option>
      </select>

      {selected && (
        <div className="mt-4 border p-3 rounded">
          <h5 className="contact-con-head-h3">{selected.name}</h5>
          <p>
            {selected.street}, {selected.district}, {selected.city},{" "}
            {selected.state} - {selected.pincode}
          </p>
          <a href={`tel:+${selected.phone}`}>{selected.phone}</a>

          <div
            style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={selected.mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0, marginTop: "20px" }}
              allowFullScreen=""
            ></iframe>
          </div>

          <a
            href={selected.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark rounded-0 mt-3"
          >
            Get Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default StoreLocator;
