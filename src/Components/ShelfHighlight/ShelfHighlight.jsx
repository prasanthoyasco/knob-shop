import React, { useState, useEffect } from "react";
import shelfImage from "../../Assets/wood-shelf.png"; // adjust the path as needed
import "./ShelfHighlight.css"; // optional for additional styles
import { useNavigate } from "react-router-dom";
import { getShelves } from "../../API/shelfApi";
import Slider from "react-slick";
const ShelfHighlight = () => {
  const [shelves, setShelves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const data = await getShelves();
        console.log(data);
        if (data && data.data) {
          setShelves(data.data);
        }
      } catch (err) {
        console.error("Error fetching shelves:", err);
      }
    };
    fetchShelves();
  }, []);

  if (!shelves) {
    return <div className="text-center py-5">Loading...</div>;
  }
  const isSingle = shelves.length <= 1;
  const settings = {
    dots: !isSingle,
    infinite: !isSingle,
    autoplay: !isSingle,
    arrows: !isSingle,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
  };

  return (
    <div className="container-fluid mt-3 bg-light-blue p-0">
      <Slider {...settings}>
        {shelves.map((shelf) => (
          <div key={shelf._id} className="w-100">
            <div
              className="shelf-highlight-section"
              style={{ backgroundImage: `url(${shelf.imageUrl})` }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* <div className="shelf-overlay">
      <div className="container">
        <div className="row align-items-center flex justify-content-center" data-aos="fade-right"  data-aos-delay='100'>
          {/* Left Text Content 
          <div className="col-md-6 text-center text-md-center mb-4 mb-md-0 text-white">
            <h2 className="fw-bold display-6 text-white">{shelf.heading}</h2>
            <p className="lead text-white">
            {shelf.content}
            </p>
            <button className="shelf-ctn px-4 py-2 mt-3" onClick={() => navigate('/categories')}>
            {shelf.buttonText}
            </button>
          </div>
        </div>
        </div>
      </div> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShelfHighlight;
