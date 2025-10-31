import React, { useEffect, useState } from "react";
import { getAllofferProducts } from "../API/CouponApi";
import lockerBg from "../Assets/CategoriesImge/image.jpg";
import CategoryPageLayout2 from "../Components/CategoryPageLayout2/CategoryPageLayout2";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import CategoryHero from "../Components/CategoryHero/CategoryHero";
import Footer from "../Components/Footer/Footer";
import CategoriesBanner from "../Components/CategoriesPage/CategoriesBanner/CategoriesBanner";
import { useLocation } from "react-router-dom";

const OfferProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchOfferProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllofferProducts();

        const extractedProducts = (data.products || [])
          .map((coupon) => coupon.product)
          .filter(Boolean);

        setProducts(extractedProducts);
      } catch (error) {
        console.error("Error fetching offer products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferProducts();
  }, []);

  // ✅ Decide title based on param
  const categoryTitle =
    location.pathname === "/offer/todaysdeal"
      ? "Today's Deal"
      : "Deal Of the Day";

  return (
    <>
      <NavbarTop />
      {products?.length > 0 ? (
        <>
          {" "}
          <CategoryHero
            categoryTitle={categoryTitle}
            backgroundImage={lockerBg}
          />
          <div className="my-5">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <CategoryPageLayout2 products={products} />
            )}
          </div>{" "}
        </>
      ): <>
      <div className="mx-auto my-4 py-5 text-center">
        <h1 className="h1 fw-bold">We don't have any deals Today</h1>
      <p>Connect with our CONSULTATION </p>
      </div>
      </>}

      <CategoriesBanner />
      <Footer />
    </>
  );
};

export default OfferProducts;
