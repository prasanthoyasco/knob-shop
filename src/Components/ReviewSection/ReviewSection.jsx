import React, { useState } from 'react';
import './ReviewSection.css';
import { User, User2Icon } from 'lucide-react';
import { PiUserFill } from 'react-icons/pi';

function ReviewSection() {
  const [showTextArea, setShowTextArea] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [sortBy, setSortBy] = useState('Recent');
  const [reviewCount, setReviewCount] = useState(5);

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleCountChange = (e) => setReviewCount(Number(e.target.value));
  const handleStarClick = (rating) => setUserRating(rating);

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

  const visibleReviews = reviews.slice(0, reviewCount);
  const averageRating =
    visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length || 0;

  const groupedReviews = {};
  [5, 4, 3, 2, 1].forEach((star) => {
    groupedReviews[star] = visibleReviews.filter(
      (review) => Math.floor(review.rating) === star
    );
  });

  return (
    <div className="review-section-container">
      <div className="review-select-box-container">
        <select className="recent-select-box" value={sortBy} onChange={handleSortChange}>
          <option>Recent</option>
          <option>1 day ago</option>
          <option>1 weeks ago</option>
          <option>1 years ago</option>
        </select>
        <select className="days-select-box" value={reviewCount} onChange={handleCountChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>5</option>
        </select>
      </div>

      <div className="review-container">
        <div className="review-left">
          <div className="review-rating-section">
            <div className="average-rating">
              <span className="rating-number">{averageRating.toFixed(1)}</span>
              <span className="out-of">/5</span>
              <div className="review-count">({visibleReviews.length} Reviews)</div>
            </div>

            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = groupedReviews[star].length;
                return (
                  <div className="rating-row" key={star}>
                    <span className="star-label">
                      {star}
                      <i className="bi bi-star-fill ms-1"></i>
                    </span>
                    <div className="bar">
                      {count > 0 && (
                        <div className="filled" style={{ width: `${count * 20}%` }} />
                      )}
                    </div>
                    <span className='d-flex align-items-center gap-1'><PiUserFill/>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

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

        <div className="review-right">
          {[5, 4, 3, 2, 1].map((star) => (
            groupedReviews[star].length > 0 && (
              <div key={star} className="review-group">
                {groupedReviews[star].map((review) => (
                  <div className="review-box" key={review.id}>
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
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewSection;
