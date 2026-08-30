import './CategoryHero.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategoryById } from '../../API/categoriesApi'; // adjust the path as needed

const CategoryHero = ({ count = 0, backgroundImage, categoryTitle: propTitle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId, query } = useParams();

  const [fetchedCategory, setFetchedCategory] = useState(null);

  const category = location.state?.category || fetchedCategory;
  const productState = location.state?.product;
  const searchQuery = new URLSearchParams(location.search).get("query") || query;

  // 🧩 Fetch category only when needed
  useEffect(() => {
    if (!location.state?.category && categoryId && categoryId !== "search" && categoryId !== "all-products") {
      getCategoryById(categoryId)
        .then((res) => setFetchedCategory(res))
        .catch((err) => console.error("Failed to fetch category", err));
    }
  }, [categoryId, location.state?.category]);

  // 🧠 Compute title and banner dynamically
  const bannerImage =
    category?.bannerImageUrl || category?.image || backgroundImage;

  const categoryTitle =
    // Priority: search query > propTitle > category name > fallback
    searchQuery
      ? `Search results for "${searchQuery}"`
      : propTitle ||
        category?.category_name ||
        productState?.text ||
        "Products";

  const productCount = category?.productCount || count || 0;

  // 🧭 Breadcrumb navigation structure
  const renderBreadcrumb = () => {
    if (searchQuery) {
      return (
        <>
          <span onClick={() => navigate('/')}>Home</span> /{" "}
          <span onClick={() => navigate('/products/search')}>Search</span> /{" "}
          <strong>{searchQuery}</strong>
        </>
      );
    }

    if (categoryId === "all-products") {
      return (
        <>
          <span onClick={() => navigate('/')}>Home</span> /{" "}
          <strong>All Products</strong>
        </>
      );
    }

    if (category) {
      return (
        <>
          <span onClick={() => navigate('/')}>Home</span> /{" "}
          <span onClick={() => navigate('/categories')}>Shop by Categories</span> /{" "}
          <strong>{category?.category_name}</strong>
        </>
      );
    }

    return (
      <>
        <span onClick={() => navigate('/')}>Home</span> / <strong>Products</strong>
      </>
    );
  };

  return (
    <div
      className="category-hero d-flex align-items-center justify-content-center text-white text-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="overlay"></div>

      <div className="content position-relative z-1 px-3">
        <p className="breadgrum text-uppercase small mb-2">
          {renderBreadcrumb()}
        </p>
        <h1 className="fw-semibold h1 text-capitalize">{categoryTitle}</h1>
        {productCount > 0 && (
          <p className="small mt-1">(items: {productCount})</p>
        )}
      </div>
    </div>
  );
};

export default CategoryHero;
