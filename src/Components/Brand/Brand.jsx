import React, { useState } from "react";
import Slider from "react-slick";
import "./Brand.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import brand2 from '../../Assets/BrandLogos/dorset-logo.webp'
import brand3 from '../../Assets/Logo/New folder/Dorma-removebg-preview.png'
import brand4 from '../../Assets/Logo/New folder/Decor Point.png'
import brand5 from '../../Assets/Logo/New folder/Ebco.png'
import brand6 from '../../Assets/BrandLogos/gaze.png'
import brand7 from '../../Assets/Logo/New folder/Godrej-removebg-preview.png'
import brand8 from '../../Assets/Logo/New folder/Golden-removebg-preview.png'
import brand9 from '../../Assets/BrandLogos/haefele_logo.png'
import brand10 from '../../Assets/Logo/New folder/labacha-removebg-preview.png'
import brand11 from '../../Assets/BrandLogos/logo.svg.svg'
import brand12 from '../../Assets/BrandLogos/magnum-logo.png'
import brand13 from '../../Assets/Logo/New folder/Plus Point.png'
import brand14 from '../../Assets/BrandLogos/Sris-ma-fils-trademark-and-logo.png'
import brand15 from '../../Assets/brand3.png'
import colortex from '../../Assets/Logo/New folder/Color tek.png'
import hetachi from '../../Assets/Logo/New folder/Hettich-logo-sw.svg'
import ideal from '../../Assets/Logo/New folder/Ideal.png'
import { getAllProducts } from "../../API/productApi";
const images = [
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
  brand11,
  brand12,
  brand13,
  brand14,
  brand15,
];

const brandData = [
  { name: "Dorset", image: brand2, className: "dorset-size" },
  { name: "Dorma", image: brand3, className: "Dorma-size" },
  { name: "Decorpoint", image: brand4, className: "l2-black" },
  { name: "Ebco", image: brand5, className: "Ebco-color" },
  { name: "Gaze", image: brand6 },
  { name: "Godrej", image: brand7 },
  { name: "Golden", image: brand8, className: "Golden-size" },
  { name: "Haefele", image: brand9 },
  { name: "Labacha", image: brand10, className: "labacha-size" },
  { name: "Blum", image: brand11 },
  { name: "Magnum", image: brand12 },
  { name: "PlusPoint", image: brand13, className: "PlusPointWhite-color PlusPoint-size" },
  { name: "Sris-ma-fils", image: brand14,className:"Sris-ma-fils-trademark-and-logo-size" },
  { name: "Yale", image: brand15,className:"brand3" },
  { name: "Color tek", image: colortex },
  { name: "Hettich", image: hetachi },
  { name: "Ideal", image: ideal },
];
function Brand() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const handleBrandClick = (brand) => {
    navigate(`/products/brand/${brand.name}`, {
      state: {
        product: {
          text: brand.name,
          image: brand.image,
        },
      },
    });
  };

  const handleViewAll = async () => {
    try {
      const allProducts = await getAllProducts(); // API call
      navigate("/category/all-products", {
        state: {
          product: {
            productList: allProducts,
            text: "All Products",
          },
        },
      });
    } catch (error) {
      console.error("Failed to fetch all products", error);
    }
  };
  
  const slidesToShow =6; // default slidesToShow, same as in settings

  const settings = {
    dots: false,
    infinite: true,
    speed: 6000, // Long duration for smooth slide scroll
    autoplay: true,
    autoplaySpeed: 0, // No delay between slides
    cssEase: "linear", // Linear easing for continuous motion
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Helper to determine if a slide should be greyed out
  // We'll grey out the first and last visible slides:
  // So slides at currentSlide and currentSlide + slidesToShow - 1

  return (
    <div className="brands-container">
      <h5>TRUSTED BY TOP BRANDS</h5>
      <div className="brand-carousel">
        <Slider {...settings}>
          {brandData.map((brand, index) => {
            const { name, image } = brand;
            const total = brandData.length;
            const startIndex = currentSlide % total;
            const endIndex = (startIndex + slidesToShow - 1) % total;

            let classNames = `brand-slide index-${index}`;

            if (index === startIndex || index === endIndex) {
              classNames += " greyed";
            }
            if (brand.className) {
              classNames += ` ${brand.className}`;
            }

            return (
              <div
                key={index}
                className={classNames}
                onClick={() => handleBrandClick(brand)}
              >
                <img src={image} alt={`brand-${index}`} />
              </div>
            );
          })}
        </Slider>
      </div>
      <button onClick={handleViewAll}>SEE ALL BRANDS</button>
    </div>
  );
}

export default Brand;
