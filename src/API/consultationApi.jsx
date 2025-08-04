import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/consultation`;

export const createConsultation = async (consultation) => {
    const res = await axios.post(`${BASE_URL}`, consultation);
    return res.data;
  };
  
  export const getAllConsultations = async () => {
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
  };