import axios from "axios";

// Remove non-ASCII characters and trim
const sanitizeASCII = (str) =>
  str ? str.replace(/[^\u0020-\u007E]/g, "").trim() : "";

// Fallback utility
const fallback = (value, fallbackValue) =>
  typeof value === "string" && value.trim() ? value.trim() : fallbackValue;

// Normalize phone number: remove +91, 91, or any non-digit chars
const normalizePhone = (phone) => {
  if (!phone) return "0000000000";
  let cleaned = String(phone).replace(/\D/g, ""); // keep only digits
  if (cleaned.length > 10 && cleaned.startsWith("91")) cleaned = cleaned.slice(2);
  cleaned = cleaned.slice(-10); // last 10 digits
  return cleaned.length === 10 ? cleaned : "0000000000";
};

// Core request sender
const sendDTDCRequest = async (payload, serviceType) => {
  const url =
    import.meta.env.VITE_MODE === "development"
      ? "https://alphademodashboardapi.shipsy.io/api/customer/integration/consignment/softdata"
      : "https://dtdcapi.shipsy.io/api/customer/integration/consignment/softdata";

  // Inject current service type
  payload.consignments[0].service_type_id = serviceType;

  const response = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      "api-key": import.meta.env.VITE_DTDC_API_KEY,
    },
  });

  return response.data;
};

export const createDTDCConsignment = async (orderData) => {
  try {
    const {
      _id,
      invoiceNo,
      invoiceDate,
      totalAmount,
      ewayBill,
      shippingAddress,
      cartItems,
      dimensions,
    } = orderData;

    const validStreet = sanitizeASCII(shippingAddress.street);
    const validCity = sanitizeASCII(shippingAddress.city);
    const validState = sanitizeASCII(shippingAddress.state);

    if (!validStreet || !validCity || !validState)
      throw new Error("Invalid shipping address.");

    const declaredValue =
      !isNaN(Number(totalAmount)) && Number(totalAmount) > 0
        ? Number(totalAmount).toFixed(2)
        : "100.00";

    const payload = {
      consignments: [
        {
          customer_code: import.meta.env.VITE_DTDC_CUSTOMER_CODE,
          service_type_id: "B2C SMART EXPRESS", // primary
          load_type: "NON-DOCUMENT",
          consignment_type: "Forward",
          description: cartItems
            .map(
              (item) =>
                `${
                  item?.title || item?.productName || item?.productId?.name
                } x${item.quantity}`
            )
            .join(", "),
          dimension_unit: "cm",
          length: String(dimensions?.length || 10),
          width: String(dimensions?.width || 10),
          height: String(dimensions?.height || 10),
          weight_unit: "kg",
          weight: String(
            Math.max(1, Number((dimensions?.weight || 1000) / 1000).toFixed(2))
          ),
          declared_value: declaredValue,
          eway_bill: ewayBill || "N/A",
          invoice_number: invoiceNo || _id,
          invoice_date: invoiceDate
            ? new Date(invoiceDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          num_pieces: "1",
          origin_details: {
            name: "KnobsShop",
            phone: normalizePhone("7092466600"),
            alternate_phone: normalizePhone("04222550744"),
            address_line_1: "746 747, Mettupalayam Rd, R.S. Puram",
            address_line_2: "Coimbatore, Tamil Nadu",
            pincode: "641038",
            city: "Coimbatore",
            state: "Tamil Nadu",
          },
          destination_details: {
            name: fallback(shippingAddress.name, "Receiver"),
            phone: normalizePhone(
              fallback(shippingAddress.phone, shippingAddress.alternate_phone)
            ),
            alternate_phone: normalizePhone(
              fallback(shippingAddress.alternate_phone, "0000000000")
            ),
            address_line_1: validStreet,
            address_line_2: "",
            pincode: shippingAddress.pincode,
            city: validCity,
            email: fallback(shippingAddress.email, "test@example.com"),
            state: validState,
          },
          customer_reference_number: `ORDER-${normalizePhone(shippingAddress.phone).slice(-5)}`,
          cod_collection_mode: "",
          cod_amount: "",
          commodity_id: "42",
          reference_number: "",
        },
      ],
    };

    console.log("📦 Sending to DTDC (B2C SMART EXPRESS):", payload);

    // Try primary service type
    let response = await sendDTDCRequest(payload, "B2C SMART EXPRESS");

    // Auto-retry if wrong input or NO_SERIES_AVAILABLE
    if (
      !response.success &&
      /NO_SERIES_AVAILABLE|WRONG_INPUT|SERIES/i.test(
        response?.message || response?.reason || ""
      )
    ) {
      console.warn("⚠️ Retrying with SMART EXPRESS...");
      response = await sendDTDCRequest(payload, "SMART EXPRESS");
    }

    console.log("📬 Final DTDC Response:", response);
    return response;
  } catch (error) {
    console.error(
      "❌ Error creating DTDC consignment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
