import React from 'react'
import './ReviewSection.css'
function ReviewSection() {
  return (
    <div className='review-section-container'>
      <div className='review-select-box-container'>
        <select className='recent-select-box'>
            <option>Recent</option>
            <option>1 day ago</option>
            <option>1 weeks ago</option>
            <option>1 years ago</option>
        </select>
        <select className='days-select-box'>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
        </select>       
      </div>
      <div className="review-container">
      <div className="review-left">
        <div className='review-rating-section'>
        <div className="average-rating">
          <span className="rating-number">4.5</span>
          <span className="out-of">/5</span>
          <div className="review-count">(1 Review)</div>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map((star) => (
            <div className="rating-row" key={star}>
              <span className="star-label">
                {star}
                <i className="bi bi-star-fill ms-1"></i>
              </span>
              <div className="bar">
                {star === 5 && <div className="filled" />}
              </div>
              <span>{star === 5 ? 1 : 0}</span>
            </div>
          ))}
        </div>
        </div>
      <div className="write-review">Write a review</div>
      </div>

      <div className="review-right">
        <div className="review-box">
          <div className="profile-section">
            <div className='profile-image-and-name-div'>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="profile-img"
            />
            <div className="profile-info">
              <div className="profile-name">Jessie Collins</div>
            </div>
            </div>
            <div className="review-date">
                10/5/2024
            </div>
          </div>
          <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
          <p className="review-text">
          Great smart lock! Easy to install, works smoothly with fingerprint, PIN, and app. Solid build and stylish look. The app tracking is a bonus. Worth it for smart home security!
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ReviewSection
