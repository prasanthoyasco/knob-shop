import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/payment`;

export const initiateTransaction = async ( payload) => {
    const res = await axios.post(`${BASE_URL}/initiate`, payload);
    return res.data;
};