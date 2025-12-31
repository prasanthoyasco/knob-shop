import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './HeroSection2.css';

const HeroSection2 = () => {
  const targetRef = useRef(null);
  


  // Matches Webflow keyframes: 0deg -> 180deg (or -180deg for direction).
  // Changed to negative to rotate Left-to-Right (drum spins clockwise from top).
  // Adjusted offset to ["start start", "end start"] so it starts from 0 when at top.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [0, -180]); 
  
  // Smoothing with spring to match 'smoothing: 92'
  const rotateY = useSpring(rotateYRaw, { stiffness: 40, damping: 20, restDelta: 0.001 });

  return (
    <section className="hero-section-2" ref={targetRef}>
      <div className="w-layout-blockcontainer container-fuild w-container">
        <div className="hero-section-2-wrap">
          <div className="rotation-circle-wrap">
            <div className="rotation-circle-box">
              <div className="animation-box">
                {/* Item 0 - 0deg + Scroll */}
                <motion.div className="animation-item item-0" style={{ rotateY: useTransform(rotateY, r => r + 0) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>

                {/* Item 1 - 30deg + Scroll */}
                <motion.div className="animation-item item-1" style={{ rotateY: useTransform(rotateY, r => r + 30) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed856ccbcbf4ef43d021_hero-03.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed856ccbcbf4ef43d021_hero-03.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>

                {/* Item 2 - 60deg + Scroll */}
                <motion.div className="animation-item item-2" style={{ rotateY: useTransform(rotateY, r => r + 60) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed858086c4f9184ebe58_hero-04.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed858086c4f9184ebe58_hero-04.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>

                {/* Item 3 - 90deg + Scroll */}
                <motion.div className="animation-item item-3" style={{ rotateY: useTransform(rotateY, r => r + 90) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed855842decdf34808cd_hero-05.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed855842decdf34808cd_hero-05.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>

                {/* Item 4 - 120deg + Scroll */}
                <motion.div className="animation-item item-4" style={{ rotateY: useTransform(rotateY, r => r + 120) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed85b509dcb02a8c567e_hero-01.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed85b509dcb02a8c567e_hero-01.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>

                {/* Item 5 - 150deg + Scroll */}
                <motion.div className="animation-item item-5" style={{ rotateY: useTransform(rotateY, r => r + 150) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>

                {/* Item 6 - 180deg + Scroll */}
                <motion.div className="animation-item item-6" style={{ rotateY: useTransform(rotateY, r => r + 180) }}>
                  <div className="animation-image-box box-1">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                  <div className="animation-image-box">
                    <img src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif" loading="lazy" alt="hero 2 image" className="animation-item-image" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
