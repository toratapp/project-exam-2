import PropTypes from 'prop-types';
import { POSTS_URL } from "../constants/api";
import { useState } from "react";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";
import { commentSchema } from "./commentSchema";
import SuccessMessage from "../common/SuccessMessage";
import ErrorMessage from "../common/ErrorMessage";
import { Button, Textarea } from "react-daisyui";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function Comment({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = useToken();
  const apiKey = useApiKey();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  async function onSubmit(data) {
    const commentUrl = `${POSTS_URL}/${id}/comment`;

    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "",
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify({ body: data.body }),
    };

    try {
      setIsLoading(true);
      setError(null);
      console.log(data);
      const response = await fetch(commentUrl, options);
      const json = await response.json();
  
      if(!response.ok) {
        return setError(json.errors?.[0]?.message ?? "An error occured");
      }
      setIsSubmitted(true);
      reset();
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
              <span className="label-text text-lg font-bold">Comment</span>
            </label>
            <Textarea className="max-w-96" as="input" type="text" {...register("body")} />
            {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Comment"}</Button>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isSubmitted && <div className="mt-4 text-center">
          <SuccessMessage>Comment posted</SuccessMessage>
        </div>}
      </fieldset>
    </form>
   );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Comment;
