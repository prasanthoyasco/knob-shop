import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useCallback } from "react"; // Removed useState for activeSlideIndex
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./NewHero.css";

const slides = [
  { id: 1, img: "/slider/lock.png", imgheight: 400, bg: "/slider/bg-1.jpg", offer: "Flat 15% Off All Items", title: "Digital Door Lock", circleColor: "#9CB8A5", description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt et dolore magna labore et dolore magna aliqua.", number: "01" },
  { id: 2, img: "/slider/keyboard_tray.png", imgheight: 400, bg: "/slider/bg-2.jpg", offer: "NEW SEASON ARRIVAL", title: "Keyboard tray", circleColor: "#F08A58", description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt et dolore magna labore et dolore magna aliqua.", number: "02" },
  { id: 3, img: "/slider/folding_table.png", imgheight: 400, bg: "/slider/bg-3.jpg", offer: "Flat 15% Off All Items", title: "table folding bracket", circleColor: "#00759F", description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt et dolore magna labore et dolore magna aliqua.", number: "03" },
  { id: 4, img: "/slider/Door_stoper.png", imgheight: 200, bg: "/slider/bg-5.jpg", offer: "Flat 15% Off All Items", title: "door stoppers home depot", circleColor: "#DF7A26", description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt et dolore magna labore et dolore magna aliqua.", number: "04" },
  { id: 5, img: "/slider/vIntage_lock.png", imgheight: 330, bg: "/slider/bg-6.jpg", offer: "Flat 15% Off All Items", title: "navtal lock decor", circleColor: "#54ef7d73", description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt et dolore magna labore et dolore magna aliqua.", number: "05" },
];

const NewHero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // Removed: const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef(null);

  const retriggerAnimations = useCallback(() => {
    const animatedElements = document.querySelectorAll('.animate-on-slide');

    animatedElements.forEach(el => {
      el.classList.remove('active-zoom-in');
      // A small delay (e.g., 50ms) can sometimes help ensure the class removal is processed
      // before re-adding, especially on very fast browsers or complex animations.
      // However, void el.offsetWidth usually suffices for reflow.
      setTimeout(() => {
          el.classList.add('active-zoom-in');
      }, 50); // Small delay to ensure re-animation
    });
  }, []);

  useEffect(() => {
    retriggerAnimations();
  }, [retriggerAnimations]);

  const handleSlideChange = useCallback(() => {
    // Removed: setActiveSlideIndex(swiper.realIndex);
    retriggerAnimations();
  }, [retriggerAnimations]);

  return (
    <div className="lighting-home-slider">
      <div className="custom-nav">
        <button ref={prevRef} className="custom-nav-btn">
          <IoIosArrowUp />
        </button>
        <button ref={nextRef} className="custom-nav-btn">
          <IoIosArrowDown />
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        onInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
          retriggerAnimations();
        }}
        onSlideChange={handleSlideChange}
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
                background: `url(${slide.bg}) no-repeat center`,
                backgroundSize: 'cover',
              }}
            >
              <div className="left-section">
                {/* No longer using activeSlideIndex here, relies purely on retriggerAnimations */}
                <p className="offer animate-on-slide-left text-animation-delay-1">{slide.offer}</p>
                <h2 className="title animate-on-slide-left text-animation-delay-2">{slide.title}</h2>
                <p className="description animate-on-slide-left text-animation-delay-3">{slide.description}</p>
                <button className="shop-btn animate-on-slide-left text-animation-delay-4">SHOP NOW</button>
                <div className="hero-slide-number">
                  <div className="horizantal-line"></div>
                  {slide.number}
                </div>
              </div>

              <div className="rightImg">
                <div className="circle-elements">
                    <div
                      className="img-bg-clr circle-bg animate-on-slide"
                      style={{ backgroundColor: slide.circleColor }}
                    ></div>
                    <div className="circle-border animate-on-slide border-animation-delay">
                      <img src="/hero-bg-strok.png" className="bg-strok" alt="" />
                    </div>
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="product-img img-fluid animate-on-slide product-animation-delay"
                      height={`${slide.imgheight}px`}
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