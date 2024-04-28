import FirstHeading from "../common/FirstHeading";
import { PROFILES_URL } from "../constants/api";
import { Loading } from "react-daisyui";
import ProfilesList from "../profile/ProfilesList";
import ErrorMessage from "../common/ErrorMessage";
import ProfileSearch from "../profile/ProfileSearch";
import { useEffect, useState, useCallback } from "react";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";
import { useNavigate } from "react-router-dom";

function AllProfilesPage() {
  const token = useToken();
  const apiKey = useApiKey();
  const navigate = useNavigate();
  const [allProfiles, setAllProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  const fetchAllProfiles = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    const limit = 100;
    let currentPage = 1;
    let profiles = [];

    try {
      while (currentPage <= 10) {
        const urlWithPagination = `${PROFILES_URL}/?sort=name&sortOrder=asc&limit=${limit}&page=${currentPage}`;
        const response = await fetch(urlWithPagination, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "",
            "X-Noroff-API-Key": apiKey,
          },
        });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.errors?.[0]?.message ?? "An error occurred");
        }

        profiles = [...profiles, ...json.data];

        if (json.data.length < limit) {
          break;
        }

        currentPage++;
      }

      setAllProfiles(profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchAllProfiles();
    }
  }, [navigate, token, fetchAllProfiles]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage>Error loading profiles.</ErrorMessage>;
  }

  return ( 
    <section className="container mx-auto pt-7 mt-16 max-w-screen-sm">
      <FirstHeading additionalClass="ml-7">Profiles</FirstHeading>
      <ProfileSearch />
      <ProfilesList profiles={{data: allProfiles}} />
    </section>
  );
}

export default AllProfilesPage;
