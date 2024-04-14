import { Button, Input } from "react-daisyui";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "./loginSchema";
import { useState } from "react";
import { LOGIN_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../stores/useUserStore";

function LoginForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useUserActions();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data) {
    
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(LOGIN_URL, options);
      const json = await response.json();

      if(!response.ok) {
        return setError(json.errors?.[0]?.message ?? "An error occured");
      }

      setUser(json);
      navigate("/");
    }
    catch(error) {
      setError(error.toString());
    }
    finally {
      setIsLoading(false);
    }
  }

  return ( 
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Email</span>
            </label>
            <Input as="input" type="email" {...register("email")} />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Password</span>
            </label>
            <Input as="input" type="password" {...register("password")} />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Login"}</Button>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginForm;
