import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useCallback } from "react"; // Removed useState for activeSlideIndex
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./NewHero.css";
import { useNavigate } from "react-router-dom";
import lunaProImage from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp'
import yaleImage from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg'
import YMI70AYHImage from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/YMI70A-YH/YMI70_RED-GOLD-01.jpg'
const slides = [
  { id: 1, img: "/slider/lock.png", imgheight: 400, bg: "/slider/bg-1.jpg", offer: "Flat 15% Off All Items", text: "Digital Door Lock", circleColor: "#9CB8A5", description: "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt et dolore magna labore et dolore magna aliqua.", number: "01",link:"/category/Digital Door Lock",productList:[
    {
      name: "YDME 200NxT",
      image:lunaProImage
    },
    {
      name: "YDME 100NxT",
      image:yaleImage
    },
    {
      name: "YDME 50NxT",
      image:YMI70AYHImage
    },
    {
      name: "YDME 50Pro",
      image:YMI70AYHImage
    },
    {
      name: "REFLECTA Lock",
      image:YMI70AYHImage
    }
  ]},
  { id: 2, img: "/slider/keyboard_tray.png", imgheight: 400, bg: "/slider/bg-2.jpg", offer: "NEW SEASON ARRIVAL", text: "Keyboard tray", circleColor: "#F08A58", description: "A keyboard tray is a sliding platform mounted under a desk, designed to hold a keyboard and mouse, improving ergonomics and saving workspace on the desktop.", number: "02",route:"Keyboard Tray" },
  { id: 3, img: "/slider/folding_table.png", imgheight: 400, bg: "/slider/bg-3.jpg", offer: "Flat 15% Off All Items", text: "table folding bracket", circleColor: "#00759F", description: "A table folding bracket is a space-saving hardware device that allows tables to fold down or up securely, ideal for wall-mounted, collapsible, or adjustable furniture designs.", number: "03",route:"table folding bracket"},
  { id: 4, img: "/slider/Door_stoper.png", imgheight: 200, bg: "/slider/bg-5.jpg", offer: "Flat 15% Off All Items", text: "door stoppers home depot", circleColor: "#DF7A26", description: "Door stoppers from Home Depot include solid baseboard-mounted models and spring‑steel flexible wire types, designed to prevent wall and doorknob damage. ", number: "04",route:"stopper"},
  { id: 5, img: "/slider/vIntage_lock.png", imgheight: 330, bg: "/slider/bg-6.jpg", offer: "Flat 15% Off All Items", text: "navtal lock decor", circleColor: "#54ef7d73", description: "Navtal lock decor combines security with aesthetics, featuring brass or stainless steel padlocks in stylish finishes, often used on doors or cabinets for both function and design appeal.", number: "05",route:"lock"},
];

const NewHero = () => {
  const navigate= useNavigate()
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
  const handleShopNow = (slide) => {
    const query = slide.route || slide.text || "all";
    navigate(`/products/search/${encodeURIComponent(query)}`);
  };
  
  
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
                <h2 className="title animate-on-slide-left text-animation-delay-2">{slide.text}</h2>
                <p className="description animate-on-slide-left text-animation-delay-3">{slide.description}</p>
                <button className="shop-btn animate-on-slide-left text-animation-delay-4" onClick={() => handleShopNow(slide)}>SHOP NOW</button>
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