import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/user/auth`;

export const Login = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Network error" };
  }
};

export const Signup = async ( payload) => {
    const res = await axios.post(`${BASE_URL}/signup`, payload);
    return res.data;
};

export const checkUser = async ({ email, phone }) => {
  const query = email ? `email=${email}` : `phone=${phone}`;
    const res = await axios.get(`${BASE_URL}/check?${query}`);
    return res.data;
};
export const getUserById = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}`);
    return res.data; // contains { user: { ... } }
  } catch (err) {
    throw err.response?.data || { error: "Failed to fetch user" };
  }
};

export const updateUser = async (id, payload) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Update failed" };
  }
};
