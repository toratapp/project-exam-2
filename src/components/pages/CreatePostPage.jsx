import FirstHeading from "../common/FirstHeading";
import CreatePostForm from "../posts/CreatePostForm";
import { useEffect } from "react";
import { useToken } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return ( 
    <section className="container p-7 flex flex-col max-w-screen-2xl mx-auto mb-20 mt-16">
      <FirstHeading>Create post</FirstHeading>
      <CreatePostForm />
    </section>
   );
}

export default CreatePostPage;
