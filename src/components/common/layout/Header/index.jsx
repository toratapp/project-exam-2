import { Navbar, Menu } from "react-daisyui";
import { Link, NavLink } from "react-router-dom";
import Logo from '/logo.svg';


function Nav() {
  return (  
    <Navbar className="">
    <div className="flex-1">
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
        </Menu>
      </div>
  </Navbar>
  );
}

export default Nav;
