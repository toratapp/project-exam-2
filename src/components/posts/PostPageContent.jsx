import PropTypes from 'prop-types';
import FirstHeading from "../common/FirstHeading";
import ReactButton from './ReactButton';
import Reactions from './Reactions';
import CommentSection from './CommentSection';
import { useToken, useUserName } from '../../stores/useUserStore';
import { useApiKey } from '../../stores/useApiKeyStore';
import { POSTS_URL } from '../constants/api';
import { useState } from 'react';

function PostPageContent({ postData }) {
  const [reactionsData, setReactionsData] = useState(postData.reactions);
  const token = useToken();
  const apiKey = useApiKey();
  const userName = useUserName();

  const {
    id, 
    title, 
    body, 
    author: { name, avatar: { url: avatarUrl } }, 
    media: { url: mediaUrl }, 
    comments,
    reactions
  } = postData;

  async function react(symbol) {
    const reactUrl = `${POSTS_URL}/${id}/react/${symbol}`;
    const options = {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "",
        "X-Noroff-API-Key": apiKey,
      }
    };

    try {
      const response = await fetch(reactUrl, options);
      console.log(response);
      if (response.ok) {
        const updatedReactions = await response.json();
        setReactionsData(updatedReactions);
      } else {
        throw new Error("An error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return ( 
    <>
      <div className="flex flex-row gap-2">
        <figure className="w-16 sm:w-20">
          <img src={avatarUrl} className="aspect-square w-full h-auto object-cover profile-picture rounded-2xl" alt="Avatar picture" />
        </figure>
        <FirstHeading additionalClass="self-center pl-2">{name}</FirstHeading>
      </div>
      <h2 className="mt-7 mb-2">{title}</h2>
      <p className="mb-4">{body}</p>
      <figure className="mb-4">
        <img src={mediaUrl} className="aspect-4/3 w-full h-auto object-cover" alt="Media picture" />
      </figure>
      <div className="react-buttons flex flex-row gap-5">
        <ReactButton onClick={() => react("👍")} additionalClass={reactionsData.some(reaction => reaction.symbol === '👍' && reaction.reactors.includes(userName)) ? 'user-reacted' : ''}>
          <i className="fa-solid fa-thumbs-up text-3xl"></i>
        </ReactButton>
        <ReactButton onClick={() => react("❤️")} additionalClass={reactionsData.some(reaction => reaction.symbol === '❤️' && reaction.reactors.includes(userName)) ? 'user-reacted' : ''}>
          <i className="fa-solid fa-heart text-3xl"></i>
        </ReactButton>
        <ReactButton onClick={() => react("😢")} additionalClass={reactionsData.some(reaction => reaction.symbol === '😢' && reaction.reactors.includes(userName)) ? 'user-reacted' : ''}>
          <i className="fa-solid fa-face-sad-tear text-3xl"></i>
        </ReactButton>
        <ReactButton onClick={() => react("😡")} additionalClass={reactionsData.some(reaction => reaction.symbol === '😡' && reaction.reactors.includes(userName)) ? 'user-reacted' : ''}>
          <i className="fa-solid fa-face-angry text-3xl"></i>
        </ReactButton>
      </div>
      <Reactions reactions={reactions} />
      <CommentSection comments={comments} />
    </>
  );
}

PostPageContent.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    media: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired,
    _count: PropTypes.shape({
      comments: PropTypes.number.isRequired,
      reactions: PropTypes.number.isRequired
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    reactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired
};


export default PostPageContent;
