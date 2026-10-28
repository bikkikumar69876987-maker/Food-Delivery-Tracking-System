import { useState } from "react";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import restaurants from "../../utils/restaurants";

function Restaurants() {
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.trim().toLowerCase())
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
          aria-label="Search restaurants by name"
          style={{
            width: "min(380px, 100%)",
            boxSizing: "border-box",
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
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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