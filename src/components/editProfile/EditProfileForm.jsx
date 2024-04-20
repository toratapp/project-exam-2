import { Button, Input } from "react-daisyui";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from "./editProfileSchema";
import { PROFILES_URL } from "../constants/api";
import { useUserName, useUser, useUserActions } from "../../stores/useUserStore";
import SuccessMessage from "../common/SuccessMessage";
import { useState, useEffect } from "react";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";

function EditProfileForm() {
  const name = useUserName();
  const user = useUser();
  const { setUser } = useUserActions();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = useToken();
	const apiKey = useApiKey();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  useEffect(() => {
    if (user && user.data && user.data.avatar && user.data.avatar.url && user.data.banner && user.data.banner.url) {
      setValue("avatar.url", user.data.avatar.url);
      setValue("banner.url", user.data.banner.url);
    }
  }, [user, setValue]);

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
        const updatedAvatarUrl = json.data.avatar.url;
        const updatedBannerUrl = json.data.banner.url;
        setUser(prevUser => ({
          ...prevUser,
          data: {
            ...prevUser.data,
            avatar: { url: updatedAvatarUrl },
            banner: { url: updatedBannerUrl }
          }
        }));
        setIsSubmitted(true);
      } else {
        throw new Error("An error occured");
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return ( 
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading}>
        {isError && <ErrorMessage>An error occured.</ErrorMessage>}
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Avatar (url)</span>
            </label>
            <Input as="input" type="text" {...register("avatar.url")} />
            {errors["avatar.url"] && <ErrorMessage>{errors["avatar.url"].message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-full font-sans mb-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Banner (url)</span>
            </label>
            <Input as="input" type="text" {...register("banner.url")} />
            {errors["banner.url"] && <ErrorMessage>{errors["banner.url"].message}</ErrorMessage>}
          </div>
        </div>
        <div className="w-80 mt-7 flex flex-col items-start">
          <Button type="submit" className="cta">{isLoading ? "..." : "Update"}</Button>
        </div>
        {isSubmitted && <div className="mt-4 text-center">
          <SuccessMessage>Update successful</SuccessMessage>
        </div>}
      </fieldset>
    </form>
  );
}

export default EditProfileForm;
