import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../layout/AuthLayout";

export default function Login() {
  return (
    <div>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
}
