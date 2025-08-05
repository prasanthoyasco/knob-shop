import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import singleCarosal1 from "../../Assets/blogcoverphoto.jpg";
import singleCarosal2 from "../../Assets/Untitled/w2.jpg";
import singleCarosal3 from "../../Assets/Untitled/w3.jpg";
import "./SingleCarosal.css";
import { useNavigate } from "react-router-dom";

const carouselData = [
  {
    image: singleCarosal1,
    subtit: "Pankaj Plywood ",
    title: "Crafted for Creators. Trusted by Pros.",
    description:
      "Trusted by architects, builders & carpenters for quality and style.",
  },
  {
    image: singleCarosal2,
    subtit: "Decor point",
    title: "MAKE A KITCHEN PART OF THE FAMILY",
    description:
      "Modular kitchens tailor-made for the Indian style of cooking...",
  },
  {
    image: singleCarosal3,
    subtit: "Faber",
    title: "ENHANCING YOUR SLEEP EXPERIENCE",
    description:
      "Plywood is renowned for its quality craftsmanship and attention to detail when it comes to beds and mattresses.",
  },
];

const SingleCarosal = () => {
  const navigate = useNavigate();
  return (
    <div className="custom-carousel-container mt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        loop={true}
        className="custom-single-swiper"
      >
        {carouselData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="custom-single-carousel-slide-bg"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="custom-single-carousel-overlay">
                <h5 className="custom-carousel-subtitle">
                  {item.subtit}
                  <strong>{item.subtitbold}</strong>
                </h5>
                <h2 className="custom-single-carousel-title text-uppercase">
                  {item.title}
                </h2>
                <p className="custom-carousel-description">
                  {item.description}
                </p>
                <button
                  className="custom-carousel-button"
                  onClick={() =>
                    navigate(
                      `/subpage/${item?.subtit.replace(/\s+/g, "")}`
                    )
                  }
                >
                  Explore NOW
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-swiper-button-prev">
          <IoIosArrowBack />
        </div>
        <div className="custom-swiper-button-next">
          {" "}
          <IoIosArrowForward />
        </div>
      </Swiper>
    </div>
  );
};

export default SingleCarosal;
