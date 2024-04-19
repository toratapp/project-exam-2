import PropTypes from 'prop-types';
import { Card } from 'react-daisyui';
import { Link } from 'react-router-dom';

const placeholderImageUrl = "https://teidsvag.com/no-image2.jpg";

function PostItem({ post }) {
  const { id, title, body, media } = post;
  const mediaUrl = media?.url;

  const truncateText = (text, limit) => {
    if (!text) return '';
    const words = text.split(' ');
    const truncated = words.slice(0, limit).join(' ');
    if (words.length > limit) {
      return truncated + '...';
    }
    return truncated;
  };

  const truncatedBody = truncateText(body || '', 15);

  return (
    <Card className="flex flex-row">
      <Link className="flex-1 block" to={`post/${id}`}>
        <figure>
          <img className="aspect-4/3 w-full h-auto object-cover"
               src={mediaUrl || placeholderImageUrl}
               alt={title}
               onError={(e) => {
                 e.target.src = placeholderImageUrl;
               }} />
        </figure>
      </Link>
      <Card.Body className="flex-1">
        <Link to={`post/${id}`}><Card.Title tag="h2">{title}</Card.Title></Link>
        {body ? <p>{truncatedBody}</p> : <p>No body available</p>}
        <Card.Actions className="justify-end">
          <Link to={`product/${id}`} className="text-link">Read more</Link>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}

export default PostItem;

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    media: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  }).isRequired
};
