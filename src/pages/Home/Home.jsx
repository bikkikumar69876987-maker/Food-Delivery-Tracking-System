function Home() {
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

        <div style={{ marginTop: "35px" }}>
          <input
            type="text"
            placeholder="Search Food..."
            style={{
              width: "350px",
              padding: "15px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            style={{
              marginLeft: "10px",
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
        </div>
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
          <div
            style={{
              width: "280px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
              alt="Pizza"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3>Pizza Palace</h3>
              <p>⭐ 4.8 | 25 mins</p>

              <button
                style={{
                  background: "#ff5722",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                View Menu
              </button>
            </div>
          </div>

          <div
            style={{
              width: "280px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"
              alt="Burger"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3>Burger Hub</h3>
              <p>⭐ 4.7 | 18 mins</p>

              <button
                style={{
                  background: "#ff5722",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                View Menu
              </button>
            </div>
          </div>

          <div
            style={{
              width: "280px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
              alt="Italian"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3>Italian Corner</h3>
              <p>⭐ 4.9 | 20 mins</p>

              <button
                style={{
                  background: "#ff5722",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;