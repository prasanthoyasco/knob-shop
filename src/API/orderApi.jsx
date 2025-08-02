import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/order`;

export const createOrderWithShipping = async (orderData) => {
    const res = await axios.post(`${BASE_URL}`, orderData);
    return res.data;
  };
  
