import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useCallback, useState } from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import img1 from '../../Assets/CategoriesImge/Knob Shop/mortice handle2.jpg'
import img2 from '../../Assets/CategoriesImge/Knob Shop/Section-1.jpg'
import img3 from '../../Assets/CategoriesImge/Knob Shop/yale.png'
import img4 from '../../Assets/CategoriesImge/Knob Shop/gold_handle.png'
import img5 from '../../Assets/CategoriesImge/Knob Shop/Pull handle.png'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./NewHero.css";

import video from "../../Assets/bannerVideo.webm";
import lunaProImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp";
import yaleImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg";
import YMI70AYHImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/YMI70A-YH/YMI70_RED-GOLD-01.jpg";

const baseSlides = [
  {
    id: 1,
    route: "/category/688a008ceb18e197cb94839d",
    img: "/HeroBanner/DL.png",
    imgheight: 700,
    bg: "/slider/bg-1.jpg",
    offer: "Flat 15% Off All Items",
    text: "Digital Lock ",
    circleColor: "#f0babaff",
    number: "01",
    productList: [
      { name: "YDME 200NxT", image: lunaProImage },
      { name: "YDME 100NxT", image: yaleImage },
      { name: "YDME 50NxT", image: YMI70AYHImage },
      { name: "YDME 50Pro", image: YMI70AYHImage },
      { name: "REFLECTA Lock", image: YMI70AYHImage },
    ],
    description:
      "Upgrade to advanced digital locks with fingerprint, PIN, RFID & mobile app access — designed for modern homes that demand security with style.",
  },
  {
    id: 2,
    route: "/category/6888f4bea016fb31bad48e26",
    img: "/HeroBanner/Safe.png",
    imgheight: 700,
    bg: "/slider/bg-2.jpg",
    offer: "NEW SEASON ARRIVAL",
    text: "Safe  Lockers",
    circleColor: "#F08A58",
    number: "02",
    description:
      "Discover premium safe lockers designed to secure your cash, jewellery, documents and digital valuables with advanced locking technology and superior build quality.",
  },
  {
    id: 3,
    route: "/category/68d43cc795364359eb541b38",
    img: "/HeroBanner/MH.png",
    imgheight: 600,
    bg: "/slider/bg-6.jpg",
    offer: "Flat 15% Off All Items",
    text: "Mortise Handle ",
    circleColor: "#a2d85aff",
    number: "03",
    description:
      "High-quality mortise handles crafted for durability, smooth operation, and elegant design — perfect for main doors, bedrooms, and premium interiors. ",
  },
  {
    id: 4,
    route: "/category/68e36ef0f20278111c26aacb",
    img: "/HeroBanner/Knob.png",
    imgheight: 700,
    imgClass: "knob-mobile-img", 
    bg: "/slider/bg-5.jpg",
    offer: "Flat 15% Off All Items",
    text: "Knobs",
    circleColor: "#aae9cfff",
    number: "04",
    description:
      "Upgrade your cabinets, wardrobes, and drawers with premium designer knobs built for durability, smooth grip, and timeless design.",
  },
  {
    id: 5,
    route: "/category/68e3b3ef2fd5b8167441a5bb ",
    img: "/HeroBanner/MDH.png",
    imgheight: 700,
    bg: "/slider/bg-6.jpg",
    offer: "Flat 15% Off All Items",
    text: "Main Door Handle  ",
    circleColor: "#e8e5f0ff",
    number: "05",
    description:
      "Upgrade your entrance with premium main door handles crafted for strength, durability, and elegant design — the perfect blend of security and style.",
  },
  {
    id: "video",
    type: "video",
    videoSrc: video,
  },
];

const NewHero = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);


  const isMobile = window.innerWidth < 768;
  const slides = baseSlides;
  const storedRef = JSON.parse(localStorage.getItem("dtdcReferenceNumber"));
  const storeRef = JSON.parse(localStorage.getItem("referenceNumber"));
  console.log("Stored DTDC Reference Number:", storedRef);
  console.log("Stored  Reference Number:", storeRef);

  const retriggerAnimations = useCallback(() => {
    const animatedElements = document.querySelectorAll(".animate-on-slide");
    animatedElements.forEach((el) => {
      el.classList.remove("active-zoom-in");
      setTimeout(() => {
        el.classList.add("active-zoom-in");
      }, 50);
    });
  }, []);

  const handleSlideChange = useCallback(
    (swiper) => {
      setCurrentSlideIndex(swiper.activeIndex);
      retriggerAnimations();
      const isVideoSlide = slides[swiper.realIndex]?.type === "video";

      if (isVideoSlide) {
        swiper.autoplay?.stop();
        const videoEl = document.querySelector(".full-banner-video");
        if (videoEl) {
          videoEl.currentTime = 0;
          videoEl.play().catch(() => { });
        }
      } else {
        swiper.autoplay?.start();
      }
    },
    [retriggerAnimations, slides]
  );

  useEffect(() => {
    return () => {
      clearTimeout(window.__videoSlideTimeout);
    };
  }, []);

  const handleShopNow = (slide) => {
    const query = slide.route || slide.text || "all";
    navigate(`/products/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="lighting-home-slider">
      {!isMobile && slides[currentSlideIndex]?.type !== 'video' && (
        <div className="custom-nav">
          <button ref={prevRef} className="custom-nav-btn">
            <IoIosArrowUp />
          </button>
          <button ref={nextRef} className="custom-nav-btn">
            <IoIosArrowDown />
          </button>
        </div>
      )}

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
        navigation
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
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.type === "video" ? (
              <video
                src={slide.videoSrc}
                autoPlay
                muted
                playsInline
                className="full-banner-video"
                style={{
                  width: "100%",
                  height: isMobile ? "auto" : "100vh", // ✅ Responsive height
                  objectFit: "cover",
                }}
                onPlay={(e) => {
                  const video = e.currentTarget;
                  const swiper = swiperRef.current?.swiper;
                  swiper?.autoplay?.stop();

                  const duration = (video.duration || 15) * 1000;
                  clearTimeout(window.__videoSlideTimeout);

                  window.__videoSlideTimeout = setTimeout(() => {
                    swiper?.slideNext();
                    swiper?.autoplay?.start();
                  }, duration);
                }}
                onEnded={() => {
                  const swiper = swiperRef.current?.swiper;
                  swiper?.slideNext();
                  swiper?.autoplay?.start();
                }}
              />
            ) : (
              <div
                className="slide-content"
                style={{
                  background: `url(${slide.bg}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              >
                <div className="left-section">
                  <p className="offer animate-on-slide-left text-animation-delay-1">
                    {slide.offer}
                  </p>
                  <h2 className="title animate-on-slide-left text-animation-delay-2">
                    {slide.text}
                  </h2>
                  <p className="description animate-on-slide-left text-animation-delay-3">
                    {slide.description}
                  </p>
                  <button
                    className="shop-btn animate-on-slide-left text-animation-delay-4"
                    onClick={() => navigate(slide.route)}
                    // onClick={() => handleShopNow(slide)}
                  >
                    SHOP NOW
                  </button>
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
                      <img
                        src="/hero-bg-strok.png"
                        className="bg-strok"
                        alt=""
                      />
                    </div>
                    <img
                      src={slide.img}
                      alt={slide.text}
                      className={`product-img img-fluid animate-on-slide product-animation-delay ${slide.id === 4 ? "knob-mobile-img" : ""}`}
                      // height={slide.imgheight}
                      style={{
                        maxHeight: "700px",
                        height: `${slide.imgheight}px`,
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewHero;
