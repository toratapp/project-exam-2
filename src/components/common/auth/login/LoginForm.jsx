import { Button, Input } from "react-daisyui";
import ErrorMessage from "../../ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "./loginSchema";
import { useState } from "react";
import { LOGIN_URL, APIKEY_URL } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../../../stores/useUserStore";
import { useApiKeyActions } from "../../../../stores/useApiKeyStore";

function LoginForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUserActions();
  const { setApiKey } = useApiKeyActions();
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
        return setError(json.errors?.[0]?.message || "An error occured");
      }

      setUser(json);

      try {
        const apiKeyResponse = await fetch(APIKEY_URL, { method: "POST", headers: { "Authorization": `Bearer ${json.data.accessToken}` }});
        console.log("json.data.token: " + json.data.accessToken);
          
        if (apiKeyResponse.ok) {
          const jsonData = await apiKeyResponse.json();
          const apiKey = jsonData.data.key;
          setApiKey(apiKey);
        } else {
          throw new Error("Error fetching API key");
        }    
      } catch(error) {
        console.error(error);
        setError(error.toString());
      }
      
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Login"}</Button>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginForm;
