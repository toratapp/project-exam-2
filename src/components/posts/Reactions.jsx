import PropTypes from 'prop-types';

function Reactions({ reactions = [] }) {
  const getReactionCount = (reactions, symbol) => {
    const reaction = reactions.find(reaction => reaction.symbol === symbol);
    return reaction ? reaction.count : 0;
  };

  return (
    <div className="flex flex-row gap-8">
      <p className="self-center">Reactions:</p>
      {reactions && reactions.length > 0 ? (
        ['👍', '❤️', '😢', '😡'].map(symbol => (
            <div className="text-center" key={symbol}>
              <div>{symbol}</div>
              <p>{getReactionCount(reactions, symbol)}</p>
            </div>
        ))
      ) : (
        <p>No reactions</p>
      )}
    </div>
  );
}

Reactions.propTypes = {
  reactions: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      reactors: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default Reactions;
