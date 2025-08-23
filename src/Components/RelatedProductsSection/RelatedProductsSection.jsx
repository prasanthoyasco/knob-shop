import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "../../API/productApi";
const RelatedProductsSection = () => {
  const sliderRef = React.useRef(null);
  const [Loading,setLoading] = useState(false)
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      setLoading(true)
      try {
        const res = await getAllProducts();
        const { data } = res;
        setAllProduct(data)
      } catch (err) {
        console.error("Failed to fetch product", err);
      }finally{
        setLoading(false)
      }
    };

    fetchAllProduct();
  }, []);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  if(Loading){
    return(<></>)
  }

  return (
    <div className="mt-3 mb-4 my-md-5">
      <h4 className="fw-semibold mb-4 text-center">You may also like</h4>

      <div className="position-relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="btn btn-light position-absolute top-50 translate-middle-y shadow-sm d-none d-md-flex align-items-center"
          style={{
            zIndex: 10,
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            left: 10,
            backgroundColor:"black",
          }}
        >
          <ChevronLeft size={30} color="white"/>
        </button>

        {/* Scrollable Row */}
        <div
          ref={sliderRef}
          className="d-flex overflow-auto gap-3 px-3 px-md-5 related-product"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {allProduct?.map((product, i) => {
            const hasKeyFeatures = Array.isArray(product?.key_features) && product.key_features.length > 0;
            const formattedProduct = {
              id: product?._id,
              title: product?.name,
              price: product?.price,
              oldPrice: product?.compare_price,
              variant: product.variant,
              discount: product?.discount?.value,
              rating: product?.rating ?? 4.5, 
              image: product?.images?.[0],
              ...(hasKeyFeatures && { icons: product.key_features }),
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
          style={{
            zIndex: 10,
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            right: 10,
            backgroundColor:"black",
          }}
        >
          <ChevronRight size={30} color="white"/>
        </button>
      </div>
    </div>
  );
};

export default RelatedProductsSection;
