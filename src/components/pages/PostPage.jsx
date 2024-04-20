import { useParams } from 'react-router-dom';
import { useGetApi } from '../../hooks/useGetApi';
import { POSTS_URL } from '../constants/api';
import ErrorMessage from '../common/ErrorMessage';
import { Loading } from 'react-daisyui';
import PostPageContent from '../posts/PostPageContent';

function PostPage() {
  let { id } = useParams();

  const { data, isLoading, isError } = useGetApi(`${POSTS_URL}/${id}?_author=true&_comment=true&_reactions=true`);

  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return <ErrorMessage>Error loading products.</ErrorMessage>;
  }

  const postData = data.data;

  return (
    <section className="container p-7 flex flex-col max-w-screen-2xl mx-auto mb-20 mt-16">
      <PostPageContent postData={postData} />
    </section>
  );
}

export default PostPage;




