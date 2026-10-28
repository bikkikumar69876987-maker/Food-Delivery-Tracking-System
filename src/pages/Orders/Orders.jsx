import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import {
  getAllOrders,
  getOrderRestaurantName,
  getOrderStatus,
} from "../../utils/orders";
import { formatCurrency } from "../../utils/checkout";
import "./Orders.css";

function formatOrderDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    try {
      setOrders(getAllOrders().slice().reverse());
    } catch (error) {
      console.error("Unable to load order history.", error);
      setLoadError("Your order history is currently unavailable.");
    }
  }, []);

  return (
    <main className="orders-page">
      <header className="orders-page__header">
        <div>
          <p className="orders-page__eyebrow">YOUR FOOD JOURNEY</p>
          <h1>My Orders</h1>
        </div>
        <span>{orders.length} {orders.length === 1 ? "order" : "orders"}</span>
      </header>

      {loadError ? (
        <section className="orders-empty">
          <h2>{loadError}</h2>
        </section>
      ) : orders.length === 0 ? (
        <section className="orders-empty">
          <div className="orders-empty__icon" aria-hidden="true">
            <FaClipboardList />
          </div>
          <h2>No orders yet</h2>
          <p>Your completed checkouts will appear here.</p>
          <Link to="/restaurants">Explore restaurants</Link>
        </section>
      ) : (
        <section className="orders-list" aria-label="Previous orders">
          {orders.map((order) => {
            const status = getOrderStatus(order);
            const total =
              order.totals?.grandTotal ??
              order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

            return (
              <article className="order-card" key={order.orderId}>
                <div className="order-card__main">
                  <div className="order-card__heading">
                    <div>
                      <p className="order-card__label">ORDER ID</p>
                      <h2>{order.orderId}</h2>
                    </div>
                    <span
                      className={`order-status order-status--${status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="order-card__meta">
                    <div>
                      <span>Restaurant</span>
                      <strong>{getOrderRestaurantName(order)}</strong>
                    </div>
                    <div>
                      <span>Date</span>
                      <strong>{formatOrderDate(order.createdAt)}</strong>
                    </div>
                    <div>
                      <span>Total</span>
                      <strong>{formatCurrency(total)}</strong>
                    </div>
                  </div>
                </div>

                <Link
                  className="order-card__details-button"
                  to={`/tracking/${order.orderId}`}
                >
                  View Details
                </Link>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Orders;
