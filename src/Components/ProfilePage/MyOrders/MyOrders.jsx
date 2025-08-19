import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import image from '../../../Assets/New folder/New folder/4.png'
import { getProductById } from "../../../API/productApi";
function MyOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 2; // Number of orders per page

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/order/user/${userId}`,
          {
            params: {
              page: currentPage,
              limit: LIMIT,
            },
          }
        );
        let fetchedOrders = res.data.orders || [];
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
          console.log("orders from my order :",ordersWithProducts)
        setOrders(ordersWithProducts);
        setTotalPages(Math.ceil((res.data.totalCount || 0) / LIMIT));
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) return <p>Loading your orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="my-orders">
      <h2 className="mb-3">My Orders</h2>
      {orders.map((order) =>
      order.items.map((item) => (
      <div key={item._id} className="my-order-new-con">
        <img src={item.product?.images?.[0] || image}/>
        <div className="my-order-new-content-div">
        {item.product?.brand?.length > 0 && <p>Brand : {item.product.brand}</p>}
          <h5>{item.product?.name.split(' ').slice(0, 10).join(' ') || item.productName.split(' ').slice(0, 10).join(' ')}</h5>
          {item.product?.color?.length > 0 && <p>Color : {item.product.color}</p>}
        </div>
        <button className="my-order-new-content-button">
          TRACK ORDER
        </button>
      </div>
      ))
      )}
      {/* {orders.map((order) => (
        <div key={order._id} className="order-card mb-4 p-3 border rounded bg-white">
          <div className="d-flex justify-content-between">
            <h5>Order ID: <strong>{order.orderId}</strong></h5>
            <span>Status: <strong>{order.status}</strong></span>
          </div>
          <p className="text-muted mb-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="mb-2">Payment: <strong>{order.paymentStatus}</strong> ({order.paymentMethod})</p>

          <h6 className="mb-2">Shipping Address:</h6>
          <p className="small">
            {order.shippingAddress.name}<br />
            {order.shippingAddress.street}, {order.shippingAddress.city},<br />
            {order.shippingAddress.district}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
            Phone: {order.shippingAddress.phone}
          </p>

          <h6 className="mt-3">Items:</h6>
          <ul className="list-unstyled">
            {order.items.map((item) => (
              <li key={item._id} className="border-bottom py-2">
                <strong>{item.productName}</strong> — {item.quantity} × ₹{item.price} = ₹{item.total}
              </li>
            ))}
          </ul>

          <div className="mt-3">
            <strong>Total: ₹{order.totalAmount}</strong>
          </div>
        </div>
      ))} */}

      <div className="pagination-controls d-flex justify-content-center align-items-center mt-4 gap-3">
        <button
          className="btn btn-outline-primary"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MyOrders;
