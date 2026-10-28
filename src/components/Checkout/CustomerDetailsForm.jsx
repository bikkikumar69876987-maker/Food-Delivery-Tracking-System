import { useState } from "react";

const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", description: "Pay when your order arrives" },
  { id: "upi", label: "UPI", description: "Pay using any UPI app" },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Use a credit or debit card",
  },
];

function CustomerDetailsForm() {
  const [phoneError, setPhoneError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmation("");

    const form = event.currentTarget;
    const phone = new FormData(form).get("phone").toString();
    const digitCount = phone.replace(/\D/g, "").length;

    if (digitCount < 8 || digitCount > 15) {
      setPhoneError("Enter a valid phone number with 8 to 15 digits.");
      return;
    }

    setPhoneError("");

    if (!form.reportValidity()) {
      return;
    }

    setConfirmation(
      "Your details are valid. Payment and order placement are not connected yet."
    );
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <section className="checkout-card">
        <div className="checkout-card__heading">
          <span className="checkout-card__step">01</span>
          <div>
            <h2>Delivery details</h2>
            <p>Where should we deliver your order?</p>
          </div>
        </div>

        <div className="checkout-form__grid">
          <label className="checkout-field checkout-field--full">
            <span>Full name</span>
            <input name="fullName" type="text" autoComplete="name" required />
          </label>

          <label className="checkout-field">
            <span>Phone number</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[+]?[0-9 ()-]{8,20}"
              aria-describedby={phoneError ? "checkout-phone-error" : undefined}
              onChange={() => setPhoneError("")}
              required
            />
            {phoneError && (
              <span className="checkout-field__error" id="checkout-phone-error">
                {phoneError}
              </span>
            )}
          </label>

          <label className="checkout-field">
            <span>Email address</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="checkout-field checkout-field--full">
            <span>Delivery address</span>
            <textarea
              name="address"
              autoComplete="street-address"
              rows="3"
              required
            />
          </label>

          <label className="checkout-field">
            <span>City</span>
            <input name="city" autoComplete="address-level2" required />
          </label>

          <label className="checkout-field">
            <span>State</span>
            <input name="state" autoComplete="address-level1" required />
          </label>

          <label className="checkout-field">
            <span>PIN code</span>
            <input
              name="pinCode"
              inputMode="numeric"
              autoComplete="postal-code"
              pattern="[0-9]+"
              onChange={() => setConfirmation("")}
              required
            />
          </label>
        </div>
      </section>

      <section className="checkout-card">
        <div className="checkout-card__heading">
          <span className="checkout-card__step">02</span>
          <div>
            <h2>Payment method</h2>
            <p>Choose how you would like to pay.</p>
          </div>
        </div>

        <div className="checkout-payment-options">
          {paymentMethods.map((method, index) => (
            <label className="checkout-payment-option" key={method.id}>
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                defaultChecked={index === 0}
              />
              <span className="checkout-payment-option__copy">
                <strong>{method.label}</strong>
                <span>{method.description}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <button className="checkout-submit" type="submit">
        Continue with selected payment
      </button>
      {confirmation && (
        <p className="checkout-confirmation" role="status">
          {confirmation}
        </p>
      )}
    </form>
  );
}

export default CustomerDetailsForm;
