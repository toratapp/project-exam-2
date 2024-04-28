import { Button, Input, Textarea } from "react-daisyui";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPostSchema } from "./createPostSchema";
import { POSTS_URL } from "../constants/api";
import { useState } from "react";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";
import SuccessMessage from "../common/SuccessMessage";
import ErrorMessage from "../common/ErrorMessage";

function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = useToken();
	const apiKey = useApiKey();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(createPostSchema),
  });

  async function onSubmit(data) {
    const body = JSON.stringify({
      ...data,
      media: data.media,
    });
    
    try {
      const options = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "",
          "X-Noroff-API-Key": apiKey,
        },
        body: body
      };
    
      setIsError(null);
      setIsLoading(true);
      const response = await fetch(POSTS_URL, options);

      if (response.ok) {
        const json = await response.json();
        console.log("response: " + json);
        reset();
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message);
      }
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return ( 
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading}>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Title</span>
            </label>
            <Input as="input" type="text" className="brown-border-1" {...register("title")} />
            {errors["title"] && <ErrorMessage>{errors["title"].message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Body</span>
            </label>
            <Textarea as="input" type="text" className="brown-border-1" {...register("body")} />
            {errors["body"] && <ErrorMessage>{errors["body"].message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Media (url)</span>
            </label>
            <Input as="input" type="text" className="brown-border-1" {...register("media.url")} />
            {errors["media.url"] && <ErrorMessage>{errors["media.url"].message}</ErrorMessage>}
          </div>
        </div>
        {isError && <ErrorMessage>{isError.message || "An error occurred"}</ErrorMessage>}
        {isSubmitted && <div className="mt-4">
          <SuccessMessage>Post created</SuccessMessage>
        </div>}
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Publish"}</Button>
        </div>
      </fieldset>
    </form>
  );
}

export default CreatePostForm;
