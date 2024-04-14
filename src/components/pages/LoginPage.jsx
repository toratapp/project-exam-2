import FirstHeading from "../common/FirstHeading";
import LoginForm from "../login/LoginForm";

function LoginPage() {
  return (
    <section className="p-7 flex flex-col max-w-screen-2xl mx-auto mb-20">
      <FirstHeading>Login</FirstHeading>
      <LoginForm />
    </section>
  );
}
export default LoginPage;
