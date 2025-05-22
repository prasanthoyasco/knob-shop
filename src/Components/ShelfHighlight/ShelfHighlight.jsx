import React from 'react';
import shelfImage from '../../Assets/wood-shelf.png'; // adjust the path as needed
import './ShelfHighlight.css'; // optional for additional styles

const ShelfHighlight = () => {
  return (
    <div className="container-fluid pt-3 bg-light-blue">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Text Content */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h2 className="fw-bold display-6">WOOD SHELF</h2>
            <p className="lead text-muted">
              With its smooth and neat finish, the Book Shelf facilitates easy cleaning and maintenance.
            </p>
            <button className=" ctn px-4 py-2 mt-3 text-uppercase">
              Similar Products
            </button>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src={shelfImage}
              alt="Wood Shelf"
              className="img-fluid shelf-highlight-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelfHighlight;
