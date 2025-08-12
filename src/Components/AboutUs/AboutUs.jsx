import React, { useEffect, useRef, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import "./AboutUs.css";
import Lottie from "lottie-react";
import angryAnim from "../../Assets/CategoriesImge/Knob Shop/lottie.json";
import neutralAnim from "../../Assets/CategoriesImge/Knob Shop/neutral.json";
import happyAnim from "../../Assets/CategoriesImge/Knob Shop/happy.json";
import loveAnim from "../../Assets/CategoriesImge/Knob Shop/heart.json";
import grinAnim from "../../Assets/CategoriesImge/Knob Shop/grin.json";
// import { useNavigate } from "react-router-dom";

const reactions = [
  {
    name: "angry",
    gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.gif",
    anim: angryAnim,
  },
  {
    name: "neutral",
    gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/512.gif",
    anim: neutralAnim,
  },
  {
    name: "happy",
    gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f603/512.gif",
    anim: happyAnim,
  },
  {
    name: "love",
    gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif",
    anim: loveAnim,
  },
  {
    name: "grin",
    gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f601/512.gif",
    anim: grinAnim,
  },
];
const AboutUs = () => {
  // const navigate = useNavigate();
  const [play, setPlay] = useState(false);
  const lottieRef = useRef(null);
  const [active, setActive] = useState(null);
  const [counter, setCounter] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef();


  const handleHover = (index) => { // <-- added function
    setActive(index);
    setTimeout(() => {
      setActive(null);
    }, 1000); // animation lasts 1s
  };
  
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
    let cleanup = counterRef.current;
    return () => {
      if (cleanup) {
        observer.unobserve(cleanup);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={counterRef} className="about-us-section my-5" id="about-section">
      <div className="container-flued mx-5">
        <div className="row align-items-center">
          {/* Left Image Side */}
          <div
            className="col-md-6 position-relative"
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-offset="100"
          >
            <div className="image-wrapper">
              <div>
                <img
                  src="/about_us.jpg"
                  alt="Ribbon cutting"
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "105%" }}
                />
              </div>

              <div
                className="floating-rating"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-offset="100"
              >
                <span className="fw-bold">Best ratings.</span>
                <p className="small mb-1">
                Top choice for unbeatable quality and service.
                </p>
                <div className="emojis" style={{ display: "flex", gap: "8px" }}>
      {reactions.map((reaction, index) => (
        <div
          key={reaction.name}
          onMouseEnter={() => handleHover(index)}
          style={{ width: 30, height: 30, cursor: "pointer" }}
        >
          {active === index ? (
            <Lottie
              animationData={reaction.anim}
              loop={false}
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <img
              src={reaction.gif}
              alt={reaction.name}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      ))}
    </div>
              </div>

              <div
                className="floating-badge"
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-offset="100"
              >
                <div className="counter mt-2 mb-3 d-flex justify-content-between">
                  <h5 className="">
                    <strong style={{ color: "#000339", fontSize: "1.6rem" }}>
                      {counter} +
                    </strong>
                  </h5>
                  <FaArrowTrendUp size={24} color="#50D28A" />
                </div>
                <p className="small my-2" color="#97918B">
                  Sales in July 2025 with 5 star ratings
                </p>
                <hr
                  style={{
                    color: "#FB9F6D",
                    opacity: "1",
                    marginBottom: "1rem !important",
                  }}
                />
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
            <div className="ms-4">
              <h6
                className="text-uppercase text-muted about-sub-head"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                Knobsshop
              </h6>
              <h2
                className="mb-4 about-head"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                About Us
              </h2>
              <p
                className="para my-4"
                data-aos="fade-right"
                data-aos-delay="150"
              >
                For over 25 years, KnobsShop has been a trusted name in premium
                hardware and home utility solutions. What began as a small
                family-run store has grown into a leading destination for
                quality knobs, handles, and décor fittings that blend function
                with style.
              </p>
              <p
                className="para mb-4"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                We believe in delivering products that last, service that cares,
                and designs that elevate everyday living. With decades of
                craftsmanship, satisfied customers, and innovation behind us —
                we continue to bring timeless detailing to modern Indian homes.
              </p>
              {/* <a
                href="#"
                onClick={() => {navigate("/category/all-products")}}
                className="custom-explore-btn"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                Explore More
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
