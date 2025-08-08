import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css"; // optional CSS for styling

function MyOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/orders/user/${userId}`
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading your orders...</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="my-orders">
      <h2 className="mb-3">My Orders</h2>
      {orders.map((order) => (
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
      ))}
    </div>
  );
}

export default MyOrders;
