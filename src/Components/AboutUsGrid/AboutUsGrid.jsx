import React from "react";

const people = [
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
  "/person1.png",
];

const AboutUsGrid = () => {
  return (
    <section className="bg-light py-5 px-3 position-relative overflow-hidden">
      <div className="container text-center position-relative z-1">
        {/* Floating image cards */}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap justify-content-center gap-2 opacity-75 z-n1">
          {people.map((src, i) => (
            <div
              key={i}
              className="rounded overflow-hidden shadow bg-white"
              style={{
                width: "80px",
                height: "80px",
                transform: `translateY(${ (i % 6) * 10}px)`,
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

        {/* Content */}
        <div className="position-relative z-1">
          <span className="badge bg-secondary mb-3">Testimonials</span>
          <h2 className="fw-bold text-dark mb-3">
            Trusted by leaders <br />
            <span className="text-muted">from various industries</span>
          </h2>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Learn why professionals trust our solutions to complete their
            customer journeys.
          </p>
          <button className="btn btn-dark px-4 py-2">
            Read Success Stories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;
