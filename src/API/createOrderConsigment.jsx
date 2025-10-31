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
  let cleaned = String(phone).replace(/\D/g, ""); // remove everything except digits
  if (cleaned.length > 10 && cleaned.startsWith("91")) {
    cleaned = cleaned.slice(2);
  }
  cleaned = cleaned.slice(-10); // last 10 digits only
  if (cleaned.length !== 10) return "0000000000";
  return cleaned;
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

    if (!validStreet || !validCity || !validState) {
      throw new Error("Invalid shipping address.");
    }

    // Format cart items
    const formattedItems = cartItems.map((item) => ({
      item_name: item.name,
      item_quantity: item.quantity,
      item_price: item.price,
      item_sku: item.sku || item._id || "SKU123", // fallback SKU
    }));

    const formattedDeclaredValue = `${Number(totalAmount).toFixed(2)}`;

    const payload = {
      consignments: [
        {
          customer_code: import.meta.env.VITE_DTDC_CUSTOMER_CODE,
          service_type_id: "B2C SMART EXPRESS",
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
          length: String(dimensions.length < 2 ? 10 : dimensions.length),
          width: String(dimensions.width < 2 ? 10 : dimensions.width),
          height: String(dimensions.height < 2 ? 10 : dimensions.height),
          weight_unit: "kg",
          weight: String((dimensions.weight/1000).toFixed(2) <= 0 ? 1 : (dimensions.weight/1000).toFixed(2)), // convert grams to kg, min 1kg

          // ✅ Properly formatted declared value
          declared_value: formattedDeclaredValue,

          eway_bill: ewayBill || "N/A",
          invoice_number: invoiceNo || _id,
          invoice_date: invoiceDate
            ? new Date(invoiceDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          num_pieces: "1",

          origin_details: {
            name: "knobsshop",
            phone: normalizePhone("7092466600"),
            alternate_phone: normalizePhone("04222550744"),
            address_line_1: "746 747, Mettupalayam Rd, R.S. Puram",
            address_line_2: "Coimbatore, Tamil Nadu",
            pincode: "641038",
            city: "Coimbatore",
            state: "TamilNadu",
          },

          destination_details: {
            name: fallback(shippingAddress.name, "Receiver"),

            // ✅ Phone normalization
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
            email: fallback(shippingAddress.email,shippingAddress.email),
            state: validState,
          },

          customer_reference_number: _id,
          cod_collection_mode: "",
          cod_amount: "",
          commodity_id: "42",
          reference_number: "",
        },
      ],
    };

    console.log("📦 Final Payload to Send to DTDC:", payload);
    // https://dtdcapi.shipsy.io/api/customer/integration/consignment/softdata (live)
    // test: https://alphademodashboardapi.shipsy.io/api/customer/integration/consignment/softdata
    // Endpoint: test URL for DTDC
    const response = await axios.post(  
      "https://dtdcapi.shipsy.io/api/customer/integration/consignment/softdata",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_DTDC_API_KEY,
        },
      }
    );

    console.log("📦 DTDC Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating DTDC consignment:", error.message);
    throw error;
  }
};
