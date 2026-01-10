import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/layout/AuthLayout";

export default function Register() {
  return (
    <div>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}
