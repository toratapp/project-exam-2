import { useNavigate } from "react-router-dom";
import { useToken } from "../../stores/useUserStore";
import FirstHeading from "../common/FirstHeading";
import { useGetApi } from "../../hooks/useGetApi";
import { POSTS_URL } from "../constants/api";
import { Loading } from "react-daisyui";
import PostList from "../posts/PostList";

function HomePage() {
  const token = useToken();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetApi(POSTS_URL);

  if(!token) {
    return navigate("/login");
  }

  if(isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <p className="p-4">Error loading posts.</p>;
  }

  return ( 
    <section className="container mx-auto">
      <FirstHeading additionalClass="mt-20 ml-7">Posts</FirstHeading>
      <PostList  posts={data} />
    </section>
  );
}

export default HomePage;
