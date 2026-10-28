import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { itemCount } = useCart();

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

        <Link
          to="/cart"
          aria-label={`Shopping cart, ${itemCount} items`}
          style={{
            position: "relative",
            display: "inline-flex",
            color: "white",
            textDecoration: "none",
          }}
        >
          <FaShoppingCart size={22} />
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-12px",
              display: "grid",
              minWidth: "18px",
              height: "18px",
              padding: "0 3px",
              placeItems: "center",
              borderRadius: "10px",
              background: "#222",
              color: "white",
              fontSize: "11px",
              fontWeight: "700",
            }}
          >
            {itemCount}
          </span>
        </Link>

        <FaUserCircle size={24} style={{ cursor: "pointer" }} />
      </div>
    </nav>
  );
}

export default Navbar;