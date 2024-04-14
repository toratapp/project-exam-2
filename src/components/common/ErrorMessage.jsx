import PropTypes from 'prop-types';

function ErrorMessage({ children }) {
  return <p className="text-sm error">{children}</p>;
}

export default ErrorMessage;

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
