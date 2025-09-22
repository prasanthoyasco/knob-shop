import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import image from "../../../Assets/New folder/New folder/4.png";
import { getProductById } from "../../../API/productApi";
import { Download, RotateCcw, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

function MyOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate(); // ✅ initialize

  const LIMIT = 4;
  const SCROLL_THRESHOLD = 900;

  useEffect(() => {
    if (!userId || !hasMore) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/order/user/${userId}`,
          {
            params: { page: page, limit: LIMIT },
          }
        );
        let fetchedOrders = res.data.orders || [];
        console.log(fetchedOrders);

        // Attach product details to each order item
        const ordersWithProducts = await Promise.all(
          fetchedOrders.map(async (order) => {
            const itemsWithDetails = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const product = await getProductById(item.productId);
                  return { ...item, product };
                } catch (err) {
                  console.error("Error fetching product details:", err);
                  return item; // fallback
                }
              })
            );
            return { ...order, items: itemsWithDetails };
          })
        );

        setOrders((prevOrders) => [...prevOrders, ...ordersWithProducts]);
        setHasMore(fetchedOrders.length > 0);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, page, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // ✅ Handle invoice download
  const handleInvoice = (order) => {
    localStorage.setItem(
      "latestInvoiceData",
      JSON.stringify({
        shippingAddress:
          order.deliveryOption === "ship" ? order.shippingData : null,
        cartItems: order.items,
        totalAmount: order.totalValue,
        dtdcReferenceNumber:
          order.deliveryOption === "ship" ? order.referenceNumber : "PICKUP",
        userId: userId,
        paymentMethod: "online",
        invoiceDate: new Date().toLocaleDateString(),
        orderId: order.orderId,
      })
    );
    navigate("/invoice"); // ✅ redirect
  };

  if (orders.length === 0 && !loading) return <p>No orders found.</p>;

  return (
    <div className="my-orders">
      <h2 className="mb-3 mt-0 fw-bolder">My Orders</h2>
      {orders.map((order) =>
        order.items.map((item) => (
          <div
            key={item._id}
            className="my-order-new-con justify-content-between"
          >
            <div className="d-flex gap-3">
              <img
                src={item.product?.images?.[0] || image}
                className="border rounded-2 overflow-hidden shadow-sm"
              />
              <div className="my-order-new-content-div w-100">
                {item.product?.brand?.length > 0 && (
                  <p>Brand : {item.product.brand}</p>
                )}
                <h5>
                  {item.product?.name.split(" ").slice(0, 10).join(" ") ||
                    item.productName.split(" ").slice(0, 10).join(" ")}
                </h5>
                {item.product?.color?.length > 0 && (
                  <p>Color : {item.product.color}</p>
                )}
                {order.paymentStatus == "pending" && (
                  <p>
                    Payment Status :{" "}
                    <span className="text-danger text-capitalize">
                      {order.paymentStatus}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="d-flex gap-2 items-center w-50 justify-content-end">
              
              {order.paymentStatus == "pending" ? (
                <>
                <button
                  className="btn btn-danger rounded-0 m-0"
                  // onClick={() => handleInvoice(order)} 
                >
                  {/* <RotateCcw size={16} />  */}
                  Payment Faild
                </button>
                </>
              ) : (
                <>
                <button className="btn btn-dark m-0">
                <Truck size={16} /> Track Order
              </button>
                <button
                  className="btn btn-dark m-0"
                  onClick={() => handleInvoice(order)} // ✅ call function
                >
                  <Download size={16} /> Invoice
                </button></>
              )}
            </div>
          </div>
        ))
      )}
      {loading && <p>Loading more orders...</p>}
      {!loading && !hasMore && orders.length > 0 && (
        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            fontSize: "1.2em",
            color: "#666",
          }}
        >
          That's it! You have viewed all your orders.
        </p>
      )}
    </div>
  );
}

export default MyOrders;
