import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import { POSTS_URL } from "../constants/api";
import ErrorMessage from "../common/ErrorMessage";
import { useToken } from "../../stores/useUserStore";
import { useApiKey } from "../../stores/useApiKeyStore";

function PostButtons({ id }) {
  const [error, setError] = useState(null);
  const token = useToken();
  const apiKey = useApiKey();
  const navigate = useNavigate();
  
  async function handleDeletePost() {
    const confirmed = window.confirm("Are you sure you want to delete this post?");

    const options = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    }

    if (confirmed) {
      try {
        const response = await fetch(`${POSTS_URL}/${id}`, options);

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        navigate(-1);
      }
      catch(error) {
        console.log("Error deleting post:", error);
        setError("Failed to delete post. Please try again later.");
      }
    }
  }
  return (
    <>
      <div className="flex flex-row mx-auto justify-between">
        <Link to="/edit-post"><Button className="cta block">Edit post <i className="fa-solid fa-pencil ml-1"></i></Button></Link>
        <Button type="button" className="cta block" onClick={handleDeletePost}>Delete post <i className="fa-solid fa-trash-can"></i></Button>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

PostButtons.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PostButtons;
