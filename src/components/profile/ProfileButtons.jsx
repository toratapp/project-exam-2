import { Button } from "react-daisyui";
import { Link } from "react-router-dom";

function ProfileButtons() {
  return ( 
    <div className="flex flex-row w-80 mx-auto justify-between mb-12">
      <Link to="/create-post"><Button className="cta block">New post <i className="fa-solid fa-square-plus ml-1"></i></Button></Link>
      <Link to="/edit-profile"><Button className="cta block">Edit profile <i className="fa-solid fa-pencil ml-1"></i></Button></Link>
    </div>
   );
}

export default ProfileButtons;
