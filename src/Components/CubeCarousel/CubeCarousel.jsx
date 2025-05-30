import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CubeCarousel.css";

import collectionCarosal1left from "../../Assets/collectionCarosal1left.jpg";
import collectionCarosal1right from "../../Assets/collectionCarosal1right.jpg";

import collectionCarosal2left from "../../Assets/collectionCarosal2left.jpg";
import collectionCarosal2right from "../../Assets/collectionCarosal2right.jpg";

import collectionCarosal3left from "../../Assets/collectionCarosal3left.jpg";
import collectionCarosal3right from "../../Assets/collectionCarosal3right.jpg";

const carouselData = [
  {
    leftImage: collectionCarosal1left,
    rightImage: collectionCarosal1right,
    title: "ENHANCING YOUR SLEEP EXPERIENCE",
    subtitle: "BEDS & MATTRESSES",
    description:
      "Plywood is renowned for its quality craftsmanship and attention to detail when it comes to beds and mattresses.",
  },
  {
    leftImage: collectionCarosal2left,
    rightImage: collectionCarosal2right,
    title: "MAKE A KITCHEN PART OF THE FAMILY",
    subtitle: "MODULAR KITCHENS",
    description:
      "Modular kitchens tailor-made for the Indian style of cooking...",
  },
  {
    leftImage: collectionCarosal3left,
    rightImage: collectionCarosal3right,
    title: "DOOR STEEL LOCKER UNIT ALMIRAH",
    subtitle: "CABINETS & STORAGE",
    description:
      "Bench suitable for living room Lorem ipsum dolor sit amet consectetur...",
  },
];

const CubeCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Set on mount
    window.addEventListener('resize', checkMobile); // Update on resize
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="cube-carousel-wrapper">
      <div className="flex-grow-1 text-center my-4">
        <h2 className="h5 text-uppercase fw-medium">
          New & Tradition Collection
        </h2>
      </div>

      <Swiper
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        loop={true}
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `
            <span class="${className}">
              <svg class="progress-ring" viewBox="0 0 24 24">
                <circle class="progress-ring__circle" cx="12" cy="12" r="10" />
                <circle class="progress-ring__dot" cx="12" cy="12" r="5" />
              </svg>
            </span>
          `,
        }}
        className="cube-swiper"
      >
        {carouselData.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="cube-carousel-slide"
              style={{
                backgroundImage:
                  isMobile ? `url(${item.leftImage})` : "none",
              }}
            >
              <img src={item.leftImage} alt="" className="cube-image left" />
              <div className="cube-content fade-animation">
                <h5 className="cube-subtitle">{item.subtitle}</h5>
                <h2 className="cube-title">{item.title}</h2>
                <p className="cube-description">{item.description}</p>
                <button className="cube-button">Shop Now</button>
              </div>
              <img src={item.rightImage} alt="" className="cube-image right" />
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-swiper-button-prev" ref={prevRef}>
          <IoIosArrowBack />
        </div>
        <div className="custom-swiper-button-next" ref={nextRef}>
          <IoIosArrowForward />
        </div>
      </Swiper>
    </div>
  );
};

export default CubeCarousel;
