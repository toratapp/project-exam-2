import { Link } from "react-router-dom";
import FirstHeading from "../common/FirstHeading";

import RegisterForm from "../common/auth/register/RegisterForm";

function RegisterPage() {
  return (
    <section className="container p-7 flex flex-col max-w-screen-sm mx-auto mb-20 mt-16">
      <FirstHeading>Register</FirstHeading>
      <RegisterForm />
      <div className="flex gap-2 mt-4">
        <p className="text-lg">Already have an account?</p>
        <Link to="/login" className="text-link mt-0.5">Login &gt;</Link>
      </div>
    </section>
  );
}
export default RegisterPage;
