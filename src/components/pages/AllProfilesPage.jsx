import FirstHeading from "../common/FirstHeading";
import { useGetApi } from "../../hooks/useGetApi";
import { PROFILES_URL } from "../constants/api";
import { Loading } from "react-daisyui";
import ProfilesList from "../profile/ProfilesList";
import ErrorMessage from "../common/ErrorMessage";
import ProfileSearch from "../profile/ProfileSearch";
import { useEffect } from "react";
import { useToken } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

function AllProfilesPage() {
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { data, isLoading, isError } = useGetApi(PROFILES_URL);

  if(isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <ErrorMessage>Error loading profiles.</ErrorMessage>;
  }

  return ( 
    <section className="container mx-auto pt-7 mt-16 max-w-md">
      <FirstHeading additionalClass="text-center">Profiles</FirstHeading>
      <ProfileSearch />
      <ProfilesList profiles={data} />
    </section>
  );
}

export default AllProfilesPage;
