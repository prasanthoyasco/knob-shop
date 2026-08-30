import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/cart`;

export const addProductToCart = async ({
  userId,
  productId,
  quantity = 1,
  colorName,
  colorCode,
  sizeLabel,
  mrp,
  discountPercentage,
  taxPercentage,
  sellingPrice,
  image,
  mode,
}) => {
  const res = await axios.post(`${BASE_URL}/add`, {
    userId,
    productId,
    quantity,
    colorName,

    colorCode,
    sizeLabel,
    mrp,
    discountPercentage,
    taxPercentage,
    sellingPrice,
    image,
    mode,
  });

  return res.data;
};

export const getCartByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/get/${userId}`);
  return res.data;
};
export const deleteCartItem = async ({
  userId,
  productId,
  colorCode,
  sizeLabel,
}) => {
  const res = await axios.delete(`${BASE_URL}/delete`, {
    data: { userId, productId, colorCode, sizeLabel },
  });
  return res.data;
};

export const clearCartAPI = async (userId) => {
  return axios.post(`${BASE_URL}/clear`, { userId });
};
