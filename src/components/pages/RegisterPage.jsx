import FirstHeading from "../common/FirstHeading";

import RegisterForm from "../register/RegisterForm";

function RegisterPage() {
  return (
    <section className="p-7 flex flex-col max-w-screen-2xl mx-auto mb-20">
      <FirstHeading>Register</FirstHeading>
      <RegisterForm />
    </section>
  );
}
export default RegisterPage;
