import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "./notecontext/NoteContext";
import "./css/styles.css";
import Alert from "./Alert";
// import NoteState from "./notecontext/noteState";

function Navbar() {
  // const {Name} = useContext(NoteState);
  const location = useLocation();
  const history = useNavigate();
  const { response } = useContext(NoteContext);
  const [pathname, setPathname] = useState(location.pathname);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid nav-item navbar-nav">
          <Link
            className={` ${pathname == "/" ? "navbar-brand mx-1" : "nav-link"}`}
            to="/"
          >
            Home{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") &&
                localStorage.getItem("token") !== undefined && (
                  <li className="nav-item">
                    <Link
                      className={` ${
                        location.pathname == "/Notes"
                          ? "navbar-brand mx-1"
                          : "nav-link"
                      }`}
                      // aria-current="page"
                      to="/Notes"
                    >
                      Notes
                    </Link>
                  </li>
                )}

              <li className="nav-item">
                <Link
                  className={` ${
                    pathname == "/About" ? "navbar-brand mx-1" : "nav-link"
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {localStorage.getItem("token") === null ? (
            <div className="float-left">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary" to="/signUp" role="button">
                SignUp
              </Link>
            </div>
          ) : (
            <li className="nav-item">
              <span
                className="btn btn-primary"
                onClick={() => {
                  localStorage.clear();
                  history("/");
                }}
              >
                LogOut
              </span>
            </li>
          )}
        </div>
      </nav>
      {response.msg && <Alert className="fixed-top" />}
      {/* <Alert/> */}
    </>
  );
}

export default Navbar;
