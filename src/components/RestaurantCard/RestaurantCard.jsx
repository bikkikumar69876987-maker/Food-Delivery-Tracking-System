import { Link } from "react-router-dom";
import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <article className="restaurant-card">
      <img
        className="restaurant-card__image"
        src={restaurant.image}
        alt={restaurant.name}
      />

      <div className="restaurant-card__body">
        <h2>{restaurant.name}</h2>
        <p>⭐ {restaurant.rating}</p>
        <p>🚚 Delivery Time : {restaurant.time}</p>
        <Link
          className="restaurant-card__button"
          to={`/restaurants/${restaurant.id}/menu`}
        >
          View Menu
        </Link>
      </div>
    </article>
  );
}

export default RestaurantCard;
