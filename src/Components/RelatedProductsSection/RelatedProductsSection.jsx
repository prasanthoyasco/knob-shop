import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import { fetchProductsByCategory, getAllProducts } from "../../API/productApi";

const RelatedProductsSection = ({  products = [], categoryId, Title }) => {
  console.log(categoryId);
  const sliderRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const Heading = Title ? Title +" Products" : "You may also like";

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        // Step 1: Check if a categoryId is provided
        if (products.length > 0) {
          // Directly use provided products
          console.log(products)
          setRelatedProducts(products);
        } else if (categoryId) {
          // Fetch by category
          const res = await fetchProductsByCategory(categoryId);
          setRelatedProducts(res.data);
        } else {
          // Fallback: random
          const res = await getAllProducts({ random: true, limit: 10 });
          setRelatedProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch related products", err);
        // Fallback to random products on error
        try {
          const randomProductsResponse = await getAllProducts({
            random: true,
            limit: 10,
          });
          setRelatedProducts(randomProductsResponse.data);
        } catch (fallbackErr) {
          console.error("Failed to fetch fallback products", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId]); // The effect now re-runs when the categoryId changes

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="mt-3 mb-4 my-md-5">
      <h4 className="fw-semibold mb-4 text-center text-capitalize">{Heading}</h4>

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
            backgroundColor: "black",
          }}
        >
          <ChevronLeft size={30} color="white" />
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
          {relatedProducts?.map((product, i) => {
            const hasKeyFeatures =
              Array.isArray(product?.key_features) &&
              product.key_features.length > 0;
            const formattedProduct = {
              id: product?._id,
              title: product?.name,
              price: product?.price,
              oldPrice: product?.compare_price,
              variant: product.variant,
              discount: product?.discount?.value,
              rating: product?.avgRating ?? 4.5,
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
            backgroundColor: "black",
          }}
        >
          <ChevronRight size={30} color="white" />
        </button>
      </div>
    </div>
  );
};

export default RelatedProductsSection;
