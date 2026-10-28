import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`;
}

function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  return (
    <main className="cart-page">
      <header className="cart-page__header">
        <div>
          <p className="cart-page__eyebrow">YOUR ORDER</p>
          <h1>Shopping Cart</h1>
        </div>
        <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
      </header>

      {items.length === 0 ? (
        <section className="cart-empty">
          <div className="cart-empty__illustration" aria-hidden="true">
            <FaShoppingBasket />
          </div>
          <h2>Your cart is waiting for something delicious</h2>
          <p>Explore the menu and add your favorite dishes to get started.</p>
          <Link className="cart-page__primary-button" to="/restaurants">
            Browse restaurants
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-panel" aria-label="Cart items">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
            <Link className="cart-page__continue-link" to="/restaurants">
              ← Continue shopping
            </Link>
          </section>

          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Delivery fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="cart-summary__total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <p className="cart-summary__note">
              Delivery fee is applied once per order.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
