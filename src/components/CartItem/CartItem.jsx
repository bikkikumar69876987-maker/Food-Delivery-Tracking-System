import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import "./CartItem.css";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img className="cart-item__image" src={item.image} alt={item.name} />

      <div className="cart-item__details">
        <p className="cart-item__restaurant">{item.restaurantName}</p>
        <h2>{item.name}</h2>
        <p className="cart-item__price">₹{item.price}</p>
      </div>

      <div className="cart-item__actions">
        <div className="cart-item__quantity" aria-label="Item quantity">
          <button
            type="button"
            onClick={onDecrease}
            disabled={item.quantity <= 1}
            aria-label={`Decrease ${item.name} quantity`}
          >
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={onIncrease}
            aria-label={`Increase ${item.name} quantity`}
          >
            <FaPlus />
          </button>
        </div>
        <button
          className="cart-item__remove"
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name} from cart`}
        >
          <FaTrash />
          <span>Remove</span>
        </button>
      </div>

      <p className="cart-item__line-total">
        ₹{(item.price * item.quantity).toFixed(2)}
      </p>
    </article>
  );
}

export default CartItem;
