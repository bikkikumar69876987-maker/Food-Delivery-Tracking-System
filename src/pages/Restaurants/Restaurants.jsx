import { useState } from "react";
import { Link } from "react-router-dom";

function Restaurants() {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
      rating: 4.8,
      time: "25 mins",
    },
    {
      id: 2,
      name: "Burger Hub",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
      rating: 4.7,
      time: "18 mins",
    },
    {
      id: 3,
      name: "Italian Corner",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
      rating: 4.9,
      time: "20 mins",
    },
    {
      id: 4,
      name: "Healthy Bowl",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      rating: 4.6,
      time: "15 mins",
    },
    {
      id: 5,
      name: "Chicken House",
      image:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800",
      rating: 4.5,
      time: "30 mins",
    },
    {
      id: 6,
      name: "Coffee Cafe",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      rating: 4.8,
      time: "12 mins",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#ff5722",
          marginBottom: "25px",
        }}
      >
        🍽 Restaurants
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "35px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "380px",
            padding: "14px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            style={{
              width: "300px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h2>{restaurant.name}</h2>

              <p>⭐ {restaurant.rating}</p>

              <p>🚚 Delivery Time : {restaurant.time}</p>

              <Link to="/menu">
                <button
                  style={{
                    width: "100%",
                    background: "#ff5722",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  View Menu
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <h2
          style={{
            textAlign: "center",
            color: "red",
            marginTop: "40px",
          }}
        >
          ❌ No Restaurant Found
        </h2>
      )}
    </div>
  );
}

export default Restaurants;