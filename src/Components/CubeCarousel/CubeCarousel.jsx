import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CubeCarousel.css';

import collectionCarosal1left from '../../Assets/collectionCarosal1left.jpg';
import collectionCarosal1right from '../../Assets/collectionCarosal1right.jpg';

import collectionCarosal2left from '../../Assets/collectionCarosal2left.jpg';
import collectionCarosal2right from '../../Assets/collectionCarosal2right.jpg';

import collectionCarosal3left from '../../Assets/collectionCarosal3left.jpg';
import collectionCarosal3right from '../../Assets/collectionCarosal3right.jpg';

const carouselData = [
  {
    leftImage: collectionCarosal1left,
    rightImage: collectionCarosal1right,
    title: 'ENHANCING YOUR SLEEP EXPERIENCE',
    subtitle: 'BEDS & MATTRESSES',
    description: 'Plywood is renowned for its quality craftsmanship and attention to detail when it comes to beds and mattresses.',
  },
  {
    leftImage: collectionCarosal2left,
    rightImage: collectionCarosal2right,
    title: 'MAKE A KITCHEN PART OF THE FAMILY',
    subtitle: 'MODULAR KITCHENS',
    description: 'Modular kitchens tailor-made for the Indian style of cooking...',
  },
  {
    leftImage: collectionCarosal3left,
    rightImage: collectionCarosal3right,
    title: 'DOOR STEEL LOCKER UNIT ALMIRAH',
    subtitle: 'CABINETS & STORAGE',
    description: 'Bench suitable for living room Lorem ipsum dolor sit amet consectetur...',
  },
];

const CubeCarousel = () => {
  return (
    <div className="cube-carousel-wrapper">
      <div className="flex-grow-1 text-center my-4"> {/* Added flex-grow-1 and text-center */}
          <h2 className="h5 text-uppercase fw-medium product-head">
            New & Tradition Collection
          </h2>
        </div>
      <Swiper
        modules={[Navigation, EffectFade,Pagination,Autoplay]}
        loop={true}
         navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        autoplay={{ delay: 4000 }}
        effect="fade"
         pagination={{ clickable: true }} 
        fadeEffect={{ crossFade: true }}
        className="cube-swiper"
      >
        {carouselData.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="cube-carousel-slide">
              <img src={item.leftImage} alt="" className="cube-image left" />
              <div className="cube-content fade-animation">
                <h5 className="cube-subtitle">{item.subtitle}</h5>
                <h2 className="cube-title">{item.title}</h2>
                <p className="cube-description">{item.description}</p>
                <button className="cube-button">Shop Now</button>
              </div>
              <img src={item.rightImage} alt="" className="cube-image right" />
            </div>
          </SwiperSlide>
        ))}
        
                <div className="custom-swiper-button-prev"><IoIosArrowBack /></div>
                <div className="custom-swiper-button-next"> <IoIosArrowForward  /></div>
      </Swiper>
    </div>
  );
};

export default CubeCarousel;
