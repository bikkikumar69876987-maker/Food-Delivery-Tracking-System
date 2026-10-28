import AuthForm from "../../components/Auth/AuthForm";
import "./Login.css";

function Login() {
  return (
    <main className="auth-page auth-page--login">
      <AuthForm mode="login" />
    </main>
  );
}

export default Login;
