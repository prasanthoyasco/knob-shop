import React,{useState,useEffect} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard'; // update the path accordingly
import {getAllProducts} from '../../API/productApi'
const RelatedProductsSection = ({ products = [] }) => {
  const sliderRef = React.useRef(null);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await getAllProducts();
        console.log("All products Details : ",res)
        setAllProduct(res); // adjust if your API shape differs

      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchAllProduct();
  }, []);
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
          className="d-flex overflow-auto gap-3 px-3 px-md-5 related-product"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
{allProduct?.map((product, i) => {
  const formattedProduct = {
    id: product?._id,
    title: product?.name,
    price: product?.price || product?.variant?.[0]?.sizes?.[0]?.sellingPrice,
    oldPrice: product?.compare_price || product?.variant?.[0]?.sizes?.[0]?.mrp,
    discount: product?.discount?.value || "",
    rating: product?.rating ?? 4.5, // fallback if no rating
    image: product?.images?.[0],
    icons: product?.key_features,
    hoverImage: product.images?.[1] || product.images?.[0],
  };

  return (
    <div key={i} className="product-scroll-item">
      <ProductCard product={formattedProduct} />
    </div>
  );
})}

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
