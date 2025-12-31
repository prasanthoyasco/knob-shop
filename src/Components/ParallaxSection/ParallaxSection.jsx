import React, { useRef, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ParallaxSection.css";
import HeroSection2 from "../HeroSection2/HeroSection2";

const ArrowDownIcon = () => (
  <svg
    className="svg-icon svg-icon--arrow-down w-12 h-12 text-white"
    aria-hidden="true"
    focusable="false"
    role="presentation"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 72 72"
  >
    <g transform="rotate(-90 -0.00000157361 72)">
      <g>
        <rect x="0" y="72" fill="none" height="72" width="72"></rect>
        <path d="m48.688,81.162l0.876,0.876a1.487,1.487 0 0 1 0,2.1l-24.222,24.225l24.223,24.223a1.487,1.487 0 0 1 0,2.1l-0.876,0.876a1.487,1.487 0 0 1 -2.1,0l-26.154,-26.148a1.487,1.487 0 0 1 0,-2.1l26.151,-26.153a1.487,1.487 0 0 1 2.1,0l0.002,0.001z"></path>
      </g>
    </g>
  </svg>
);

const ParallaxSection = ({
  text = "See our latest inspirations",
  buttonText = "Check now",
  buttonLink = "/categories",
  leftData,
  rightData,
  leftData1,
  rightData1,
  leftImage,
  rightImage,
  leftImage1,
  rightImage1,
  rotation = 10,
  sectionId = "template--24640570294456__parallax_EPkUDw",
  target = 50000,
  duration = 2000,
}) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const titleRef = useRef();
  const leftImgRef = useRef(null);
  const leftImgRef1 = useRef(null);
  const rightImgRef = useRef(null);
  const rightImgRef1 = useRef(null);

  const [displayNumber, setDisplayNumber] = useState("00000");
  const [hasAnimated, setHasAnimated] = useState(false);

  const rotateImagesOnScroll = useCallback(() => {
    if (
      !sectionRef.current ||
      !leftImgRef.current ||
      !leftImgRef1.current ||
      !rightImgRef.current ||
      !rightImgRef1.current ||
      !titleRef.current
    )
      return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollProgress =
      (viewportHeight - sectionRect.top) /
      (viewportHeight + sectionRect.height);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const maxRotation = parseInt(rotation, 10) || 10;

    [
      { ref: leftImgRef.current, reverse: true },
      { ref: rightImgRef.current, reverse: false },
      { ref: rightImgRef1.current, reverse: false },
      { ref: leftImgRef1.current, reverse: true },
    ].forEach(({ ref, reverse }) => {
      const angle = clampedProgress * maxRotation * (reverse ? -1 : 1);
      window.requestAnimationFrame(() => {
        ref.style.transform = `translate3d(0, 0, 0) rotate(${angle}deg)`;
      });
    });

    const maxBlur = 10;
    const blurStartThreshold = 0.1736;
    let blurValue = 0;

    if (clampedProgress > blurStartThreshold) {
      const normalized = (clampedProgress - blurStartThreshold) / (1 - blurStartThreshold);
      blurValue = normalized * maxBlur;
    }

    titleRef.current.style.filter = `blur(${blurValue}px)`;
  }, [rotation]);

  useEffect(() => {
    window.addEventListener("scroll", rotateImagesOnScroll);
    rotateImagesOnScroll();
    return () => window.removeEventListener("scroll", rotateImagesOnScroll);
  }, [rotateImagesOnScroll]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasAnimated) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        setHasAnimated(true);

        let step = 0;
        const end = parseInt(target.toString().padStart(5, "0"), 10);
        const range = end;
        const incrementTime = 90;
        const totalSteps = Math.ceil(duration / incrementTime);

        const interval = setInterval(() => {
          step++;
          if (step >= totalSteps) {
            setDisplayNumber(end.toLocaleString("en-IN"));
            clearInterval(interval);
          } else {
            const value = Math.floor((step / totalSteps) * range);
            setDisplayNumber(value.toLocaleString("en-IN"));
          }
        }, incrementTime);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated, target, duration]);

  return (
    <section className="parallax-section" data-rotation={rotation} ref={sectionRef}>
      <div className="wt-parallax__content" data-section-id={sectionId}>
        <div className="scroll-trigger animate--slide-in disabled-on-mobile rich-text">
          <div className="hero__wrapper">
            <div className="hero hero--video-background">
              <div className="hero__pic-container disabled-on-mobile"></div>
              <div className="hero__overlay hero__overlay--center hero__overlay--mobile--">
                <div
                  ref={titleRef}
                  className="w-screen"
                >
                  <div className="hero__text rte d-flex justify-content-center">
                    <div className="d-flex align-items-end gap-2">
                      <img src="/checkover_icon.svg" alt="" />
                      <p>{text}</p>
                    </div>
                  </div>
                  <h2 className="hero__title hero">
                    Check over{" "}
                    {displayNumber.split("").map((digit, index) => (
                      <span key={index} className="digit">
                        {digit}
                      </span>
                    ))}{" "}
                    
                    <span style={{ color: "#AB7B53", display:"inline-block" }}>Products</span>
                  </h2>
                </div>
                <HeroSection2/>
                <div className="hero__button--gap">
                  <a href='/categories' className="hero__button--primary ctn big-ctn">
                    <span>{buttonText}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        </div>
        {/* <div className="wt-parallax__additional">
          <div className="wt-parallax__additional__icon">
            <ArrowDownIcon />
          </div>
        </div>
      </div>

      <div className="wt-parallax__gallery">
        <ul className="wt-parallax__gallery__list">
          <li className="wt-parallax__gallery__item cursor-pointer">
            <div
              tabIndex="0"
              onClick={() => navigate(`/category/${leftData?.text}`, { state: { product: leftData } })}
            >
              <img
                src={leftImage}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--odd"
                alt="Left Product"
                ref={leftImgRef}
                onError={(e) => (e.target.src = "https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error")}
              />
            </div>
          </li>
          <li className="wt-parallax__gallery__item wt-parallax__gallery__item--even cursor-pointer">
            <div
              tabIndex="0"
              onClick={() => navigate(`/category/${rightData?.text}`, { state: { product: rightData } })}
            >
              <img
                src={rightImage}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--even"
                alt="Right Product"
                ref={rightImgRef}
                onError={(e) => (e.target.src = "https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error")}
              />
            </div>
          </li>
          <li className="wt-parallax__gallery__item cursor-pointer">
            <div
              tabIndex="0"
              onClick={() => navigate(`/category/${leftData1?.text}`, { state: { product: leftData1 } })}
            >
              <img
                src={leftImage1}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--odd"
                alt="Left Product 2"
                ref={leftImgRef1}
                onError={(e) => (e.target.src = "https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error")}
              />
            </div>
          </li>
          <li className="wt-parallax__gallery__item wt-parallax__gallery__item--even cursor-pointer">
            <div
              tabIndex="0"
              onClick={() => navigate(`/category/${rightData1?.text}`, { state: { product: rightData1 } })}
            >
              <img
                src={rightImage1}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--even"
                alt="Right Product 2"
                ref={rightImgRef1}
                onError={(e) => (e.target.src = "https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error")}
              />
            </div>
          </li>
        </ul>
      </div> */}
    </section>
  );
};

export default ParallaxSection;
