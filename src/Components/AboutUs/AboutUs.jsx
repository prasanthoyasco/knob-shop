import React, { useEffect, useRef, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import "./AboutUs.css";

const AboutUs = () => {
   const [counter, setCounter] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const end = 30000;
          const duration = 1500; // in ms
          const stepTime = 30;
          const steps = duration / stepTime;
          let currentStep = 0;

          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const value = Math.floor(progress * end);
            setCounter(value.toLocaleString("en-IN"));

            if (currentStep >= steps) {
              setCounter(end.toLocaleString("en-IN"));
              clearInterval(interval);
            }
          }, stepTime);
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={counterRef} className="about-us-section py-5 my-5">
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
                <div className="counter mt-2 mb-3 d-flex justify-content-between">
                  <h5 className=""><strong style={{color:'#000339', fontSize:'1.6rem'}}>{counter}   +</strong></h5>
                  <FaArrowTrendUp size={24} color="#50D28A"/>
                </div>
                <p className="small my-2" color="#97918B">Sales in July 2021 with 5 star ratings</p>
                <hr style={{color:'#FB9F6D',opacity:'1'}} />
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
