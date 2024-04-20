import PropTypes from 'prop-types';

function SuccessMessage({ children }) {
  return <p className="text-sm success">{children}</p>;
}

export default SuccessMessage;

SuccessMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
