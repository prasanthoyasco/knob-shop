import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // ADD Autoplay
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "./LockSlider.css";

const slides = [
  {
    title: "DIGITAL DOOR LOCK",
    subtitle: "FLAT 15% OFF ALL ITEMS",
    description:
      "Bench suitable for living room Lorem ipsum dolor sit amet consectetur adipiscing elit sed incididunt labore et dolore magna aliqua.",
    image: "/slider/lock.png",
    circleColor: "#b2d0c7",
    bgColor: "#f4f6f5"
  },
  {
    title: "SMART LOCK SERIES",
    subtitle: "NEW LAUNCH",
    description:
      "Security solutions for modern homes. Sleek design with ultimate safety features.",
    image: "/slider/lock.png",
    circleColor: "#d6d5e4",
    bgColor: "#efedf7"
  }
];

const LockSlider = () => {
  const [bgColor, setBgColor] = useState(slides[0].bgColor);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
  

  return (
    <div className="vertical-slider" style={{ backgroundColor: bgColor }}>
        <div className="custom-nav">
                <button ref={prevRef} className="custom-nav-btn">
                  <IoIosArrowUp />
                </button>
                <button ref={nextRef} className="custom-nav-btn">
                  <IoIosArrowDown />
                </button>
              </div> 
      <Swiper
        direction="vertical"
        onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  }}
  onSwiper={(swiper) => {
    setTimeout(() => {
      swiper.navigation.init();
      swiper.navigation.update();
    });
  }}
        navigation={true}
        // autoplay={{ delay: 4000, disableOnInteraction: false }} // Autoplay settings
        pagination={{
          el: ".swiper-custom-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}" data-index="${String(index + 1).padStart(2, "0")}"></span>`
        }}
        modules={[Pagination, Autoplay]}
        onSlideChange={(swiper) => setBgColor(slides[swiper.activeIndex].bgColor)} // Dynamic bg
        className="h-100"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Container fluid className="h-100 d-flex align-items-center">
              <Row className="w-100 align-items-center">
                <Col md={6} className="text-center text-md-start px-5">
                  <p className="text-uppercase small">{slide.subtitle}</p>
                  <h2 className="fw-bold">{slide.title}</h2>
                  <p className="text-muted">{slide.description}</p>
                  <Button variant="dark">Shop Now</Button>
                </Col>
                <Col
                  md={6}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div
                    className="circle-bg"
                    style={{ backgroundColor: slide.circleColor }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="img-fluid"
                      style={{ maxHeight: "250px" }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
        <div className="swiper-custom-pagination position-absolute top-50 end-0 translate-middle-y pe-3"></div>
      </Swiper>
    </div>
  );
};

export default LockSlider;
