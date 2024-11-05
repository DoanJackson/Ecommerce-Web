import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../Login/AuthContext";

function NavBar() {
  const { auth, logout } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            Home page
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item d-flex">
                {!auth.isLog ? (
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={({ isPending, isTransitioning }) => {
                      return {
                        color: isPending ? "red" : "white",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    Login
                  </NavLink>
                ) : (
                  <div className="nav-link log-out" onClick={logout}>
                    Log out
                  </div>
                )}
              </li>
              <li className="nav-item d-flex">
                {auth.isLog && (
                  <NavLink to="user" className="nav-link log-out">
                    User
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
