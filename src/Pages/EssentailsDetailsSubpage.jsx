import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import CategoryHero from "../Components/CategoryHero/CategoryHero";
import lockerBg from "../Assets/CategoriesImge/image.jpg";
import SingleCarosal from "../Components/singleCarosal/SingleCarosal";
import RelatedProductsSection from "../Components/RelatedProductsSection/RelatedProductsSection";
import Footer from "../Components/Footer/Footer";
import CategoriesBanner from "../Components/CategoriesPage/CategoriesBanner/CategoriesBanner";

const EssentailsDetailsSubpage = () => {
  const { name } = useParams();
  const { state } = useLocation();

  function deslugify(slug) {
    return slug.replace(/-/g, " ");
  }

  const count = 0;
  const bannerRef = useRef(null); // ✅ create a ref

  return (
    <>
      <NavbarTop />
      <CategoryHero
        categoryTitle={deslugify(name)}
        count={count}
        backgroundImage={lockerBg}
      />
      <SingleCarosal bannerRef={bannerRef} /> {/* ✅ pass down ref */}
      <RelatedProductsSection Title={deslugify(name)} />
      <CategoriesBanner ref={bannerRef} /> {/* ✅ attach ref */}
      <div className="mt-4" />
      <Footer />
    </>
  );
};

export default EssentailsDetailsSubpage;
