import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <div className="not-found-card__icon" aria-hidden="true">
          <FaMapMarkedAlt />
        </div>
        <p className="not-found-card__code">ERROR 404</p>
        <h1>Page Not Found</h1>
        <p>
          Looks like this page took a wrong turn. Let’s get you back to something
          delicious.
        </p>
        <Link to="/">Back to Home</Link>
      </section>
    </main>
  );
}

export default NotFound;
