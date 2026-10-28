import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import CustomerDetailsForm from "../../components/Checkout/CustomerDetailsForm";
import OrderSummary from "../../components/Checkout/OrderSummary";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../utils/orders";
import "./Checkout.css";

function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderError, setOrderError] = useState("");

  function handleValidSubmit(orderDetails) {
    setOrderError("");

    try {
      const order = createOrder({ ...orderDetails, items });
      clearCart();
      navigate("/order-success", { state: { orderId: order.orderId } });
    } catch (error) {
      console.error("Unable to complete checkout.", error);
      setOrderError(error.message);
    }
  }

  return (
    <main className="checkout-page">
      <header className="checkout-page__header">
        <p className="checkout-page__eyebrow">ALMOST THERE</p>
        <h1>Checkout</h1>
        <p>Complete your delivery details and choose a payment method.</p>
      </header>

      {items.length === 0 ? (
        <section className="checkout-empty">
          <div className="checkout-empty__icon" aria-hidden="true">
            <FaShoppingBasket />
          </div>
          <h2>Your cart is empty</h2>
          <p>Add something delicious before continuing to checkout.</p>
          <Link className="checkout-empty__link" to="/restaurants">
            Browse restaurants
          </Link>
        </section>
      ) : (
        <div className="checkout-layout">
          <div className="checkout-layout__form">
            <CustomerDetailsForm onValidSubmit={handleValidSubmit} />
            {orderError && (
              <p className="checkout-field__error" role="alert">
                {orderError}
              </p>
            )}
          </div>
          <OrderSummary items={items} />
        </div>
      )}
    </main>
  );
}

export default Checkout;
