import React, { useState } from 'react';
import Slider from "react-slick";
import './Brand.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import brand1 from '../../Assets/brand1.png'
import brand2 from '../../Assets/brand2.png'
import brand3 from '../../Assets/brand3.png'
import brand4 from '../../Assets/brand4.png'
import brand5 from '../../Assets/brand5.png'
import brand6 from '../../Assets/brand6.png'

const images = [brand1, brand2, brand3, brand4, brand5, brand6];

function Brand() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesToShow = 6; // default slidesToShow, same as in settings

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Helper to determine if a slide should be greyed out
  // We'll grey out the first and last visible slides:
  // So slides at currentSlide and currentSlide + slidesToShow - 1

  return (
    <div className='brands-container'>
      <h5>TRUSTED BY TOP BRANDS</h5>
      <div className='brand-carousel'>
        <Slider {...settings}>
        {images.map((image, index) => {
  const total = images.length;
  const startIndex = currentSlide % total;
  const endIndex = (startIndex + slidesToShow - 1) % total;

  let classNames = `brand-slide index-${index}`;

  // Optional: grey out edges
  if (index === startIndex || index === endIndex) {
    classNames += ' greyed';
  }

  return (
    <div key={index} className={classNames}>
      <img src={image} alt={`brand-${index}`} />
    </div>
  );
})}

        </Slider>
      </div>
      <button>SEE ALL BRANDS</button>
    </div>
  )
}

export default Brand;
