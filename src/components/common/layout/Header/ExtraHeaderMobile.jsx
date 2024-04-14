import { Link, NavLink } from "react-router-dom";
import Logo from '/logo.svg';
import Logout from "../../auth/Logout";
import { useToken } from "../../../../stores/useUserStore";
import { Button, Menu } from "react-daisyui";

function ExtraHeaderMobile() {
  const token = useToken();

  return ( 
    <div className="sm:hidden fixed top-0 w-full extra-header-mobile h-16 flex flex-row justify-between items-center">
      <Link to="/">
        <img src={Logo} className="logo ml-3" alt="Logo" />
      </Link>
      {!token ? (
        <div className="flex">
          <Menu.Item>
            <NavLink to="/register">
              <Button className="mr-3">Register</Button>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/login">
              <Button className="mr-3">Login</Button>
            </NavLink>
          </Menu.Item>
        </div>
      ) : (
        <Logout />
      )}
    </div>
   );
}

export default ExtraHeaderMobile;



