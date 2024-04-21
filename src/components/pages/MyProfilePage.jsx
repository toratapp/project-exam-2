import { useUserName } from "../../stores/useUserStore";
import { PROFILES_URL } from "../constants/api";
import { useGetApi } from "../../hooks/useGetApi";
import { Loading } from "react-daisyui";
import ProfileContent from "../profile/ProfileContent";
import PostList from "../posts/PostList";

function MyProfilePage() {
  const name = useUserName();

  const { data, isLoading, isError } = useGetApi(PROFILES_URL + `/${name}`);
  const { data: postsData, isLoading: postsIsLoading, isError: postsIsError } = useGetApi(PROFILES_URL + `/${name}/posts?_author=true`);

  if(isLoading || postsIsLoading) {
    return <Loading />;
  }

  if(isError || postsIsError) {
    return <p className="p-4">Error loading posts.</p>;
  }

  return ( 
    <section className="container mx-auto">
      <ProfileContent  profile={data} />
      <PostList posts={postsData} />
    </section>
  );
}

export default MyProfilePage;