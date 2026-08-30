import React, { useRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import CategoryHero from "../Components/CategoryHero/CategoryHero";
import SingleCarosal from "../Components/singleCarosal/SingleCarosal";
import RelatedProductsSection from "../Components/RelatedProductsSection/RelatedProductsSection";
import Footer from "../Components/Footer/Footer";
import CategoriesBanner from "../Components/CategoriesPage/CategoriesBanner/CategoriesBanner";
import { getEssentials } from "../API/essentialApi";

const EssentailsDetailsSubpage = () => {
  const { name } = useParams();
  const { state } = useLocation();
  const bannerRef = useRef(null);

  const [essentials, setEssentials] = useState(null);
  const [card, setCard] = useState(null);

  function deslugify(slug) {
    return slug.replace(/-/g, " ");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEssentials();
        if (Array.isArray(data) && data.length > 0) {
          setEssentials(data[0]);
          console.log("Fetched essentials data:", data[0]);
          console.log("Fetched essentials name:", name);
          
          const match = data[0].cards.find(
            (c) =>
              c.title.toLowerCase() === deslugify(name).toLowerCase() ||
              c._id === state?.id
          );
          console.log("Fetched essentials match:",match);
          setCard(match || null);
        }
      } catch (error) {
        console.error("Failed to fetch essentials:", error);
      }
    };
    fetchData();
  }, [name, state]);

  if (!card) return null; // or add a loader

  return (
    <>
      <NavbarTop />
      <CategoryHero
        categoryTitle={card.title}
        count={card.products?.length || 0}
        backgroundImage={card.bgImage}
      />
      <SingleCarosal bannerRef={bannerRef} sliders={card.sliders || []} />
      <RelatedProductsSection
       products={card.products || []}
        categoryId={card.categories?.[0]}
        Title={card.title}
      />
      <CategoriesBanner ref={bannerRef} />
      <div className="mt-4" />
      <Footer />
    </>
  );
};

export default EssentailsDetailsSubpage;
