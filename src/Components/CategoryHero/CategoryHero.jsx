import './CategoryHero.css';
import { useLocation } from 'react-router-dom';
const CategoryHero = ({ title, count, backgroundImage }) => {
  const location = useLocation()
  const category = location.state?.category;
  const productState = location.state?.product;

  // Fallback values
  const bannerImage = category?.bannerImage || category?.image || backgroundImage;
  const categoryTitle = category?.category_name || productState?.text || title;
  const productCount = category?.productCount || count || 0;
  return (
    <div
      className="category-hero d-flex align-items-center justify-content-center text-white text-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="overlay"></div>

      <div className="content position-relative z-1 px-3">
        <p className=" breadgrum text-uppercase small mb-2">
          Home / Shop by Categories / {categoryTitle}
        </p>
        <h1 className="fw-semibold h1">{categoryTitle}</h1>
        <p className="small mt-1">{productCount}</p>
      </div>
    </div>
  );
};

export default CategoryHero;
