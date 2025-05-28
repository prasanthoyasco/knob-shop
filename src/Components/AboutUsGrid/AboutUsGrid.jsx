import React from "react";
import './AboutUsGrid.css'; // Ensure this CSS file is linked

// Use placeholder images. In a real project, these would be in your /public or /src/assets folder.
// For the best match, use images with white or light backgrounds like the original.
const people = [
  "/person1.png", "/person1.png", "/person1.png", "/person1.png",
  "/person1.png", "/person1.png", "/person1.png", "/person1.png",
  "/person1.png", "/person1.png", "/person1.png", "/person1.png"
];

const AboutUsGrid = () => {
  // These positions are carefully adjusted to mimic the reference image
  // Values are approximate and may need minor tweaks on different screen sizes
  const imageSettings = [
    // Top Row (left to right) - Notice varied sizes and subtle top/left shifts
    { top: "12%", left: "4%", size: "90px", animationDelay: "0s" },
    { top: "6%", left: "18%", size: "100px", animationDelay: "0.2s" },
    { top: "2%", left: "33%", size: "110px", animationDelay: "0.4s" },
    { top: "7%", left: "49%", size: "95px", animationDelay: "0.6s" },
    { top: "11%", left: "64%", size: "105px", animationDelay: "0.8s" },
    { top: "16%", left: "79%", size: "90px", animationDelay: "1s" },
  ];

  return (
    <section className="about-us-grid-section position-relative py-5 px-3 rounded-4 overflow-hidden">
      <div className="container text-center  d-flex flex-column" style={{ zIndex: 2,gap:'10rem' }}>
        {/* Floating Images Container */}
        <div className="about-us-images-container row w-100 h-100">
          {people.map((src, i) => (
            <div
              key={i}
              className="about-us-image-wrapper col-2 shadow rounded-3 bg-white overflow-hidden"
              style={{
                animationDelay: imageSettings[i]?.animationDelay,
               marginTop: i<6 ? i % 2 === 0 ? `${i * 10}px` : undefined : ''
              }}
            >
              <img
                src={src}
                alt={`Person ${i + 1}`}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          ))}
        </div>

        {/* Central Content */}
        <div className=" z-2 pt-5 pb-4"> {/* Adjusted padding */}
          <span className="about-us-badge badge bg-light border text-secondary px-3 py-2 mb-3 fw-medium">
            Testimonials
          </span>
          <h2 className="about-us-title fw-bold display-5 mb-3 text-dark"> {/* Adjusted font size */}
            Trusted by leaders <br />
            <span className="text-muted">from various industries</span>
          </h2>
          <p className="text-secondary mb-4 mx-auto about-us-description" style={{ maxWidth: "600px" }}>
            Learn why professionals trust our solutions to complete their customer journeys.
          </p>
          <button className="btn btn-dark rounded-pill px-4 py-2 about-us-button">
            Read Success Stories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;