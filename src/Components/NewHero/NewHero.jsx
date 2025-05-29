import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./NewHero.css";

const slides = [
  {
    id: 1,
    img: "/slider/lock.png",
    imgheight: 400,
    bg: "/slider/bg-1.jpg",
    offer: "Flat 15% Off All Items",
    title: "Digital Door Lock",
    circleColor: "#9CB8A5",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet...",
    number: "01",
  },
  {
    id: 2,
    img: "/slider/keyboard_tray.png",
    imgheight: 400,
    bg: "/slider/bg-2.jpg",
    offer: "NEW SEASON ARRIVAL",
    title: "Keyboard tray",
    circleColor: "#F08A58",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet...",
    number: "02",
  },
  {
    id: 3,
    img: "/slider/folding_table.png",
    imgheight: 400,
    bg: "/slider/bg-3.jpg",
    offer: "Flat 15% Off All Items",
    title: "table folding bracket",
    circleColor: "#00759F",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet...",
    number: "03",
  },
  {
    id: 4,
    img: "/slider/Door_stoper.png",
    imgheight: 400,
    bg: "/slider/bg-5.jpg",
    offer: "Flat 15% Off All Items",
    title: "door stoppers home depot",
    circleColor: "#DF7A26",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet...",
    number: "04",
  },
  {
    id: 5,
    img: "/slider/vIntage_lock.png",
    imgheight: 330,
    bg: "/slider/bg-6.jpg",
    offer: "Flat 15% Off All Items",
    title: "navtal lock decor",
    circleColor: "#54ef7d73",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet...",
    number: "05",
  },
];

const NewHero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animations, setAnimations] = useState(
    Array(slides.length).fill(false)
  );

  useEffect(() => {
    const updatedAnimations = [...animations];
    updatedAnimations[activeIndex] = false;
    setAnimations(updatedAnimations);

    const timeout = setTimeout(() => {
      updatedAnimations[activeIndex] = true;
      setAnimations([...updatedAnimations]);
    }, 50);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <div className="lighting-home-slider">
      {/* Custom navigation buttons */}
      <div className="custom-nav">
        <button ref={prevRef} className="custom-nav-btn">
          <IoIosArrowUp />
        </button>
        <button ref={nextRef} className="custom-nav-btn">
          <IoIosArrowDown />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        onInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        navigation={true}
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-content"
              style={{
                background: `url(${slide.bg}) no-repeat center`,
              }}
            >
              <div className="left-section">
                <p className="offer">{slide.offer}</p>
                <h2 className="title">{slide.title}</h2>
                <p className="description">{slide.description}</p>
                <button className="shop-btn">SHOP NOW</button>
                <div className="hero-slide-number">
                  <div className="horizantal-line"></div>
                  {slide.number}
                </div>
              </div>

              <div className="rightImg">
                
                  <div className={`circle-bg ${activeIndex === index ? "animate" : ""}`}>

                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="img-fluid"
                    height={`${slide.imgheight}px`}
                    style={{ maxHeight: "500px" }}
                  />
                  <div
                    className="img-bg-clr circle-bg"
                    style={{ backgroundColor: slide.circleColor }}
                  ></div>
                  <div className="circle-border">
                    <img src="/hero-bg-strok.png" className="bg-strok" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewHero;
