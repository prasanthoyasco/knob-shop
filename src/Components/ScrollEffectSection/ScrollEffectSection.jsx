import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollEffectSection.css';

const ScrollEffectSection = () => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Controls the rotation of the entire track as you scroll
  const rawRotation = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateYTrack = useSpring(rawRotation, { stiffness: 50, damping: 20 });

  const images = [
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif",
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed856ccbcbf4ef43d021_hero-03.avif",
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed858086c4f9184ebe58_hero-04.avif",
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed855842decdf34808cd_hero-05.avif",
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed85b509dcb02a8c567e_hero-01.avif",
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif",
    "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif",
  ];

  return (
    <div className="new3deffect-scroll-container" ref={targetRef}>
      <section className="new3deffect-sticky-wrapper">
        <div className="new3deffect-content">
          <h1 className="new3deffect-title-main">Brands Digital</h1>
          
          <div className="new3deffect-slider-area">
            <div className="new3deffect-perspective">
              <motion.div 
                className="new3deffect-track"
                style={{ rotateY: rotateYTrack }}
              >
                {images.map((src, i) => {
                  // Calculate positioning
                  // Spread cards across 120 degrees (-60 to +60)
                  const totalCards = images.length;
                  const angleStep = 120 / (totalCards - 1);
                  const angle = (i * angleStep) - 60; 

                  return (
                    <div 
                      key={i} 
                      className="new3deffect-card"
                      style={{ 
                        // translateZ moves cards out from the center to create the circle
                        // rotateY(angle) points them toward the center
                        transform: `rotateY(${angle}deg) translateZ(-900px)` 
                      }}
                    >
                      <img src={src} alt={`Slide ${i}`} />
                    </div>
                  );
                })}
              </motion.div>
            </div>
            <div className="new3deffect-floor-glow"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollEffectSection;