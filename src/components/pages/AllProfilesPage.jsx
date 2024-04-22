import FirstHeading from "../common/FirstHeading";
import { useGetApi } from "../../hooks/useGetApi";
import { PROFILES_URL } from "../constants/api";
import { Loading } from "react-daisyui";
import ProfilesList from "../profile/ProfilesList";
import ErrorMessage from "../common/ErrorMessage";


function AllProfilesPage() {
  const { data, isLoading, isError } = useGetApi(PROFILES_URL);

  if(isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <ErrorMessage>Error loading profiles.</ErrorMessage>;
  }

  return ( 
    <section className="container mx-auto p-7 mt-16">
      <FirstHeading>All profiles</FirstHeading>
      <ProfilesList profiles={data} />
    </section>
  );
}

export default AllProfilesPage;
