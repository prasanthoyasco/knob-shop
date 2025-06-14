import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import './ProductImageSlider.css'
import { useSwipeable } from 'react-swipeable';

const ProductImageSlider = () => {
  const images = [
    'https://yaleonline.in/cdn/shop/products/3_81f1fa71-fe33-40c6-afa8-fc7243435f3f.jpg',
    'https://yaleonline.in/cdn/shop/products/21_57828a49-9545-4168-a2eb-b0a29dd50131.jpg',
    'https://yaleonline.in/cdn/shop/products/14_683d1601-6f39-4192-bf20-1d0f944faaa4.jpg',
    'https://yaleonline.in/cdn/shop/products/15_fe89450a-8fdd-462b-92be-4073db244414.jpg',
    'https://yaleonline.in/cdn/shop/products/16_db69c429-7a80-4a72-b3fd-06e4fd06b573.jpg',
    'https://yaleonline.in/cdn/shop/products/17_904527a7-a5a5-444a-9893-1e8b3b31d424.jpg',
    'https://yaleonline.in/cdn/shop/products/3_81f1fa71-fe33-40c6-afa8-fc7243435f3f.jpg',
    'https://yaleonline.in/cdn/shop/products/21_57828a49-9545-4168-a2eb-b0a29dd50131.jpg',
    'https://yaleonline.in/cdn/shop/products/14_683d1601-6f39-4192-bf20-1d0f944faaa4.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

   const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <div className="d-flex flex-column-reverse flex-md-row gap-3 position-relative">
      {/* Thumbnails */}
      <div
        className="d-flex flex-row flex-md-column align-items-center"
        style={{ maxHeight: 700 }}
      >
       
        {/* Arrow - Up (only visible on md+) */}
        <button
          onClick={handlePrev}
          className="btn d-none d-md-block w-100 mb-2"
          style={{borderRadius:0,background:'#EFEFEF',border:0}}
          disabled={currentIndex === 0}
        >
          <ChevronUp size={18} />
        </button>

        {/* Thumbnail List */}
        <div
          className="d-flex flex-row flex-md-column gap-2 overflow-auto"
          style={{
            maxHeight: 510,
            maxWidth: '100%',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              ref={(el) => (thumbnailRefs.current[i] = el)}
              src={img}
              alt={`Thumb ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`img-thumbnail ${currentIndex === i ? 'border border-dark' : ''}`}
              style={{
                width: 120,
                height: 120,
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: 4,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Arrow - Down (only visible on md+) */}
        <button
          onClick={handleNext}
           className="btn d-none d-md-block w-100 mt-2"
          style={{borderRadius:0,background:'#EFEFEF',border:0}}
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Main Image */}
      <div className="product-image position-relative text-center" {...swipeHandlers}>
        <img
          src={images[currentIndex]}
          alt="Main Product"
          className="img-fluid main-image"
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '700px',
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <button
          onClick={handlePrev}
          className="btn border-0 position-absolute p-2 top-50 translate-middle-y"
          style={{
            zIndex: 2,
            left: '10px',
            background: '#ffffff6b',
            borderRadius: 0,
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="btn border-0 position-absolute p-2 top-50 translate-middle-y"
          style={{
            zIndex: 2,
            right: '10px',
            background: '#ffffff6b',
            borderRadius: 0,
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductImageSlider;
