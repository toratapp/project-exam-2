import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../../../stores/useUserStore";

function Logout() {
	const { clearUser } = useUserActions();

	const navigate = useNavigate();

	function handleLogout() {
		clearUser();
		navigate("/login");
	}

	return <Button className="mr-3" onClick={handleLogout}>Logout</Button>;
}

export default Logout;
