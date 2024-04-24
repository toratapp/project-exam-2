import { useNavigate } from "react-router-dom";
import { useToken } from "../../stores/useUserStore";
import FirstHeading from "../common/FirstHeading";
import { useGetApi } from "../../hooks/useGetApi";
import { POSTS_URL } from "../constants/api";
import { Loading } from "react-daisyui";
import PostList from "../posts/PostList";
import ErrorMessage from "../common/ErrorMessage";
import { useEffect } from "react";

function HomePage() {
  const token = useToken();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetApi(POSTS_URL + "?_author=true");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  if(isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <ErrorMessage>Error loading posts.</ErrorMessage>;
  }

  return ( 
    <section className="container mx-auto p-7 mt-16">
      <FirstHeading>Posts</FirstHeading>
      <PostList  posts={data} />
    </section>
  );
}

export default HomePage;
