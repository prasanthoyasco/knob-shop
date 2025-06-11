import './CategoryHero.css';

const CategoryHero = ({ title, count, backgroundImage }) => {
  return (
    <div
      className="category-hero d-flex align-items-center justify-content-center text-white text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>

      <div className="content position-relative z-1 px-3">
        <p className=" breadgrum text-uppercase small mb-2">
          Home / Shop by Categories / {title}
        </p>
        <h1 className="fw-semibold h1">{title}</h1>
        <p className="small mt-1">({count} Items)</p>
      </div>
    </div>
  );
};

export default CategoryHero;
