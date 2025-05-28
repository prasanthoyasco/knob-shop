import React, { useRef, useEffect, useCallback, useState } from 'react';
import './ParallaxSection.css';

const ArrowDownIcon = () => (
  <svg className="svg-icon svg-icon--arrow-down w-12 h-12 text-white" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <g transform="rotate(-90 -0.00000157361 72)">
      <g>
        <rect x="0" y="72" fill="none" height="72" width="72"></rect>
        <path d="m48.688,81.162l0.876,0.876a1.487,1.487 0 0 1 0,2.1l-24.222,24.225l24.223,24.223a1.487,1.487 0 0 1 0,2.1l-0.876,0.876a1.487,1.487 0 0 1 -2.1,0l-26.154,-26.148a1.487,1.487 0 0 1 0,-2.1l26.151,-26.153a1.487,1.487 0 0 1 2.1,0l0.002,0.001z"></path>
      </g>
    </g>
  </svg>
);

const ParallaxSection = ({
  text = 'See our latest inspirations',
  // title = 'Check over 10,000 Inspirations',
  buttonText = 'Check now',
  buttonLink = '/pages/inspired',
  leftImage,
  rightImage,
  rotation = 10,
  sectionId = 'template--24640570294456__parallax_EPkUDw',
  target = 50000, duration = 2000
}) => {
  const sectionRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
 const [displayNumber, setDisplayNumber] = useState('00000');
  const rotateImagesOnScroll = useCallback(() => {
    if (!sectionRef.current || !leftImgRef.current || !rightImgRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollProgress = (viewportHeight - sectionRect.top) / (viewportHeight + sectionRect.height);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const maxRotation = parseInt(rotation, 10) || 10;

    [
      { ref: leftImgRef.current, reverse: true },
      { ref: rightImgRef.current, reverse: false },
    ].forEach(({ ref, reverse }) => {
      const angle = clampedProgress * maxRotation * (reverse ? -1 : 1);
      window.requestAnimationFrame(() => {
        ref.style.transform = `translate3d(0px, 0px, 0px) rotate(${angle}deg)`;
      });
    });
  }, [rotation]);

  useEffect(() => {
    window.addEventListener('scroll', rotateImagesOnScroll);
    rotateImagesOnScroll();
    return () => window.removeEventListener('scroll', rotateImagesOnScroll);
  }, [rotateImagesOnScroll]);

 useEffect(() => {
    let start = 0;
    const end = parseInt(target.toString().padStart(5, '0'));
    const range = end - start;
    const incrementTime = 30;
    const totalSteps = duration / incrementTime;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const value = Math.floor(progress * range);
      setDisplayNumber(value.toString().padStart(5, '0'));
      if (step >= totalSteps) clearInterval(interval);
    }, incrementTime);

    return () => clearInterval(interval);
  }, [target, duration]);
  return (
    <section
      className="parallax-section"
      data-rotation={rotation}
      ref={sectionRef}
    >
      <div className="wt-parallax__content" data-section-id={sectionId}>
        <div className="scroll-trigger animate--slide-in disabled-on-mobile rich-text">
          <div className="hero__wrapper">
            <div className="hero hero--video-background">
              <div className="hero__pic-container disabled-on-mobile"></div>
              <div className="hero__overlay hero__overlay--center hero__overlay--mobile--" href={buttonLink}>
                <div className="hero__overlay__content hero__overlay__content--center hero__overlay__content--mobile-- rte">
                  <div className="hero__text rte">
                    <p>{text}</p>
                  </div>
                  <h2 className="hero__title hero">Check over {displayNumber.split('').map((digit, index) => (
        <span key={index} className="digit">
          {digit}
        </span>
      ))} <span style={{color:'#AB7B53'}}>Products</span></h2>
                  <div className="hero__button--gap">
                    <a href={buttonLink} aria-label={buttonText} className="hero__button--primary ctn big-ctn ">
                      <span>{buttonText}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wt-parallax__additional">
          <div className="wt-parallax__additional__icon">
            <ArrowDownIcon />
          </div>
        </div>
      </div>

      {/* Background Gallery */}
      <div className="wt-parallax__gallery">
        <ul className="wt-parallax__gallery__list">
          <li className="wt-parallax__gallery__item">
            <a href="/collections/chairs" tabIndex="0">
              <img
                src={leftImage}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--odd"
                alt="Left"
                ref={leftImgRef}
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error'; }}
              />
            </a>
          </li>
          <li className="wt-parallax__gallery__item wt-parallax__gallery__item--even">
            <a href="/collections/dining-room" tabIndex="0">
              <img
                src={rightImage}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--even"
                alt="Right"
                ref={rightImgRef}
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error'; }}
              />
            </a>
          </li>
          <li className="wt-parallax__gallery__item">
            <a href="/collections/chairs" tabIndex="0">
              <img
                src={leftImage}
                loading="lazy"
                className="wt-parallax__img wt-parallax__img--odd"
                alt="Left"
                ref={leftImgRef}
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error'; }}
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ParallaxSection;
