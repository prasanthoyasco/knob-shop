import React,{useState,useEffect} from 'react';
import shelfImage from '../../Assets/wood-shelf.png'; // adjust the path as needed
import './ShelfHighlight.css'; // optional for additional styles
import { useNavigate } from 'react-router-dom';
import { getShelves } from "../../API/shelfApi";
import Slider from "react-slick";
const ShelfHighlight = () => {
  const [shelves, setShelves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const data = await getShelves();
        if (data && data.data) {
          setShelves(data.data); // ✅ use "data" key from API response
          console.log("shelf data : ",data.data)
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,            // controls how fast the slide moves
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,   // time before moving to next slide
    arrows: true,
    fade: false,           // ❌ disable fade so slides move from right
    cssEase: "ease-in-out" // smooth slide motion
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
      <div className="shelf-overlay">
      <div className="container">
        <div className="row align-items-center flex justify-content-center" data-aos="fade-right"  data-aos-delay='100'>
          {/* Left Text Content */}
          <div className="col-md-6 text-center text-md-center mb-4 mb-md-0 text-white">
            <h2 className="fw-bold display-6 text-white">{shelf.heading}</h2>
            <p className="lead text-white">
            {shelf.content}
            </p>
            <button className="shelf-ctn px-4 py-2 mt-3" onClick={() => navigate('/categories')}>
            {shelf.buttonText}
            </button>
          </div>

          {/* Right Image */}
          {/* <div className="col-md-6 text-center shelf-background-image" data-aos="fade-left"  data-aos-delay='150'>
            <img
              src={shelfImage}
              alt="Wood Shelf"
              className="img-fluid shelf-highlight-image"
            />
          </div> */}
        </div>
        </div>
      </div>
    </div>
    </div>
            ))}
    </Slider>
    </div>

  );
};

export default ShelfHighlight;
