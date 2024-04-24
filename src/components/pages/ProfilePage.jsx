import { useParams } from 'react-router-dom';
import { PROFILES_URL } from "../constants/api";
import { useGetApi } from "../../hooks/useGetApi";
import { Loading } from "react-daisyui";
import ProfileContent from "../profile/ProfileContent";
import PostList from "../posts/PostList";
import ErrorMessage from '../common/ErrorMessage';
import { useEffect } from "react";
import { useToken } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  let { name } = useParams();

  const { data, isLoading, isError } = useGetApi(PROFILES_URL + `/${name}`);
  const { data: postsData, isLoading: postsIsLoading, isError: postsIsError } = useGetApi(PROFILES_URL + `/${name}/posts?_author=true`);

  if(isLoading || postsIsLoading) {
    return <Loading />;
  }

  if(isError || postsIsError) {
    return <ErrorMessage>Error loading posts.</ErrorMessage>;
  }

  return ( 
    <section className="container mx-auto mt-16">
      <ProfileContent  profile={data} />
      <PostList posts={postsData} />
    </section>
  );
}

export default ProfilePage;
