import React, { useState } from 'react';
import './ReviewSection.css';
import { User, User2Icon } from 'lucide-react';
import { PiUserFill } from 'react-icons/pi';
import { getReviewsByProduct, createOrUpdateReview } from '../../API/reviewApi';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ImageUploader from '../ImageUploader';
function ReviewSection() {
  const navigate = useNavigate();

  const location = useLocation();
  const [reviewImages, setReviewImages] = useState([]);

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
        if (parsedUser && parsedUser._id) {
          setUserId(parsedUser._id);
          console.log("User ID:", parsedUser._id);
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
          console.log("📥 Fetched Reviews:", data);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
        });
    }
  }, [productId]);

  const handleSubmitReview = async () => {
    if (userRating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }

    const reviewPayload = {
      userId,
      rating: userRating,
      comment: reviewText,
      image: reviewImages,
    };

    console.log("🚀 Creating Review Payload:", reviewPayload);

    try {
      const response = await createOrUpdateReview(productId, reviewPayload);

      console.log("✅ Review Create API Response:", response);

      const updatedReviews = await getReviewsByProduct(productId);

      console.log("📦 Updated Reviews After Create:", updatedReviews);

      setReviews(updatedReviews);

      // Reset form
      setUserRating(0);
      setReviewText("");
      setReviewImages([]);
      setShowTextArea(false);

    } catch (error) {
      console.error("❌ Error creating/updating review:", error);
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
  const handleClick = () => {
    if (!userId) {
      alert("You must be logged in to write a review.");
      navigate("/auth/login"); // redirect to login page
      return;
    }

    // If logged in → toggle textarea
    setShowTextArea(!showTextArea);
  };

  const handleVariantImagesAdded = (uploadedImagesData, hex) => {
    setColors((prev) =>
      prev.map((c) =>
        c.hex === hex
          ? { ...c, images: [...c.images, ...uploadedImagesData] }
          : c
      )
    );
  };
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
                    <span className='d-flex align-items-center gap-1'><PiUserFill />{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`write-review ${showTextArea ? 'no-decoration' : 'underline'}`}
            onClick={handleClick}
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
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Upload Variant Images
                </label>
                <ImageUploader
                  multiple={true}
                  onImageUpload={(uploadedImagesData) => {
                    const urls = uploadedImagesData.map((img) => img.url);

                    setReviewImages((prev) => [...prev, ...urls]);
                  }}
                />
              </div>
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
                          className={`bi ${s <= Math.floor(review.rating)
                            ? 'bi-star-fill'
                            : s - review.rating < 1
                              ? 'bi-star-half'
                              : 'bi-star'
                            }`}
                        ></i>
                      ))}
                    </div>
                    <p className="review-text">{review.comment}</p>
                    <div className="review-images">
                      {review.image && review.image.length > 0 ? (
                        review.image.map((imgUrl, index) => (
                          <img
                            key={index}
                            src={imgUrl}
                            alt={`review-${index}`}
                            className="profile-img"
                          />
                        ))
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                          alt="fallback"
                          className="profile-img"
                        />
                      )}
                    </div>
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
