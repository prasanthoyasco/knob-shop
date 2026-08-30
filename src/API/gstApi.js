import axios from "axios";

const RAPID_API_KEY = "482b251a62msh4859eb060f58367p106744jsnc8920f169fe5";
const RAPID_API_HOST = "gst-return-status.p.rapidapi.com";

/**
 * Fetches GST details for a given GSTIN number
 * @param {string} gstin - 15-digit GST number
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export const getGstDetails = async (gstin) => {
  if (!gstin || gstin.length !== 15) {
    return { success: false, error: "GST number must be 15 characters long" };
  }

  const url = `https://${RAPID_API_HOST}/free/gstin/${gstin}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
        "Content-Type": "application/json",
      },
    });

    if (!data?.data) {
      return { success: false, error: "Invalid GST response" };
    }

    const d = data.data;

    // Extract useful, formatted info
    const gstInfo = {
      gstin: d.gstin,
      tradeName: d.tradeName?.trim(),
      legalName: d.lgnm?.trim(),
      companyType: d.ctb,
      status: d.sts,
      registrationDate: d.rgdt,
      address: d.adr,
      stateJurisdiction: d.stj,
      centerJurisdiction: d.ctj,
      pinCode: d.pincode,
      businessNature: d.nba || [],
      companyCategory: d.compCategory,
      invoiceMandate: d.mandatedeInvoice,
      einvoiceStatus: d.einvoiceStatus,
      pan: d.pan,
      filingFrequency: d.fillingFreq,
      returns: d.returns || [],
      meta: d.meta || {},
    };

    return { success: true, data: gstInfo };
  } catch (err) {
    console.error("GST API Error:", err);
    return {
      success: false,
      error: err.response?.data?.message || "Failed to fetch GST details",
    };
  }
};
