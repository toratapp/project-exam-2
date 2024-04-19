import PropTypes from 'prop-types';
import FirstHeading from "../common/FirstHeading";

function ProfileContent({ profile }) {
  const { banner: { url: bannerUrl }, avatar: { url: avatarUrl }, name } = profile.data;

  return (
    <>
      <div className="relative">
        <figure className="mt-16">
          <img src={bannerUrl} alt="Banner picture" />
        </figure>
        <figure className="w-2/4 mx-auto absolute bottom-0 left-0 right-0 translate-y-2/4">
          <img src={avatarUrl} alt="Avatar picture" />
        </figure>
      </div>
      <FirstHeading additionalClass="ml-7 mt-32">{name}</FirstHeading>
    </>
   );
}

ProfileContent.propTypes = {
  profile: PropTypes.shape({
    data: PropTypes.shape({
      banner: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ProfileContent;
