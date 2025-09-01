import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get("order_id");

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`http://localhost:5000/api/order/verify-payment?order_id=${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrderDetails(data))
        .catch((err) => console.error(err));
    }
  }, [orderId]);

  if (!orderId) {
    return <h2>No order details found in URL ❌</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payment Success ✅</h1>
      {orderDetails ? (
        <>
          <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
          <p><strong>Status:</strong> {orderDetails.order_status}</p>
          <p><strong>Amount:</strong> {orderDetails.order_amount} {orderDetails.order_currency}</p>
          <p><strong>Payment Method:</strong> {orderDetails.payment_method?.payment_mode || "N/A"}</p>
        </>
      ) : (
        <p>Loading payment details...</p>
      )}
      <button onClick={() => window.location.href = '/home'} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Go to Home
      </button>
    </div>
  );
}
