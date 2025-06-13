import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard'; // update the path accordingly

const RelatedProductsSection = ({ products = [] }) => {
  const sliderRef = React.useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="mt-3 mb-4 my-md-5">
      <h4 className="fw-semibold mb-4 text-center">You may also like</h4>

      <div className="position-relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="btn btn-light position-absolute top-50 translate-middle-y shadow-sm d-none d-md-flex align-items-center"
          style={{ zIndex: 10, borderRadius: '50%',height:'50px',width:'50px',left:10 }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Row */}
        <div
          ref={sliderRef}
          className="d-flex overflow-auto gap-3 px-3 px-md-5"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product, i) => (
            <div key={i} className='product-scroll-item'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="btn btn-light position-absolute top-50 translate-middle-y shadow-sm d-none d-md-flex align-items-center"
          style={{ zIndex: 10, borderRadius: '50%',height:'50px',width:'50px',right:10 }}
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default RelatedProductsSection;
