import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/categories`;

export const fetchCategories = async () => {
    const res = await axios.get(`${BASE_URL}`);
    console.log("Response from category api:",res)
    return res.data;
  };

  export const getCategoryById = async (id) => {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    };