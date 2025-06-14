import React, { useState } from 'react';
import './ReviewSection.css';

function ReviewSection() {
  const [showTextArea, setShowTextArea] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [sortBy, setSortBy] = useState('Recent');
  const [reviewCount, setReviewCount] = useState(5);

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleCountChange = (e) => setReviewCount(Number(e.target.value));
  const handleStarClick = (rating) => setUserRating(rating);

  // Utility to get difference in days from today
  const getDaysDifference = (dateStr) => {
    const today = new Date();
    const reviewDate = new Date(dateStr.split('/').reverse().join('-')); // from dd/mm/yyyy to yyyy-mm-dd
    const diffTime = today - reviewDate;
    return diffTime / (1000 * 60 * 60 * 24);
  };

  const reviews = [
    {
      id: 1,
      name: 'Jessie Collins',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      comment: 'Fast delivery and setup was surprisingly easy. The instructions were clear, and I had it working in under 20 minutes. The features are impressive for the price. Fingerprint, PIN, and app unlock all work flawlessly.',
      date: '10/6/2025',
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 3,
      comment: 'Great product! The lock responds quickly and the fingerprint sensor works every time without fail. Love the convenience of this smart lock. I no longer worry about forgetting keys when I leave home.',
      date: '9/6/2025',
    },
    {
      id: 3,
      name: 'Anjali Sharma',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4,
      comment: 'Very happy with the build quality and the design. It looks sleek and modern on my front door. Battery life is solid so far. After 2 months of daily use, it’s still going strong without needing a recharge.',
      date: '8/6/2025',
    },
    {
      id: 4,
      name: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      rating: 5,
      comment: 'I had a few issues initially connecting it to the app, but customer support helped and now it works perfectly. Installation was straightforward, even for someone with no experience. The lock feels secure and premium.',
      date: '5/6/2024',
    },
  ];

  // Filter and sort by date
  const filteredReviews = reviews
    .filter((review) => {
      const daysAgo = getDaysDifference(review.date);
      if (sortBy === '1d') return daysAgo <= 1;
      if (sortBy === '7d') return daysAgo <= 7;
      if (sortBy === '365d') return daysAgo <= 365;
      return true; // "Recent"
    })
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')))
    .slice(0, reviewCount);

  return (
    <div className="review-section-container">
      <div className="review-select-box-container">
        <select className="recent-select-box" value={sortBy} onChange={handleSortChange}>
          <option value="Recent">Recent</option>
          <option value="1d">Last 1 Day</option>
          <option value="7d">Last 7 Days</option>
          <option value="365d">Last 1 Year</option>
        </select>
        <select className="days-select-box" value={reviewCount} onChange={handleCountChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>5</option>
        </select>
      </div>

      {filteredReviews.map((review) => (
        <div key={review.id} className="review-container">
          <div className="review-left">
            <div className="review-rating-section">
              <div className="average-rating">
                <span className="rating-number">{review.rating.toFixed(1)}</span>
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
                      {Math.floor(review.rating) === star && <div className="filled" />}
                    </div>
                    <span>{Math.floor(review.rating) === star ? 1 : 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="review-right">
            <div className="review-box">
              <div className="profile-section">
                <div className="profile-image-and-name-div">
                  <img src={review.image} alt="profile" className="profile-img" />
                  <div className="profile-info">
                    <div className="profile-name">{review.name}</div>
                  </div>
                </div>
                <div className="review-date">{review.date}</div>
              </div>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i
                    key={s}
                    className={`bi ${
                      s <= Math.floor(review.rating)
                        ? 'bi-star-fill'
                        : s - review.rating < 1
                        ? 'bi-star-half'
                        : 'bi-star'
                    }`}
                  ></i>
                ))}
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}

      <div
        className="write-review"
        onClick={() => setShowTextArea(!showTextArea)}
        style={{ cursor: 'pointer' }}
      >
        Write a review
      </div>

      {showTextArea && (
        <div className="review-form">
          <div className="rating-stars-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`bi ${star <= userRating ? 'bi-star-fill' : 'bi-star'}`}
                onClick={() => handleStarClick(star)}
              ></i>
            ))}
          </div>
          <textarea placeholder="Text Your Comment" className="comment-box"></textarea>
        </div>
      )}
    </div>
  );
}

export default ReviewSection;
