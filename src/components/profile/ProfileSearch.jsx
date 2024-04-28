import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { PROFILES_URL } from "../constants/api";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";
import { Link } from 'react-router-dom';
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from "./searchSchema";

function ProfileSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const token = useToken();
  const apiKey = useApiKey();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });


  async function onSubmit(data) {
    const searchValue = encodeURIComponent(data.value);

    const searchUrl = `${PROFILES_URL}/search?q=${searchValue}`;

    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-Requested-With": "",
        "X-Noroff-API-Key": apiKey,
      },
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(searchUrl, options);
      const json = await response.json();
  
      if(!response.ok) {
        return setError(json.errors?.[0]?.message ?? "An error occured");
      }
      setSearchResults(json);
      console.log("json: ", json);
    }
    catch(error) {
      setError(error.toString());
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative py-4 mx-7 mb-4 font-sans profiles__search-section">
      <form  onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-row search-field" disabled={isLoading}>
          <Input placeholder="Search" className="w-full brown-border-1" {...register("value")} />
          {errors.value && <ErrorMessage>{errors.value.message}</ErrorMessage>}
          <Button type="submit"><i className="fa-solid fa-magnifying-glass"></i></Button>
        </fieldset>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {searchResults && searchResults.data.length > 0 && (
        <ul className="absolute z-30 left-5 right-5">
          {searchResults.data.map((profile) => (
            <li key={profile.name} className="cursor-pointer p-2">
              <Link to={`/profiles/${profile.name}`} className="block p-4 hover:underline hover:font-semibold">{profile.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {searchResults && searchResults.data.length === 0 && (
        <ul className="absolute z-30 left-5 right-5">
          <li className="p-6">No search results</li>
        </ul>
      )}
    </div>
  );
}

export default ProfileSearch;
