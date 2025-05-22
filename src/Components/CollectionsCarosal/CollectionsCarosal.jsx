import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import collectionCarosal1 from '../../Assets/collectionCarosal1.jpg';
import collectionCarosal2 from '../../Assets/collectionCarosal2.jpg';
import collectionCarosal3 from '../../Assets/collectionCarosal3.jpg';
import './CollectionsCarosal.css';

const carouselData = [
  {
    image: collectionCarosal1,
    subtit:'Cabinets & Storage',
    title: 'DOOR STEEL LOCKER UNIT ALMIRAH',
    description: 'Bench suitable for living room Lorem ipsum dolor sit amet consectetur...',
  },
  {
    image: collectionCarosal2,
    subtit:'Modular Kitchens',
    title: 'MAKE A KITCHEN PART OF THE FAMILY',
    description: 'Modular kitchens tailor-made for the Indian style of cooking...',
  },
  {
    image: collectionCarosal3,
    subtit:'Beds & Mattresses',
    title: 'ENHANCING YOUR SLEEP EXPERIENCE',
    description: 'Plywood is renowned for its quality craftsmanship and attention to detail when it comes to beds and mattresses.',
  },
];

const CollectionsCarosal = () => {
  return (
    <div className="custom-carousel-container">

       <Swiper
  modules={[Navigation, Pagination, EffectFade, Autoplay]}
  effect="fade"
  fadeEffect={{ crossFade: true }}
  slidesPerView={1}
  loop={true}
  autoplay={{ delay: 5000 }}
  navigation={{
    nextEl: '.custom-swiper-button-next',
    prevEl: '.custom-swiper-button-prev',
  }}
  pagination={{ clickable: true }}
  className="custom-swiper"
>
        {carouselData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="custom-carousel-slide-bg"
              style={{ backgroundImage: `url(${item.image})` }}
            >
             <div className="custom-carousel-overlay">
              <h5 className="custom-carousel-subtitle">{item.subtit}</h5>
              <h2 className="custom-carousel-title">{item.title}</h2>
              <p className="custom-carousel-description">{item.description}</p>
              <button className="custom-carousel-button">SHOP NOW</button>
            </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-swiper-button-prev"><IoIosArrowBack /></div>
        <div className="custom-swiper-button-next"> <IoIosArrowForward  /></div>
      </Swiper>
    </div>
  );
};

export default CollectionsCarosal;
