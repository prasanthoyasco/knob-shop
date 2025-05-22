import { Swiper, SwiperSlide } from "swiper/react";
import {useRef} from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import effect-fade CSS

import bg1 from '../../Assets/bg1.jpg';
import bg2 from '../../Assets/bg2.jpg';
import bg3 from '../../Assets/bg3.jpg';

import "./Hero.css";

const slides = [
  {
    id: 1,
    bg: bg1,
    offer: "FLAT 20% OFF ALL ITEMS",
    title: "LIGHTING HOME",
    description: "Bench suitable for living room. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    number: "01",
  },
  {
    id: 2,
    bg: bg2,
    offer: "NEW SEASON ARRIVAL",
    title: "MODERN LAMPS",
    description: "Explore our modern lighting collection. Sed do eiusmod tempor incididunt ut labore.",
    number: "02",
  },
  {
    id: 3,
    bg: bg3,
    offer: "LIMITED TIME OFFER",
    title: "ELEGANT INTERIORS",
    description: "Perfect decor solutions. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    number: "03",
  },
];

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // No need for swiperInstance state if using onInit for navigation setup
  // const [swiperInstance, setSwiperInstance] = useState(null); 

  return (
    <div className="lighting-home-slider">
      {/* Custom navigation buttons */}
      <div className="custom-nav">
        <button ref={prevRef} className="custom-nav-btn">
          <IoIosArrowBack />
        </button>
        <button ref={nextRef} className="custom-nav-btn">
          <IoIosArrowForward />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        // Use onInit to ensure refs are available when Swiper sets up navigation
        onInit={(swiper) => {
          if (swiper.params.navigation) { // Check if navigation module is enabled
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        navigation={true} // Enable the navigation module
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `
            <span class="${className}">
                <svg class="progress-ring" viewBox="0 0 24 24">
                <circle class="progress-ring__circle" cx="12" cy="12" r="10" />
                <circle class="progress-ring__dot" cx="12" cy="12" r="4" />
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
                backgroundImage: `url(${slide.bg})`,
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
                <div className="slide-number">{slide.number}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;