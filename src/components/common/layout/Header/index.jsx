import { Navbar, Menu } from "react-daisyui";
import { Link, NavLink } from "react-router-dom";
import Logo from '/logo.svg';
import Logout from "../../auth/Logout";

function Nav() {
  return (  
    <Navbar className="">
      <div className="hidden sm:block logo-div-nav">
        <Link to="/">
          <img src={Logo} className="logo p-0.5 ml-2" alt="Logo" />
        </Link>
      </div>
      <div className="flex-none mr-2">
        <Menu horizontal={true} className="px-1">
          <Menu.Item>
            <NavLink to="/create-post"><i className="fa-solid fa-square-plus"></i></NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/create-post"><i className="fa-solid fa-square-plus"></i></NavLink>
          </Menu.Item>
          <Menu.Item>
            <label htmlFor="hamburger-menu"><i className="fa-solid fa-bars"></i></label>
            <input type="checkbox" id="hamburger-menu" />
            <nav>
              <Menu>
                <Menu.Item>
                  <NavLink to="/my-profile">My profile</NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/profiles">All profiles</NavLink>
                </Menu.Item>
                <Logout />
              </Menu>
            </nav>
          </Menu.Item>
        </Menu>
      </div>
    </Navbar>
  );
}

export default Nav;
