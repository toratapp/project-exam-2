import PropTypes from 'prop-types';

function ProfilesList({ profiles }) {
  return  (
    <div>
      {profiles.data.map(profile => (
        <div key={profile.email} className="flex flex-row mb-6">
          <figure className="w-20">
            <img src={profile.avatar.url} className="aspect-square w-full h-auto object-cover profile-picture rounded-3xl" alt="Avatar picture" />
          </figure>
          <h2 className="ml-6 self-center">{profile.name}</h2>
        </div>
      ))}
    </div>
  );
}

ProfilesList.propTypes = {
  profiles: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
          url: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default ProfilesList;
