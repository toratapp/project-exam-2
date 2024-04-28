import { Navbar, Menu } from "react-daisyui";
import { Link } from "react-router-dom";
import Logo from '/logo.svg';
import ExtraHeaderMobile from "./ExtraHeaderMobile";
import RegisterLoginLogout from "./RegisterLoginLogout";
import { useUserName } from "../../../../stores/useUserStore";
import { useToken } from "../../../../stores/useUserStore";

function Nav() {
  const name = useUserName();
  const token = useToken();

  return (
    <div>
      <ExtraHeaderMobile />
      <Navbar className="navbar-with-buttons fixed md:h-16 md:justify-between z-50">
        <div className="hidden md:block">
          <Link to="/">
            <img src={Logo} className="logo p-0.5 md:p-0 ml-2 md:ml-4" alt="Logo" />
          </Link>
        </div>
        {token && <div className="navbar__buttons relative block w-full md:w-80">
          <Menu horizontal={true} className="flex justify-between ml-4 mr-4">
            <Menu.Item className="nav__icon-button">
              <Link to="/"><i className="fa-solid fa-house"></i></Link>
            </Menu.Item>
            <Menu.Item className="nav__icon-button">
              <Link to="/create-post"><i className="fa-solid fa-square-plus"></i></Link>
            </Menu.Item>
            <Menu.Item className="nav__icon-button">
              <Link to={`/profiles/${name}`}><i className="fa-solid fa-user"></i></Link>
            </Menu.Item>
            <Menu.Item className="nav__icon-button">
              <Link to="/profiles"><i className="fa-solid fa-users"></i></Link>
            </Menu.Item>
          </Menu>
          </div>}
        <div className="hidden md:block mr-1">
          <RegisterLoginLogout />
        </div>
      </Navbar>
    </div>
  );
}

export default Nav;
