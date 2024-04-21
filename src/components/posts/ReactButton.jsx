import PropTypes from 'prop-types';

function ReactButton({ children, additionalClass, onClick }) {
  const classNames = `react-button mt-4 mb-4 rounded-full p-1 shadow-md w-14 h-14 ${additionalClass}`;
  
  return <button className={classNames} onClick={onClick}>{children}</button>;
}

ReactButton.propTypes = {
  children: PropTypes.node.isRequired,
  additionalClass: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ReactButton;
