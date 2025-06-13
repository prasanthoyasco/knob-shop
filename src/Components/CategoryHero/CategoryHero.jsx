import './CategoryHero.css';
import { useLocation } from 'react-router-dom';
const CategoryHero = ({ title, count, backgroundImage }) => {
  const location = useLocation()
  const product = location.state?.product;
  return (
    <div
      className="category-hero d-flex align-items-center justify-content-center text-white text-center"
      style={{ backgroundImage: `url(${product.image})` }}
    >
      <div className="overlay"></div>

      <div className="content position-relative z-1 px-3">
        <p className=" breadgrum text-uppercase small mb-2">
          Home / Shop by Categories / {title}
        </p>
        <h1 className="fw-semibold h1">{product.text}</h1>
        <p className="small mt-1">{product.items}</p>
      </div>
    </div>
  );
};

export default CategoryHero;
