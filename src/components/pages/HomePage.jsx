import { useNavigate } from "react-router-dom";
import { useToken } from "../../stores/useUserStore";
import FirstHeading from "../common/FirstHeading";

function HomePage() {
  const token = useToken();
  const navigate = useNavigate();

  if(!token) {
    return navigate("/login");
  }

  return ( <FirstHeading additionalClass="mt-20 ml-7">Home Page</FirstHeading> );
}

export default HomePage;
