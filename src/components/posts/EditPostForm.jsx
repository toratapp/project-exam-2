import { Button, Input, Textarea } from "react-daisyui";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPostSchema } from "./editPostSchema";
import { POSTS_URL } from "../constants/api";
import SuccessMessage from "../common/SuccessMessage";
import { useState, useEffect } from "react";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";
import { useGetApi } from "../../hooks/useGetApi";
import PropTypes from "prop-types";

function EditPostForm({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = useToken();
	const apiKey = useApiKey();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(editPostSchema),
  });

  const { data: getApiData } = useGetApi(`${POSTS_URL}/${id}`);
  const currentTitle = getApiData?.data?.title;
  const currentBody = getApiData?.data?.body;
  const currentMediaUrl = getApiData?.data?.media?.url;
  

  useEffect(() => {
    if (currentTitle && currentBody && currentMediaUrl) {
      setValue("title", currentTitle);
      setValue("body", currentBody);
      setValue("media.url", currentMediaUrl);
    }
  }, [getApiData, setValue, currentTitle, currentBody, currentMediaUrl]);

  async function onSubmit(data) {
    const url = `${POSTS_URL}/${id}`;

    const body = JSON.stringify({
      ...data,
      media: data.media,
    });

    console.log("body: " + body);

    const options = {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "",
        "X-Noroff-API-Key": apiKey,
      },
      body: body
    };

    try {
      setIsError(null);
      setIsLoading(true);
      const response = await fetch(url, options);

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
      console.log(error);
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
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Update"}</Button>
        </div>
        {isSubmitted && <div className="mt-4">
          <SuccessMessage>Update successful</SuccessMessage>
        </div>}
      </fieldset>
    </form>
  );
}

EditPostForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EditPostForm;
