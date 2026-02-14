import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CubeCarousel.css";

import collectionCarosal1left from "../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec- 3/image (1)/image.png";
import collectionCarosal1right from "../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec- 3/image (1)/image (1).png";

import collectionCarosal2left from "../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec- 3/image (1)/image (2).png";
import collectionCarosal2right from "../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec- 3/image (1)/image (3).png";

import collectionCarosal3left from "../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec- 3/image (1)/image (4).png";
import collectionCarosal3right from "../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec- 3/image (1)/image (5).png";
import { useNavigate } from "react-router-dom";

const carouselData = [
  {
    leftImage: collectionCarosal1left,
    rightImage: collectionCarosal1right,
    title: "ELEGANTLY DIVIDE YOUR SPACES",
    subtitle: "GLASS PARTITIONS",
    description:
      "Elegant glass partitions create open, bright spaces while maintaining privacy and enhancing modern interior design.",
  },
  {
    leftImage: "/Knobs_1.png",
    rightImage: "/cubeSec/KitRight.png",
    title: "DESIGN THAT COOKS WITH YOU",
    subtitle: "MODULAR KITCHENS",
    description:
      "Modular kitchens offer efficient layouts, sleek storage, and customizable designs for a stylish, organized cooking space.",
  },
  {
    leftImage: "/cubeSec/WardLeft.png",
    rightImage: "/cubeSec/WardRight.png",
    title: "SEAMLESS STORAGE WITH STYLE",
    subtitle: "WARDROBES",
    description:
      "Stylish wardrobes provide ample storage, enhance room aesthetics, and can be tailored to fit any space perfectly.",
  },
];

const CubeCarousel = ({Title}) => {
  const navigate = useNavigate()
  const prevRef = useRef(null);
  const nextRef = useRef(null);
   const [isMobile, setIsMobile] = useState(false);
   const Heading = Title ? Title +" Collection" : "New & Tradition Collection";
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Set on mount
    window.addEventListener('resize', checkMobile); // Update on resize
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handilClick = (title)=>{
    const linkprof = title.trim().toLowerCase().replace(/\s+/g, '-');
    navigate(`/subpage/${linkprof}`)
  }

  return (
    <div className="cube-carousel-wrapper">
      <div className="flex-grow-1 text-center my-4">
        <h2 className="h5 text-capitalize fw-bold">
           {Heading}
        </h2>
      </div>

      <Swiper
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                <button className="cube-button" onClick={()=>{handilClick(item.subtitle)}}>Explore Now</button>
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
