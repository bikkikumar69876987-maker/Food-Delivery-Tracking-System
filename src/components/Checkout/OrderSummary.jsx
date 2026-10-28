import { calculateCheckoutTotals, formatCurrency } from "../../utils/checkout";

function OrderSummary({ items }) {
  const { subtotal, deliveryFee, platformFee, gst, grandTotal } =
    calculateCheckoutTotals(items);

  return (
    <aside className="checkout-summary">
      <h2>Order summary</h2>

      <div className="checkout-summary__items">
        {items.map((item) => (
          <div className="checkout-summary__item" key={item.id}>
            <div className="checkout-summary__item-copy">
              <strong>{item.name}</strong>
              <span>
                {item.quantity} × {formatCurrency(item.price)}
              </span>
            </div>
            <span className="checkout-summary__item-total">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-summary__charges">
        <div>
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div>
          <span>Delivery fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div>
          <span>Platform fee</span>
          <span>{formatCurrency(platformFee)}</span>
        </div>
        <div>
          <span>GST (5%)</span>
          <span>{formatCurrency(gst)}</span>
        </div>
      </div>

      <div className="checkout-summary__grand-total">
        <strong>Grand total</strong>
        <strong>{formatCurrency(grandTotal)}</strong>
      </div>
      <p className="checkout-summary__note">
        GST is calculated on the food subtotal.
      </p>
    </aside>
  );
}

export default OrderSummary;
