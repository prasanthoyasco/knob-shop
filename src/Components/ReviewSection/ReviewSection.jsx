import React, { useState } from 'react';
import './ReviewSection.css';
import { User, User2Icon } from 'lucide-react';
import { PiUserFill } from 'react-icons/pi';
import { getReviewsByProduct, createOrUpdateReview } from '../../API/reviewApi';
import {  useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function ReviewSection() {
  const location = useLocation();
  const [reviewImage, setReviewImage] = useState(null);

const handleImageChange = (e) => {
  setReviewImage(e.target.files[0]);
};

  const productId = location.pathname.split("/").pop();
  const [showTextArea, setShowTextArea] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [sortBy, setSortBy] = useState('Recent');
  const [reviewCount, setReviewCount] = useState(5);
  const [userId, setUserId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleCountChange = (e) => setReviewCount(Number(e.target.value));
  const handleStarClick = (rating) => setUserRating(rating);

  console.log("Params productId:", productId);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          setUserId(parsedUser.id);
          console.log("User ID:", parsedUser.id);
        } else {
          console.warn("User ID not found in stored data");
        }
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    if (productId) {
      getReviewsByProduct(productId)
        .then((data) => {
          setReviews(data);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
        });
    }
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!userId) {
      alert("You must be logged in to write a review.");
      return;
    }
    if (userRating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("rating", userRating);
      formData.append("comment", reviewText);
      if (reviewImage) {
        formData.append("image", reviewImage);
      }
  
      await createOrUpdateReview(productId, formData);
  
      const updatedReviews = await getReviewsByProduct(productId);
      setReviews(updatedReviews);
  
      setUserRating(0);
      setReviewText("");
      setReviewImage(null);
      setShowTextArea(false);
    } catch (error) {
      console.error("Error creating/updating review:", error);
      alert("Something went wrong while submitting your review.");
    }
  };
  
  
  const filteredReviews = reviews
  .filter((review) => {
    if (!review.createdAt) return false; // skip if date is missing

    const reviewDate = new Date(review.createdAt);
    const now = new Date();
    const diffInMs = now - reviewDate;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;

    switch (sortBy) {
      case "1 day ago":
        return diffInMs <= oneDay;
      case "1 week ago":
        return diffInMs <= oneWeek;
      case "1 month ago":
        return diffInMs <= oneMonth;
      case "1 year ago":
        return diffInMs <= oneYear;
      default: // "Recent" or any other value
        return true;
    }
  })
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // latest first

const visibleReviews = filteredReviews.slice(0, reviewCount);
const averageRating =
  visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length || 0;
  // const visibleReviews = reviews.slice(0, reviewCount);
  // const averageRating =
  //   visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length || 0;

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
            className={`write-review ${showTextArea ? 'no-decoration' : 'underline'}`}
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
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <textarea placeholder="Text Your Comment" className="comment-box" value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}>
                </textarea>
                <button onClick={handleSubmitReview} className="submit-review-btn">
                Submit Review
              </button>
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
                        <img src={review.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"} alt="profile" className="profile-img" />
                        <div className="profile-info">
                          <div className="profile-name">{review.user?.name || "Anonymous"}</div>
                        </div>
                      </div>
                      <div className="review-date">{new Date(review.createdAt).toLocaleDateString()}</div>
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
