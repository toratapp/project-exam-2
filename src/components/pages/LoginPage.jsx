import FirstHeading from "../common/FirstHeading";
import LoginForm from "../common/auth/login/LoginForm"
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section className="container p-7 flex flex-col max-w-screen-sm mx-auto mb-20 mt-16">
      <FirstHeading>Login</FirstHeading>
      <LoginForm />
      <div className="flex gap-2 mt-4">
        <p className="text-lg">Don&apos;t have an account?</p>
        <Link to="/register" className="text-link mt-0.5">Register &gt;</Link>
      </div>
    </section>
  );
}
export default LoginPage;
