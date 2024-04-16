import PropTypes from 'prop-types';
import PostItem from "./PostItem";

function PostList({ posts }) {
  return  (
    <div className="home__post-cards grid gap-4 grid-cols-1">
      {posts.data.map(post => (
        post.media && <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;

PostList.propTypes = {
  posts: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string,
        media: PropTypes.shape({
          url: PropTypes.string.isRequired,
          alt: PropTypes.string
        })
      })
    ).isRequired
  }).isRequired
};
