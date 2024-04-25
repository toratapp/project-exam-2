import { Button, Input } from "react-daisyui";
import ErrorMessage from "../../ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "./registerSchema";
import { useState } from "react";
import { REGISTER_URL } from "../../../constants/api";
import { useNavigate } from "react-router-dom";

function RegisterForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  async function onSubmit(data) {

    const formData = {
      ...data,
      avatar: data.avatar ? data.avatar : null,
      banner: data.banner ? data.banner : null,
    }
    
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData)
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(REGISTER_URL, options);
      const json = await response.json();

      if(!response.ok) {
        return setError(json.errors?.[0]?.message ?? "An error occured");
      }

      navigate("/login");
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
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Username</span>
            </label>
            <Input as="input" type="text" className="brown-border-1" {...register("name")} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Email</span>
            </label>
            <Input as="input" type="email" className="brown-border-1" {...register("email")} />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Password</span>
            </label>
            <Input as="input" type="password" className="brown-border-1" {...register("password")} />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Avatar (url)</span>
            </label>
            <Input as="input" type="text" className="brown-border-1" {...register("avatar.url")} />
            {errors["avatar.url"] && <ErrorMessage>{errors["avatar.url"].message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Banner (url)</span>
            </label>
            <Input as="input" type="text" className="brown-border-1" {...register("banner.url")} />
            {errors["banner.url"] && <ErrorMessage>{errors["banner.url"].message}</ErrorMessage>}
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Register"}</Button>
        </div>
      </fieldset>
    </form>
  );
}

export default RegisterForm;
