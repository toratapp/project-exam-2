import PropTypes from 'prop-types';

function CommentSection({ comments = [] }) {
  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id}>
            <h3>{comment.owner}</h3>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ),
};

export default CommentSection;
