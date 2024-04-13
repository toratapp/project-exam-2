import { Outlet } from "react-router-dom";
import Header from "./Header"
import FooterLayout from "./FooterLayout";

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <FooterLayout />
    </div>
  );
}

export default Layout;
