import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/cart-share`;

export const shareCart = async (items) => {
  const { data } = await axios.post(`${BASE_URL}/share-cart`, { items });
  return data;
};

export const getSharedCart = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/${token}`);
  return data;
};
