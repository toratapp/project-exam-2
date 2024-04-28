import { Button, Input } from "react-daisyui";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from "./editProfileSchema";
import { PROFILES_URL } from "../constants/api";
import { useUserName } from "../../stores/useUserStore";
import SuccessMessage from "../common/SuccessMessage";
import { useState, useEffect } from "react";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";
import { useGetApi } from "../../hooks/useGetApi";

function EditProfileForm() {
  const name = useUserName();
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
    resolver: yupResolver(editProfileSchema),
  });

  const { data: getApiData } = useGetApi(`${PROFILES_URL}/${name}`);
  const currentBannerUrl = getApiData?.data?.banner?.url;
  const currentAvatarUrl = getApiData?.data?.avatar?.url;

  useEffect(() => {
    if (currentBannerUrl && currentAvatarUrl) {
      setValue("avatar.url", currentAvatarUrl);
      setValue("banner.url", currentBannerUrl);
    }
  }, [getApiData, setValue, currentAvatarUrl, currentBannerUrl]);

  async function onSubmit(data) {
    const url = `${PROFILES_URL}/${name}`;

    const body = JSON.stringify({
      ...data,
      avatar: data.avatar,
      banner: data.banner,
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
      setIsError(false);
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
        {isError && <ErrorMessage>{isError.message}</ErrorMessage>}
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

export default EditProfileForm;
