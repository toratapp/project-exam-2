import PropTypes from 'prop-types';
import { Button } from 'react-daisyui';
import { useToken, useUserName } from '../../stores/useUserStore';
import { useApiKey } from '../../stores/useApiKeyStore';
import { PROFILES_URL } from '../constants/api';
import { useState, useEffect } from 'react';
import ErrorMessage from '../common/ErrorMessage';

function FollowButton({ followers, name }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const userName = useUserName();
  const [error, setError] = useState(null);
  const token = useToken();
  const apiKey = useApiKey();

  useEffect(() => {
    setIsFollowing(followers.some(follower => follower.name === userName));
  }, [followers, userName]);
  
  async function follow() {
    const followUrl = `${PROFILES_URL}/${name}/follow`;
    const options = {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-Requested-With": "",
        "X-Noroff-API-Key": apiKey,
      }
    };

    try {
      const response = await fetch(followUrl, options);
      if (!response.ok) {
        throw new Error("Failed to follow");
      }
      setIsFollowing(true);
      setError(null);
    } catch (error) {
      console.log("Failed to follow:", error);
      setError("Failed to follow. Please try again later.");
    }
  }

  async function unfollow() {
    const unfollowUrl = `${PROFILES_URL}/${name}/unfollow`;
    const options = {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-Requested-With": "",
        "X-Noroff-API-Key": apiKey,
      }
    };

    try {
      const response = await fetch(unfollowUrl, options);
      if (!response.ok) {
        throw new Error("Failed to unfollow");
      }
      setIsFollowing(false);
      setError(null);
    } catch (error) {
      console.log("Failed to unfollow:", error);
      setError("Failed to unfollow. Please try again later.");
    }
  }

  return (
    <>
      {isFollowing ? (
        <Button className="cta block w-28 mx-auto mb-6" onClick={unfollow}>Unfollow</Button>
      ) : (
        <Button className="cta block w-28 mx-auto mb-6" onClick={follow}>Follow</Button>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

FollowButton.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.string.isRequired
};

export default FollowButton;
