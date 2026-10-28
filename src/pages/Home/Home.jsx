import { useState } from "react";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import restaurants from "../../utils/restaurants";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "#ff5722",
          color: "white",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "45px", marginBottom: "20px" }}>
          🍔 Delicious Food Delivered Fast
        </h1>

        <p style={{ fontSize: "20px" }}>
          Order from your favourite restaurants in minutes.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearch(searchInput);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "35px",
          }}
        >
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            aria-label="Search restaurants by name"
            style={{
              width: "min(350px, 100%)",
              boxSizing: "border-box",
              padding: "15px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "15px 25px",
              background: "#222",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </section>

      {/* Food Categories */}
      <section style={{ padding: "40px" }}>
        <h2>Food Categories</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>🍕 Pizza</div>
          <div>🍔 Burger</div>
          <div>🍟 Fries</div>
          <div>🥗 Healthy</div>
          <div>🥤 Drinks</div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Popular Restaurants</h2>

        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <p style={{ marginTop: "24px", textAlign: "center" }}>
            No restaurants found.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;