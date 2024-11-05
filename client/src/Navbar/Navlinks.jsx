import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <nav>
      <NavLink to="/">Home page</NavLink>
      <NavLink to="login">Login page</NavLink>
    </nav>
  );
}
export default NavLinks;
