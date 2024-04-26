import { useParams } from 'react-router-dom';
import FirstHeading from '../common/FirstHeading';
import EditPostForm from '../posts/EditPostForm';

function EditPostPage() {
  let { id } = useParams();

  return (
    <section className="container p-7 flex flex-col max-w-screen-sm mx-auto mb-20 mt-16">
      <FirstHeading>Edit profile</FirstHeading>
      <EditPostForm id={id} />
    </section>
  );
}

export default EditPostPage;
