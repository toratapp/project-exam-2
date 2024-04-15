import { Link } from "react-router-dom";
import Logo from '/logo.svg';


import RegisterLoginLogout from "./RegisterLoginLogout";

function ExtraHeaderMobile() {
  return ( 
    <div className="md:hidden fixed top-0 w-full extra-header-mobile h-16 flex flex-row justify-between items-center">
      <Link to="/">
        <img src={Logo} className="logo ml-4" alt="Logo" />
      </Link>
      <RegisterLoginLogout />
    </div>
   );
}

export default ExtraHeaderMobile;
