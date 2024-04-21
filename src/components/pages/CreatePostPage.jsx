import FirstHeading from "../common/FirstHeading";
import CreatePostForm from "../posts/CreatePostForm";

function CreatePostPage() {
  return ( 
    <section className="container p-7 flex flex-col max-w-screen-2xl mx-auto mb-20 mt-16">
      <FirstHeading>Create post</FirstHeading>
      <CreatePostForm />
    </section>
   );
}

export default CreatePostPage;
