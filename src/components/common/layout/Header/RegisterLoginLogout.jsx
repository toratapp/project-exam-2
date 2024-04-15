import { Button, Menu } from "react-daisyui";
import { NavLink } from "react-router-dom";
import Logout from "../../auth/Logout";
import { useToken } from "../../../../stores/useUserStore";

function RegisterLoginLogout() {
  const token = useToken();
  
  return ( 
    <div className="register-login-logout">
      {!token ? (
        <div className="flex">
          <Menu.Item>
            <NavLink to="/register">
              <Button className="mr-3">Register</Button>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/login">
              <Button className="mr-4">Login</Button>
            </NavLink>
          </Menu.Item>
        </div>
      ) : (
        <Logout />
      )}
    </div>
   );
}

export default RegisterLoginLogout;
