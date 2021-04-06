import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const user = null;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg sticky-top h4">
        <a className="navbar-brand" href="/">
          <img src={logo} style={{ height: "4rem" }}></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/campus" className="nav-link">
                Campus Life
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admission" className="nav-link">
                Admission
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Courses
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#">
                  PG
                </a>
                <a className="dropdown-item" href="#">
                  UG
                </a>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user === null && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link ml-auto text-info">
                  Admin Portal
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
