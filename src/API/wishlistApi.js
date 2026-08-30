import axios from 'axios'
const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/wishlist`;

export const addToWishlist = async ({ userId, productId }) => {
  const res = await axios.post(`${BASE_URL}/add`, { userId, productId });
  return res.data;
};

export const getWishlist = async (userId) => {
  const res = await axios.get(`${BASE_URL}/get/${userId}`);
  return res.data;
};

export const removeFromWishlist = async ({ userId, productId }) => {
  console.log("Removing from wishlist:", { userId, productId });
  if (!userId || !productId) {
    throw new Error("User ID and Product ID are required to remove from wishlist.");
  }
  const res = await axios.delete(`${BASE_URL}/delete/${userId}/${productId}`);
  return res.data;
};
