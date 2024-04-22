import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProfilesList({ profiles }) {
  return  (
    <div>
      {profiles.data.map(profile => (
        <div key={profile.email} className="flex flex-row mb-6 px-7">
          <Link to={`/profiles/${profile.name}`}>
            <figure className="w-20">
              <img src={profile.avatar.url} className="aspect-square w-full h-auto object-cover profile-picture rounded-3xl" alt="Avatar picture" />
            </figure>
          </Link>
          <Link className="self-center" to={`/profiles/${profile.name}`}>
            <h2 className="ml-6">{profile.name}</h2>
          </Link>
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
