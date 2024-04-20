import FirstHeading from "../common/FirstHeading";

import RegisterForm from "../register/RegisterForm";

function RegisterPage() {
  return (
    <section className="container p-7 flex flex-col max-w-screen-2xl mx-auto mb-20 mt-16">
      <FirstHeading>Register</FirstHeading>
      <RegisterForm />
    </section>
  );
}
export default RegisterPage;
