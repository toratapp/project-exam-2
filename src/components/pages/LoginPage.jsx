import FirstHeading from "../common/FirstHeading";
import LoginForm from "../common/auth/login/LoginForm"

function LoginPage() {
  return (
    <section className="container p-7 flex flex-col max-w-screen-2xl mx-auto mb-20 mt-16">
      <FirstHeading>Login</FirstHeading>
      <LoginForm />
    </section>
  );
}
export default LoginPage;
