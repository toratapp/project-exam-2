import PropTypes from 'prop-types';

function ErrorMessage({ children }) {
  return <p className="text-red-700 text-sm">{children}</p>;
}

export default ErrorMessage;

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
