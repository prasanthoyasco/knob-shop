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

import video from "../../Assets/New folder/New folder/Faber.webm";
import lunaProImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp";
import yaleImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg";
import YMI70AYHImage from "../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/YMI70A-YH/YMI70_RED-GOLD-01.jpg";

const baseSlides = [
  {
    id: 1,
    route: "digital lock",
    img: "/slider/lock.png",
    imgheight: 400,
    bg: "/slider/bg-1.jpg",
    offer: "Flat 15% Off All Items",
    text: "Digital Door Lock",
    circleColor: "#9CB8A5",
    number: "01",
    productList: [
      { name: "YDME 200NxT", image: lunaProImage },
      { name: "YDME 100NxT", image: yaleImage },
      { name: "YDME 50NxT", image: YMI70AYHImage },
      { name: "YDME 50Pro", image: YMI70AYHImage },
      { name: "REFLECTA Lock", image: YMI70AYHImage },
    ],
    description:
      "Secure your home with advanced digital locks featuring PIN codes, biometrics, or RFID. Ideal for keyless, modern, and convenient access control systems.",
  },
  {
    id: 2,
    route: "Safe Lock",
    img:img2,
    imgheight: 400,
    bg: "/slider/bg-2.jpg",
    offer: "NEW SEASON ARRIVAL",
    text: "Safe Lock",
    circleColor: "#F08A58",
    number: "02",
    description:
      "Reliable protection for valuables with safe locks offering mechanical or electronic locking options. Perfect for homes, offices, and secure storage needs.",
  },
  {
    id: 3,
    route: "Mortice Handle",
    img:img1,
    imgheight: 400,
    bg: "/slider/bg-3.jpg",
    offer: "Flat 15% Off All Items",
    text: "Mortice Handle",
    circleColor: "#00759F",
    number: "03",
    description:
      "Stylish mortice handles with internal locking mechanisms enhance door security and aesthetics. Available in various designs for residential and commercial doors.",
  },
  {
    id: 4,
    route: "Knobs",
    img:img4,
    imgheight: 200,
    bg: "/slider/bg-5.jpg",
    offer: "Flat 15% Off All Items",
    text: "Knobs",
    circleColor: "#DF7A26",
    number: "04",
    description:
      "Durable and decorative door knobs available in multiple finishes. Ideal for both interior and exterior doors, combining function with elegant design.",
  },
  {
    id: 5,
    route: "Pull Handle ",
    img:img5,
    imgheight: 330,
    bg: "/slider/bg-6.jpg",
    offer: "Flat 15% Off All Items",
    text: "Pull Handle ",
    circleColor: "#54ef7d73",
    number: "05",
    description:
      "Strong, ergonomic pull handles designed for smooth operation on glass, wood, or metal doors. Enhances accessibility and adds a sleek touch.",
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
          videoEl.play().catch(() => {});
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
      {!isMobile  && slides[currentSlideIndex]?.type !== 'video' && (
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
                  height: isMobile ? "auto" : "600px", // ✅ Responsive height
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
                    onClick={() => handleShopNow(slide)}
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
                      className="product-img img-fluid animate-on-slide product-animation-delay"
                      height={slide.imgheight}
                      style={{ maxHeight: "500px" ,
    height: slide.img === img4 ? "350px" : "initial",
    display: "block",}}
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
