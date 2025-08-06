import axios from 'axios'
const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/cart`;

export const addProductToCart = async ({ userId, productId, quantity = 1 }) => {
  const res = await axios.post(`${BASE_URL}/add`, { userId, productId, quantity });
  return res.data;
};

export const getCartByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/get/${userId}`);
  return res.data;
};

export const deleteCartItem = async (itemId) => {
  const res = await axios.delete(`${BASE_URL}/delete/${itemId}`);
  return res.data;
};
