import PropTypes from 'prop-types';

function CommentSection({ comments = [] }) {
  return (
    <div className="mt-1">
      <h3 className="mt-10 text-lg">Comments</h3>
      {comments && comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id}>
            <h4 className="mt-5">{comment.owner}</h4>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p className="mt-5">No comments</p>
      )}
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ),
};

export default CommentSection;
