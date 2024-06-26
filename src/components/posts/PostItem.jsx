import PropTypes from 'prop-types';
import { Card } from 'react-daisyui';
import { Link } from 'react-router-dom';

const placeholderImageUrl = "https://teidsvag.com/no-image2.jpg";

function PostItem({ post }) {
  const { id, title, body, media, author: { name } } = post;
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
    <Card className="flex flex-column sm:flex-row">
        <Link className="flex-1 block self-center" to={`/posts/${id}`}>
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
          <div className="flex-1">
            <Link to={`/posts/${id}`}><Card.Title tag="h2" className="hover:underline">{title}</Card.Title></Link>
            <p className="font-light text-sm">{name}</p>
            {body ? <p className="mt-2.5">{truncatedBody}</p> : <p className="mt-2.5">No body text</p>}
          </div>
          <Card.Actions className="justify-end">
            <Link to={`/posts/${id}`} className="text-link">Read more &gt;</Link>
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
    }),
    author: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
