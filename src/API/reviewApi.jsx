import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/reviews`;

export const getReviewsByProduct = async (productId) => {
  const res = await axios.get(`${BASE_URL}/${productId}`);
  return res.data.reviews; // backend returns { reviews: [...] }
};

export const createOrUpdateReview = async (productId, reviewData) => {
  const res = await axios.post(`${BASE_URL}/${productId}`, reviewData);
  return res.data;
};
