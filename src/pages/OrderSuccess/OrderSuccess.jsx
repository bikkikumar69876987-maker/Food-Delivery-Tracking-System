import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { getLatestOrder, getOrderById } from "../../utils/orders";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    try {
      const savedOrder = location.state?.orderId
        ? getOrderById(location.state.orderId)
        : getLatestOrder();
      setOrder(savedOrder);
      setLoadError("");
    } catch (error) {
      console.error("Unable to load order confirmation.", error);
      setLoadError("We couldn't load your order confirmation.");
    }
  }, [location.state]);

  return (
    <main className="order-success-page">
      {loadError ? (
        <section className="order-success-card">
          <h1>{loadError}</h1>
          <Link className="order-success__button order-success__button--primary" to="/">
            Back Home
          </Link>
        </section>
      ) : !order ? (
        <section className="order-success-card">
          <h1>No recent order found</h1>
          <p>Place an order to see its confirmation and tracking details.</p>
          <Link className="order-success__button order-success__button--primary" to="/">
            Back Home
          </Link>
        </section>
      ) : (
        <section className="order-success-card">
          <div className="order-success__check" aria-label="Order placed successfully">
            <FaCheck aria-hidden="true" />
          </div>
          <p className="order-success__eyebrow">ORDER CONFIRMED</p>
          <h1>Thank you, {order.customer.fullName}!</h1>
          <p className="order-success__message">
            Your order has been placed and the restaurant will start preparing it
            soon.
          </p>
          <div className="order-success__order-id">
            <span>ORDER ID</span>
            <strong>{order.orderId}</strong>
          </div>
          <div className="order-success__delivery">
            <span>Estimated delivery</span>
            <strong>25–35 Minutes</strong>
          </div>
          <div className="order-success__actions">
            <Link
              className="order-success__button order-success__button--primary"
              to={`/tracking/${order.orderId}`}
            >
              Track Order
            </Link>
            <Link
              className="order-success__button order-success__button--secondary"
              to="/"
            >
              Back Home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default OrderSuccess;
