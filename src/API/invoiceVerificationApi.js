import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URI}/invoices`;

export const getInvoiceVerification = async (orderId) => {
  const response = await axios.get(`${BASE_URL}/${orderId}`);
  return response.data;
};

export const getInvoicePdfUrl = (orderId) => `${BASE_URL}/${orderId}/pdf`;

export const downloadInvoicePdf = async (orderId) => {
  const response = await axios.get(`${BASE_URL}/${orderId}/pdf`, {
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${orderId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
