import { Navbar, Menu } from "react-daisyui";
import { Link } from "react-router-dom";
import Logo from '/logo.svg';
import ExtraHeaderMobile from "./ExtraHeaderMobile";

function Nav() {
  return (
    <div>
      <ExtraHeaderMobile />
      <Navbar className="navbar-with-buttons fixed">
        <div className="hidden sm:block">
          <Link to="/">
            <img src={Logo} className="logo p-0.5 ml-2" alt="Logo" />
          </Link>
        </div>
        <div className="navbar__buttons relative">
          <Menu horizontal={true}>
            <Menu.Item>
              <Link to="/"><i className="fa-solid fa-house"></i></Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/create-post"><i className="fa-solid fa-square-plus"></i></Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/"><i className="fa-solid fa-magnifying-glass"></i></Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/"><i className="fa-solid fa-user"></i></Link>
            </Menu.Item>
          </Menu>
        </div>
      </Navbar>
    </div>
  );
}

export default Nav;
