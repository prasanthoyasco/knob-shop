import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/shelves`;

export const getShelves = async (productId) => {
  const res = await axios.get(`${BASE_URL}`);
  return res.data;
};

export const createShelf = async (data) => {
  const res = await axios.post(`${BASE_URL}/`, data);
  return res.data;
};
