import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import CategoryPageLayout2 from "../CategoryPageLayout2/CategoryPageLayout2";
import Footer from "../Footer/Footer";
import CategoriesBanner from "../CategoriesPage/CategoriesBanner/CategoriesBanner";
import { getCategoryBySubpageType } from "../../API/categoriesApi";
import { fetchProductsByCategory } from "../../API/productApi";

export function Subpage() {
  const { brandName } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Convert brandName slug to proper subpageType
  const reverseLinkprof = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: get category by subpage type
        const subpageType = brandName; // Or slugify if needed
        console.log(subpageType);
        
        const categoryData = await getCategoryBySubpageType(subpageType);
console.log(categoryData);
        setCategory(categoryData);

        // Step 2: fetch products for that category
        if (categoryData?._id) {
          const productsData = await fetchProductsByCategory(categoryData._id);
          console.log(productsData.data);
          setProducts(productsData?.data);
        }
      } catch (err) {
        console.error("Error fetching category or products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brandName]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavbarTop />
      <div className="categories-page-container">
        <img
          src={category?.bannerImageUrl || "/fallback.png"}
          className="background-image"
        />
        <div className="categories-image-overlay"></div>
        <div className="categories-image-overlay-text">
          <p>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              HOME / {reverseLinkprof(brandName)}
            </span>
          </p>
          <h1>{reverseLinkprof(brandName)}</h1>
        </div>
      </div>

      <CategoryPageLayout2 products={products} categoryData={category} />
      <CategoriesBanner />
      <Footer />
    </>
  );
}
