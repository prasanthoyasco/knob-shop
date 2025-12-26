import React, { useRef } from "react";
import "./newProductSection.css";
import { motion, useScroll, useTransform } from 'framer-motion';

const animationItems = [
  { id: 0, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif" },
  { id: 1, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed856ccbcbf4ef43d021_hero-03.avif" },
  { id: 2, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed858086c4f9184ebe58_hero-04.avif" },
  { id: 3, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed855842decdf34808cd_hero-05.avif" },
  { id: 4, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed85b509dcb02a8c567e_hero-01.avif" },
  { id: 5, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif" },
  { id: 6, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3ed80623a988d63085b92_hero-02.avif" },
  { id: 7, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif", isSpecial: true },
  { id: 8, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif", isSpecial: true },
  { id: 9, img: "https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67e3eda156c8c989c8bd5f10_hero-06.avif", isSpecial: true },
];

export default function HeroScrollSection() {
  // 1. Create a reference to the section
  const sectionRef = useRef(null);

  // 2. Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start tracking when the top of the section hits the bottom of the viewport
    // End tracking when the bottom of the section hits the top of the viewport
    offset: ["start end", "end start"]
  });

  // 3. Map the scroll progress (0 to 1) to rotation degrees (e.g., 30 to -30)
  // [0, 1] means start to end of scroll. 
  // [30, -30] means it starts rotated right and ends rotated left.
  const rotateY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="hero-section-2">
      {/* <div className="w-layout-blockcontainer container w-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-2-section-inner"
        >
          
        </motion.div>
      </div> */}

      <div className="w-layout-blockcontainer container-fuild w-container">
        <div className="hero-section-2-wrap">
          <div className="rotation-circle-wrap">
            <div className="rotation-circle-box">
              
              {/* 4. Apply the rotateY motion value here */}
              <motion.div 
                className="animation-box"
                style={{ 
                    rotateY, 
                    transformStyle: 'preserve-3d' 
                }}
              >
                {animationItems.map((item) => (
                  <div key={item.id} className={`animation-item item-${item.id}`}>
                    <div className="animation-image-box box-1">
                      <img src={item.img} className="animation-item-image" alt="hero" />
                    </div>
                    <div className="animation-image-box">
                      <img src={item.img} className="animation-item-image" alt="hero" />
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}