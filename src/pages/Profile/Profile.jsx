import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { getLatestOrder } from "../../utils/orders";
import "./Profile.css";

function Profile() {
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    try {
      const latestOrder = getLatestOrder();
      setCustomer(latestOrder?.customer ?? null);
    } catch (error) {
      console.error("Unable to load profile details.", error);
      setLoadError("Profile details are currently unavailable.");
    }
  }, []);

  function handleSave(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setCustomer({
      ...customer,
      fullName: formData.get("fullName").toString().trim(),
      email: formData.get("email").toString().trim(),
      phone: formData.get("phone").toString().trim(),
      address: formData.get("address").toString().trim(),
      city: formData.get("city").toString().trim(),
      state: formData.get("state").toString().trim(),
      pinCode: formData.get("pinCode").toString().trim(),
    });
    setIsEditing(false);
    setFeedback("Profile changes are previewed for this page only.");
  }

  function handleLogout() {
    setFeedback("Logout is UI-only. There is no active account session.");
  }

  return (
    <main className="profile-page">
      <header className="profile-page__header">
        <p className="profile-page__eyebrow">YOUR ACCOUNT</p>
        <h1>My Profile</h1>
      </header>

      {loadError ? (
        <section className="profile-empty">
          <h2>{loadError}</h2>
        </section>
      ) : !customer ? (
        <section className="profile-empty">
          <div className="profile-empty__icon" aria-hidden="true">
            <FaUser />
          </div>
          <h2>Your profile is ready when you are</h2>
          <p>
            Profile details are shown here after your first checkout. Login and
            signup are currently UI-only.
          </p>
          <Link to="/login">Go to login</Link>
        </section>
      ) : (
        <section className="profile-card">
          <div className="profile-card__top">
            <div className="profile-avatar" aria-label="Profile photo placeholder">
              <FaUser aria-hidden="true" />
            </div>
            <div className="profile-card__identity">
              <h2>{customer.fullName}</h2>
              <p>{customer.email}</p>
            </div>
            <span className="profile-card__demo-badge">DEMO PROFILE</span>
          </div>

          {isEditing ? (
            <form className="profile-form" onSubmit={handleSave}>
              <label>
                <span>Full name</span>
                <input name="fullName" defaultValue={customer.fullName} required />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  defaultValue={customer.email}
                  required
                />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" defaultValue={customer.phone} required />
              </label>
              <label className="profile-form__full">
                <span>Delivery address</span>
                <textarea
                  name="address"
                  defaultValue={customer.address}
                  required
                />
              </label>
              <label>
                <span>City</span>
                <input name="city" defaultValue={customer.city} required />
              </label>
              <label>
                <span>State</span>
                <input name="state" defaultValue={customer.state} required />
              </label>
              <label>
                <span>PIN code</span>
                <input name="pinCode" defaultValue={customer.pinCode} required />
              </label>
              <div className="profile-form__actions">
                <button className="profile-button profile-button--primary" type="submit">
                  Save Preview
                </button>
                <button
                  className="profile-button profile-button--secondary"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <dl className="profile-details">
                <div>
                  <dt>Full name</dt>
                  <dd>{customer.fullName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{customer.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{customer.phone}</dd>
                </div>
                <div className="profile-details__address">
                  <dt>Delivery address</dt>
                  <dd>
                    {[customer.address, customer.city, customer.state, customer.pinCode]
                      .filter(Boolean)
                      .join(", ")}
                  </dd>
                </div>
              </dl>
              <div className="profile-card__actions">
                <button
                  className="profile-button profile-button--primary"
                  type="button"
                  onClick={() => {
                    setFeedback("");
                    setIsEditing(true);
                  }}
                >
                  Edit Profile
                </button>
                <button
                  className="profile-button profile-button--secondary"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
          {feedback && (
            <p className="profile-feedback" role="status">
              {feedback}
            </p>
          )}
        </section>
      )}
    </main>
  );
}

export default Profile;
