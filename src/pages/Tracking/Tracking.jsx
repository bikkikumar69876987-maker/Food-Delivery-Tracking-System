import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeliveryPartner from "../../components/DeliveryPartner/DeliveryPartner";
import OrderTimeline from "../../components/OrderTimeline/OrderTimeline";
import OrderSummary from "../../components/Checkout/OrderSummary";
import {
  advanceOrderProgress,
  formatDeliveryAddress,
  getOrderById,
  ORDER_STAGES,
} from "../../utils/orders";
import "./Tracking.css";

function Tracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    try {
      setOrder(getOrderById(orderId));
      setLoadError("");
    } catch (error) {
      console.error("Unable to load order tracking.", error);
      setLoadError("Order tracking is currently unavailable.");
    }
  }, [orderId]);

  useEffect(() => {
    if (!order || order.progressIndex >= ORDER_STAGES.length - 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      try {
        const updatedOrder = advanceOrderProgress(orderId);
        if (updatedOrder) {
          setOrder(updatedOrder);
        } else {
          setLoadError("This order could not be found.");
          window.clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Unable to update order progress.", error);
        setLoadError("Order progress could not be updated.");
        window.clearInterval(intervalId);
      }
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [order, orderId]);

  if (loadError || !order) {
    return (
      <main className="tracking-page">
        <section className="tracking-empty">
          <h1>{loadError || "Order not found"}</h1>
          <p>Check the order link or return to the home page.</p>
          <Link to="/">Back Home</Link>
        </section>
      </main>
    );
  }

  const delivered = order.progressIndex === ORDER_STAGES.length - 1;

  return (
    <main className="tracking-page">
      <header className="tracking-header">
        <div>
          <p className="tracking-header__eyebrow">LIVE ORDER TRACKING</p>
          <h1>{delivered ? "Your order has arrived" : "Your order is on its way"}</h1>
          <p>
            Order <strong>{order.orderId}</strong>
          </p>
        </div>
        <div className="tracking-header__eta">
          <span>{delivered ? "STATUS" : "ESTIMATED DELIVERY"}</span>
          <strong>{delivered ? "Delivered" : "25–35 Minutes"}</strong>
        </div>
      </header>

      <section className="tracking-panel">
        <div className="tracking-panel__heading">
          <div>
            <h2>Order progress</h2>
            <p>
              {delivered
                ? "Thanks for ordering with Food Tracker."
                : `${ORDER_STAGES[order.progressIndex]} · Updates automatically`}
            </p>
          </div>
          {!delivered && (
            <span className="tracking-live-indicator">
              <span />
              LIVE
            </span>
          )}
        </div>
        <OrderTimeline progressIndex={order.progressIndex} />
      </section>

      <div className="tracking-layout">
        <div className="tracking-layout__main">
          <DeliveryPartner />
          <section className="tracking-address">
            <p className="tracking-section-label">DELIVERY ADDRESS</p>
            <h2>{order.customer.fullName}</h2>
            <p>{formatDeliveryAddress(order.customer)}</p>
            <a href={`tel:${order.customer.phone.replace(/\s/g, "")}`}>
              {order.customer.phone}
            </a>
          </section>
        </div>
        <OrderSummary items={order.items} />
      </div>
    </main>
  );
}

export default Tracking;
