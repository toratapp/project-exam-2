import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../../../stores/useUserStore";
import { useApiKeyActions } from "../../../../stores/useApiKeyStore";

function Logout() {
	const { clearUser } = useUserActions();
	const { clearApiKey } = useApiKeyActions();

	const navigate = useNavigate();

	function handleLogout() {
		clearUser();
		clearApiKey();
		navigate("/login");
	}

	return <Button className="mr-3" onClick={handleLogout}>Logout</Button>;
}

export default Logout;
