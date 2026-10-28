import { useState } from "react";
import "./Menu.css";

function Menu() {
  const foods = [
    {
      id: 1,
      name: "Cheese Pizza",
      price: 299,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    },
    {
      id: 2,
      name: "Veg Burger",
      price: 199,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    },
    {
      id: 3,
      name: "French Fries",
      price: 149,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800",
    },
    {
      id: 4,
      name: "Cold Coffee",
      price: 129,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    },
    {
      id: 5,
      name: "Pasta",
      price: 249,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    },
    {
      id: 6,
      name: "Chocolate Cake",
      price: 179,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart([...cart, food]);
  };

  return (
    <div className="menu-page">

      <h1>🍴 Restaurant Menu</h1>

      <div className="cart-box">
        🛒 Cart Items : <b>{cart.length}</b>
      </div>

      <div className="menu-grid">

        {foods.map((food) => (

          <div className="food-card" key={food.id}>

            <img src={food.image} alt={food.name} />

            <div className="food-body">

              <h2>{food.name}</h2>

              <p>⭐ {food.rating}</p>

              <h3>₹ {food.price}</h3>

              <button onClick={() => addToCart(food)}>
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Menu;