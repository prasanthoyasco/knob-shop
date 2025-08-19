import axios from "axios";

// Remove non-ASCII characters and trim
const sanitizeASCII = (str) =>
  str ? str.replace(/[^\x00-\x7F]/g, "").trim() : "";

const fallback = (value, fallbackValue) =>
  typeof value === "string" && value.trim() ? value.trim() : fallbackValue;

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

    // Format the cart items
    const formattedItems = cartItems.map((item) => ({
      item_name: item.name,
      item_quantity: item.quantity,
      item_price: item.price,
      item_sku: item.sku || item._id || "SKU123", // fallback SKU
    }));

    const payload = {
      consignments: [
        {
          customer_code: import.meta.env.VITE_DTDC_CUSTOMER_CODE,
          service_type_id: "B2C PRIORITY",
          load_type: "NON-DOCUMENT",
          description: cartItems
            .map((item) => `${item.name} x${item.quantity}`)
            .join(", "),
          dimension_unit: "cm",
          length: String(dimensions.length),
          width: String(dimensions.width),
          height: String(dimensions.height),
          weight_unit: "kg",
          weight: String(dimensions.weight),
          declared_value: String(totalAmount),
          num_pieces: "1",
          product_code: "E",
          pieces: [
            {
              product_code: "E",
              items: formattedItems,
            },
          ],
          origin_details: {
            name: "knobsshop",
            phone: "917092466600",
            alternate_phone: "9123456789",
            address_line_1: "dummy sender",
            address_line_2: "",
            pincode: "110046",
            city: "New Delhi",
            state: "Delhi",
          },
          destination_details: {
            name: fallback(shippingAddress.name, "Receiver"),
            phone: fallback(shippingAddress.phone, "0000000000"),
            alternate_phone: fallback(
              shippingAddress.alternate_phone,
              "0000000000"
            ),
            address_line_1: validStreet,
            address_line_2: "",
            pincode: shippingAddress.pincode,
            city: validCity,
            state: validState,
          },
          return_details: {
            address_line_1: "Test_Address_Return",
            address_line_2: "Test_Address_Return line 2",
            city_name: "DELHI",
            name: "Test_Return",
            phone: "9876543212",
            pincode: "248001",
            state_name: "DELHI",
            email: "amisha.arora@test.co.in",
            alternate_phone: "9123456791",
          },
          customer_reference_number: _id,
          cod_collection_mode: "",
          cod_amount: "",
          commodity_id: "99",
          eway_bill: ewayBill,
          is_risk_surcharge_applicable: "false",
          invoice_number: invoiceNo,
          invoice_date: invoiceDate,
          reference_number: "",
        },
      ],
    };

    console.log("📦 Final Payload to Send to DTDC:", payload);

    const response = await axios.post(
      "https://alphademodashboardapi.shipsy.io/api/customer/integration/consignment/softdata",
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
