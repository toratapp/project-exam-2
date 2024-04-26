import PropTypes from 'prop-types';
import FirstHeading from "../common/FirstHeading";
import { useUserName } from '../../stores/useUserStore';
import ProfileButtons from './ProfileButtons';
import FollowButton from './FollowButton';

function ProfileContent({ profile }) {
  const { banner: { url: bannerUrl }, avatar: { url: avatarUrl }, name, followers } = profile.data;
  const storageName = useUserName();

  return (
    <>
      <div className="relative">
        <figure>
          <img src={bannerUrl} className="aspect-17/7 lg:aspect-17/5 w-full h-auto object-cover" alt="Banner picture" />
        </figure>
        <figure className="w-2/5 sm:w-44 mx-auto absolute bottom-0 left-0 right-0 translate-y-2/4">
          <img src={avatarUrl} className="aspect-square w-full h-auto object-cover profile-picture rounded-3xl" alt="Avatar picture" />
        </figure>
      </div>
      <FirstHeading additionalClass="mt-32 text-center">{name}</FirstHeading>
      {name === storageName ? <ProfileButtons /> : <FollowButton followers={followers} name={name} />}
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
      name: PropTypes.string.isRequired,
      followers: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default ProfileContent;
