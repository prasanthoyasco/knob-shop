import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/address/user`;

export const getAddressByUserId = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}`);
    return res.data; 
  } catch (err) {
    throw err.response?.data || { error: "Failed to fetch user" };
  }
};