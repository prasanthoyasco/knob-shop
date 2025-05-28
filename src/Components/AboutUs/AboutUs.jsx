import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-us-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Image Side */}
          <div className="col-md-6 position-relative">
            <div className="image-wrapper">
              <img
                src="/about_us.jpg"
                alt="Ribbon cutting"
                className="img-fluid rounded shadow"
              />

              {/* Floating rating emojis */}
              <div className="floating-rating">
                <span className="fw-bold">Best ratings.</span>
                <p className="small mb-1">Lorem ipsum, dolor sit amet adipisicing elit.</p>
                <div className="emojis">😡 😐 😃 😍 😁</div>
              </div>

              {/* Floating badge top-right */}
              <div className="floating-badge">
                <h5><strong>30,000+</strong></h5>
                <p className="small mb-1">Sales in July 2021 with 5 star ratings</p>
                <div className="avatars">
                  {[...Array(6)].map((_, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt="avatar"
                      className="avatar"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Side */}
          <div className="col-md-6 ">
            <div className="mx-5">
                <h6 className="text-uppercase text-muted about-sub-head">Knobsshop</h6>
            <h2 className="fw-bold mb-4 about-head">About Us</h2>
            <p className="text-muted mb-4">
              From they fine john he give of rich he. They age and draw mrs like.
              Improving end distrusts may instantly was household applauded incommode.
              Why kept very ever home mrs. Considered sympathize ten uncommonly occasional
              assistance sufficient not.
            </p>
            <a href="#" className="custom-explore-btn">
              Explore More
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
