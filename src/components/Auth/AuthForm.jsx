import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUtensils } from "react-icons/fa";
import "./AuthForm.css";

const authConfig = {
  login: {
    eyebrow: "WELCOME BACK",
    title: "Sign in to your account",
    description: "Good food is just a few clicks away.",
    submitLabel: "Login",
    alternateMessage: "New to Food Tracker?",
    alternateLabel: "Create an account",
    alternatePath: "/signup",
  },
  signup: {
    eyebrow: "JOIN FOOD TRACKER",
    title: "Create your account",
    description: "Set up your account to make ordering easier.",
    submitLabel: "Create Account",
    alternateMessage: "Already have an account?",
    alternateLabel: "Login",
    alternatePath: "/login",
  },
};

function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const config = authConfig[mode];
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [feedback, setFeedback] = useState("");

  function togglePassword(fieldName) {
    setVisiblePasswords((current) => ({
      ...current,
      [fieldName]: !current[fieldName],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);

    if (isSignup) {
      const phone = String(formData.get("phone") || "");
      const digitCount = phone.replace(/\D/g, "").length;

      if (digitCount < 8 || digitCount > 15) {
        setFeedback("Enter a valid phone number with 8 to 15 digits.");
        return;
      }

      if (formData.get("password") !== formData.get("confirmPassword")) {
        setFeedback("Passwords do not match. Please check and try again.");
        return;
      }
    }

    setFeedback(
      isSignup
        ? "Your details are valid. Account creation is not connected yet."
        : "Your details are valid. Login is not connected yet."
    );
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    setFeedback("Password reset is not available in this demo.");
  }

  function renderPasswordField({ name, label, autoComplete, minLength }) {
    const isVisible = Boolean(visiblePasswords[name]);
    return (
      <label className="auth-field" key={name}>
        <span>{label}</span>
        <span className="auth-password">
          <input
            name={name}
            type={isVisible ? "text" : "password"}
            autoComplete={autoComplete}
            minLength={minLength}
            required
          />
          <button
            className="auth-password__toggle"
            type="button"
            onClick={() => togglePassword(name)}
            aria-label={`${isVisible ? "Hide" : "Show"} ${label.toLowerCase()}`}
            aria-pressed={isVisible}
          >
            {isVisible ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
          </button>
        </span>
      </label>
    );
  }

  return (
    <section className={`auth-card auth-card--${mode}`}>
      <div className="auth-card__brand" aria-hidden="true">
        <FaUtensils />
      </div>
      <p className="auth-card__eyebrow">{config.eyebrow}</p>
      <h1>{config.title}</h1>
      <p className="auth-card__description">{config.description}</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {isSignup && (
          <label className="auth-field">
            <span>Full name</span>
            <input name="fullName" type="text" autoComplete="name" required />
          </label>
        )}

        <label className="auth-field">
          <span>Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>

        {isSignup && (
          <label className="auth-field">
            <span>Phone number</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[+]?[0-9 ()-]{8,20}"
              required
            />
          </label>
        )}

        {renderPasswordField({
          name: "password",
          label: "Password",
          autoComplete: isSignup ? "new-password" : "current-password",
          minLength: isSignup ? 8 : undefined,
        })}

        {isSignup &&
          renderPasswordField({
            name: "confirmPassword",
            label: "Confirm password",
            autoComplete: "new-password",
            minLength: 8,
          })}

        {isSignup ? (
          <p className="auth-form__hint">Use at least 8 characters for your password.</p>
        ) : (
          <div className="auth-form__options">
            <label className="auth-remember">
              <input type="checkbox" name="rememberMe" />
              <span>Remember me</span>
            </label>
            <Link
              className="auth-text-link"
              to="/login"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </Link>
          </div>
        )}

        <button className="auth-submit" type="submit">
          {config.submitLabel}
        </button>

        {feedback && (
          <p
            className={`auth-feedback ${
              feedback.startsWith("Your details") ? "auth-feedback--success" : ""
            }`}
            role="status"
          >
            {feedback}
          </p>
        )}
      </form>

      <p className="auth-card__alternate">
        {config.alternateMessage}{" "}
        <Link to={config.alternatePath}>{config.alternateLabel}</Link>
      </p>
      <Link className="auth-card__home" to="/">
        Back to home
      </Link>
    </section>
  );
}

export default AuthForm;
