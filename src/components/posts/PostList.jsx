import PropTypes from 'prop-types';
import PostItem from "./PostItem";

function PostList({ posts = [] }) {
  return  (
    <div className="home__post-cards grid gap-4 grid-cols-1">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
