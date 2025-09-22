import { useNavigate } from "react-router-dom";
import "./OurDesign.css"; 

const OurDesign = ({ rows }) => {
  const navigate = useNavigate()
  console.log(rows)
  function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces → -
    .replace(/[^\w\-]+/g, "")    // remove non-word chars
    .replace(/\-\-+/g, "-");     // collapse multiple -
}
  return (
    <div className="our-design-items-wrapper">
      {rows?.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`our-design-row ${
            rowIndex % 2 === 0 ? "row-normal" : "row-reverse"
          }`}
          
        >
          {row?.map((item, i) => (
            <div
              key={item.id}
              className={`our-design-container-image ${
                i === 0 ? "big" : "small"
              }`}
              style={{cursor:'pointer'}}
              onClick={()=> navigate(`/essentials-details/${slugify(item.header || item.title)}`,{ state: item })}
            >
              <img src={item.image || item.bgImage} alt={item.header} />
              <div className="overlay" />
              <div className="our-design-container-image-inside-text">
                <h3>{item.header || item.title }</h3>
                <p>{item.para || item.description}</p>
              </div>
            </div>
          ))}

          {/* Black Box for single-item row */}
          {/* {row.length === 1 && (
            <div className="black-box">
              <h1>AND MANY MORE ...</h1>
              <img
                src='/favIcon.png'
                alt="logo"
                style={{ filter: "contrast(0.5)" }}
              />
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default OurDesign;
