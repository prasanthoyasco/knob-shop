import axios from "axios";

// Base URL points to your backend API
const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/track/track-shipment`;

export const trackShipment = async (consignmentNumber) => {
  try {
    // Call your backend, not DTDC directly
    const response = await axios.post(
      BASE_URL,
      { consignmentNumber }, // send consignmentNumber to your backend
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // same JSON response as DTDC
  } catch (error) {
    console.error(
      "Error tracking shipment via backend:",
      error.response?.data || error.message
    );
    throw error;
  }
};
