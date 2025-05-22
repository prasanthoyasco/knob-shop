// ParallaxSection.jsx
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import './ParallaxSection.css'

const ParallaxSection = ({ title, subtitle, buttonText, buttonLink, leftImage, rightImage }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const rightY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [-15, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden h-[100vh] flex items-center justify-center bg-white">
      {/* Images - Background Layer */}
     <div className="front-layer">
         <motion.img
        src={leftImage}
        style={{ y: leftY, rotate: leftRotate }}
        className="absolute left-10 bottom-0 w-64 object-cover rounded-xl shadow-xl z-10"
        alt="Left"
      />
      <motion.img
        src={rightImage}
        style={{ y: rightY, rotate: rightRotate }}
        className="absolute right-10 bottom-0 w-64 object-cover rounded-xl shadow-xl z-10"
        alt="Right"
      />
     </div>

      {/* Foreground Text */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center z-20 max-w-xl px-6"
      >
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-6">{subtitle}</p>
        <a href={buttonLink} className="bg-black text-white px-6 py-3 rounded-lg inline-block">
          {buttonText}
        </a>
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
