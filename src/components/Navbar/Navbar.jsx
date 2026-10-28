import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#ff5722",
        color: "white",
      }}
    >
      <h2>🍔 Food Tracker</h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/restaurants"
          style={{ color: "white", textDecoration: "none" }}
        >
          Restaurants
        </Link>

        <Link
          to="/orders"
          style={{ color: "white", textDecoration: "none" }}
        >
          Orders
        </Link>

        <FaShoppingCart size={22} style={{ cursor: "pointer" }} />

        <FaUserCircle size={24} style={{ cursor: "pointer" }} />
      </div>
    </nav>
  );
}

export default Navbar;