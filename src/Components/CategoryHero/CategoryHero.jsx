import './CategoryHero.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategoryById } from '../../API/categoriesApi'; // adjust the path as needed

const CategoryHero = ({count, backgroundImage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  console.log(categoryId);
  

  const [fetchedCategory, setFetchedCategory] = useState(null);

  const category = location.state?.category || fetchedCategory;
  const productState = location.state?.product;

  useEffect(() => {
    if (!location.state?.category && categoryId) {
      // Fetch category only if not passed via location.state
      getCategoryById(categoryId)
        .then((res) => setFetchedCategory(res))
        .catch((err) => console.error("Failed to fetch category", err));
    }
  }, [categoryId, location.state?.category]);

  const bannerImage = category?.bannerImage || category?.image || backgroundImage;
  const categoryTitle = category?.category_name || productState?.text || "Category";
  const productCount = category?.productCount || count ||  0;

  return (
    <div
      className="category-hero d-flex align-items-center justify-content-center text-white text-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="overlay"></div>

      <div className="content position-relative z-1 px-3">
        <p className="breadgrum text-uppercase small mb-2">
          <span onClick={()=>navigate('/')}>Home</span> / <span onClick={()=>navigate('/categories')}>Shop by Categories</span> / {categoryTitle}
        </p>
        <h1 className="fw-semibold h1">{categoryTitle}</h1>
        <p className="small mt-1">{productCount}</p>
      </div>
    </div>
  );
};

export default CategoryHero;
