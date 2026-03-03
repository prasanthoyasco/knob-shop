import axios from "axios";
const API_BASE = `${import.meta.env.VITE_API_BASE_URI}/coupons`;
/**
 * Create a new coupon (Admin only)
 * @param {Object} couponData - { code, discountType, discountValue, expiryDate, usageLimit }
 */
export const createCoupon = async (couponData) => {
  try {
    const { data } = await axios.post(API_BASE, couponData);
    return data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create coupon" };
  }
};

/**
 * Fetch all available coupons for the logged-in user
 */
export const getAvailableCoupons = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get(`${API_BASE}/available`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.coupons;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch available coupons" };
  }
};


/**
 * Validate and apply a coupon for a user
 * @param {string} userId - Logged in user's ID
 * @param {string} couponCode - Coupon code entered by user
 */
export const validateCoupon = async (userId, couponCode) => {
  try {
    const token = localStorage.getItem("authToken");
    const { data } = await axios.post(`${API_BASE}/validate`, {
      userId,
      couponCode,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw err.response?.data || { message: "Coupon validation failed" };
  }
};

/**
 * Mark a coupon as used (after successful payment)
 * @param {string} code - Coupon code
 */
export const markCouponUsed = async (code) => {
  try {
    const token = localStorage.getItem("authToken");
    const { data } = await axios.post(`${API_BASE}/mark-used`, { code }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to mark coupon as used" };
  }
};


export const getAllofferProducts = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/all`);
    return data;
  } catch (err) {
    throw err.response?.data || { message: "faild to fetch Offer Products" }
  }
}