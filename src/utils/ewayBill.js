    // utils/ewayBill.js
    import axios from "axios";

    export async function generateEwayBill(order) {
    try {
        const payload = {
        invoiceNumber: order.orderId,
        invoiceDate: new Date(order.createdAt).toLocaleDateString("en-IN"),
        fromGSTIN: "YOUR_GST_NUMBER",
        toGSTIN: order.gstNumber || "URP", // URP = Unregistered Person
        totalValue: order.totalAmount,
        dispatchFrom: {
            name: "Your Company",
            address: "Your Address",
            stateCode: "33", // Tamil Nadu for example
            pincode: "641008",
        },
        shipTo: {
            name: order.shippingAddress.name,
            address: order.shippingAddress.street,
            stateCode: "33", // must map state → code
            pincode: order.shippingAddress.pincode,
        },
        productDetails: order.items.map((item) => ({
            productName: item.productName,
            hsnCode: "YOUR_HSN_CODE",
            quantity: item.quantity,
            taxableAmount: item.total,
        })),
        };

        const res = await axios.post(
        `${process.env.GST_API}/ewaybill/generate`,
        payload,
        { headers: { Authorization: `Bearer ${process.env.GST_TOKEN}` } }
        );

        return res.data.ewayBillNumber;
    } catch (err) {
        console.error("EWay Bill generation failed:", err);
        throw new Error("Failed to generate eWay Bill");
    }
    }
