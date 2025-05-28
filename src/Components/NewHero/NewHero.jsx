import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import effect-fade CSS

import "./NewHero.css";

const slides = [
  {
    id: 1,
    bg: '/slider/lock.png',
    offer: "Flat 15% Off All Items",
    title: "Digital Door Lock",
    circleColor: "#9CB8A5",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt labore et dolore magna aliqua.",
    number: "01",
  },
  {
    id: 2,
    bg: '/slider/keyboard_tray.png',
    offer: "NEW SEASON ARRIVAL",
    title: "Keyboard tray",
    circleColor: "#F08A58",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt labore et dolore magna aliqua.",
    number: "02",
  },
  {
    id: 3,
    bg: '/slider/folding_table.png',
    offer: "Flat 15% Off All Items",
    title: "table folding bracket",
    circleColor: "#00759F",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt labore et dolore magna aliqua.",
    number: "03",
  },
  {
    id: 4,
    bg: '/slider/Door_stoper.png',
    offer: "Flat 15% Off All Items",
    title: "door stoppers home depot",
    circleColor: "#DF7A26",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt labore et dolore magna aliqua.",
    number: "04",
  },
  {
    id: 5,
    bg: '/slider/vIntage_lock.png',
    offer: "Flat 15% Off All Items",
    title: "navtal lock decor",
    circleColor: "#54ef7d73",
    description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt labore et dolore magna aliqua.",
    number: "05",
  },
];

const NewHero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-content"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="left-section">
                <p className="offer">{slide.offer}</p>
                <h2 className="title">{slide.title}</h2>
                <p className="description">{slide.description}</p>
                <button className="shop-btn">SHOP NOW</button>
                <div className="hero-slide-number"><div className="horizantal-line"></div>{slide.number}</div>
              </div>
              <div className="rightImg">
                <div
                    className="circle-bg"
                    style={{ backgroundColor: slide.circleColor }}
                  >
                    <img
                      src={slide.bg}
                      alt={slide.title}
                      className="img-fluid"
                      style={{ maxHeight: "500px" }}
                    />
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