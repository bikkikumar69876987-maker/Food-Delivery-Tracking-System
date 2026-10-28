import AuthForm from "../../components/Auth/AuthForm";
import "./Signup.css";

function Signup() {
  return (
    <main className="auth-page auth-page--signup">
      <AuthForm mode="signup" />
    </main>
  );
}

export default Signup;
