import PropTypes from 'prop-types';
import FirstHeading from "../common/FirstHeading";

function PostPageContent({ postData }) {
  const { 
    title, 
    body, 
    author: { name, avatar: { url: avatarUrl } }, 
    media: { url: mediaUrl }, 
    _count: { comments, reactions } 
  } = postData;

  return ( 
    <>
      <div className="flex flex-row gap-2">
        <figure className="w-44">
          <img src={avatarUrl} className="aspect-square w-full h-auto object-cover profile-picture rounded-3xl" alt="Avatar picture" />
        </figure>
        <FirstHeading>{name}</FirstHeading>
      </div>
      <h2>{title}</h2>
      <p>{body}</p>
      <figure>
        <img src={mediaUrl} className="aspect-4/3 w-full h-auto object-cover" alt="Media picture" />
      </figure>
      <p>Reactions: {reactions}</p>
      <p>Comments: {comments}</p>
    </>
  );
}

PostPageContent.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    media: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired,
    _count: PropTypes.shape({
      comments: PropTypes.number.isRequired,
      reactions: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default PostPageContent;
