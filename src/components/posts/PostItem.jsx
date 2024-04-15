import PropTypes from 'prop-types';
import { Card } from 'react-daisyui';
import { Link } from 'react-router-dom';

function PostItem({ post }) {
  const { id, title, body, media: { url: mediaUrl } } = post;

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    const truncated = words.slice(0, limit).join(' ');
    if (words.length > limit) {
      return truncated + '...';
    }
    return truncated;
  };

  const truncatedBody = truncateText(body, 15);

  return (
    <Card>
      <Link to={`post/${id}`}><figure><img className="aspect-4/3 w-full h-auto object-cover" src={mediaUrl} alt={title} /></figure></Link>
      <Card.Body>
        <Link to={`post/${id}`}><Card.Title tag="h2">{title}</Card.Title></Link>
        <p>{truncatedBody}</p>
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
    body: PropTypes.string.isRequired,
    media: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    }).isRequired
  }).isRequired
};
