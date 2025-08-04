import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/auth`;

export const Login = async () => {
    const res = await axios.post(`${BASE_URL}/user/login`);
    return res.data;
};

export const Signup = async () => {
    const res = await axios.post(`${BASE_URL}/user/signup`);
    return res.data;
};

export const checkUser = async ({ email, phone }) => {
  const query = email ? `email=${email}` : `phone=${phone}`;
    const res = await axios.get(`${BASE_URL}/check?${query}`);
    return res.data;
};