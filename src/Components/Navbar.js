import React from "react";
import {NavLink} from "react-router-dom";

export default function Navbar() {
  // const location = useLocation();
  return (
    
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            YourNoteook
          </NavLink>
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
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <NavLink to="/login" className="btn btn-outline-danger mx-1" type="submit">
                Login
              </NavLink>
              <NavLink to="/SignUp" className="btn btn-outline-danger mx-1" type="submit">
                SignUp
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
