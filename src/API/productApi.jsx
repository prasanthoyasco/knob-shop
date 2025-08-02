import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/products`;


export const getAllProducts = async () => {
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
  };

  export const getProductById = async (id) => {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    };
    export const fetchProductsByCategory = async (categoryId) => {
        const res = await axios.get(`${BASE_URL}/category/${categoryId}`);
        return res.data;
      };
      export const getProductBroucher = async () => {
        const res = await axios.get(`${BASE_URL}/brochures`);
        return res.data;
      };
      export const getProductsByBrand = async (brandName) => {
        const res = await axios.get(`${BASE_URL}/brand/${brandName}`);
        return res.data;
      };
      export const searchProductsByParam = async (query) => {
        const res = await axios.get(`${BASE_URL}/search/${query}`);
        return res.data;
      };