import PropTypes from 'prop-types';

function FirstHeading({ additionalClass, children }) {
  const classNames = `text-3xl mb-6 ${additionalClass}`;
  
  return <h1 className={classNames}>{children}</h1>;
}

export default FirstHeading;

FirstHeading.propTypes = {
  additionalClass: PropTypes.string,
  children: PropTypes.node.isRequired,
};
