import React from "react";
import './AboutUsGrid.css'
const people = [
  "/person1.png", "/person1.png", "/person1.png", "/person1.png",
  "/person1.png", "/person1.png", "/person1.png", "/person1.png",
  "/person1.png", "/person1.png", "/person1.png", "/person1.png"
];

const AboutUsGrid = () => {
  const imagePositions = [
    { top: "10%", left: "5%" },
    { top: "5%", left: "20%" },
    { top: "0%", left: "35%" },
    { top: "5%", left: "50%" },
    { top: "10%", left: "65%" },
    { top: "15%", left: "80%" },
    { top: "55%", left: "5%" },
    { top: "60%", left: "20%" },
    { top: "65%", left: "35%" },
    { top: "60%", left: "50%" },
    { top: "55%", left: "65%" },
    { top: "50%", left: "80%" }
  ];

  return (
    <section className="position-relative py-5 px-3 bg-light rounded-4 overflow-hidden">
      <div className="container text-center position-relative" style={{ zIndex: 2 }}>
        {/* Floating Images */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          {people.map((src, i) => (
            <div
              key={i}
              className="position-absolute shadow rounded-4 bg-white overflow-hidden"
              style={{
                width: "90px",
                height: "90px",
                ...imagePositions[i],
                zIndex: 1,
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={src}
                alt={`Person ${i + 1}`}
                className="w-100 h-100 object-fit-cover"
                style={{ borderRadius: "16px" }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="position-relative z-2 mt-5 pt-5">
          <span className="badge bg-light border text-secondary px-3 py-2 mb-3 fw-medium">
            Testimonials
          </span>
          <h2 className="fw-bold display-6 mb-3 text-dark">
            Trusted by leaders <br />
            <span className="text-muted">from various industries</span>
          </h2>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Learn why professionals trust our solutions to complete their customer journeys.
          </p>
          <button className="btn btn-dark rounded-pill px-4 py-2">
            Read Success Stories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;
