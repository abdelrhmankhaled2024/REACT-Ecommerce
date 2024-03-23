import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assests/images/freshcart-logo.svg";
import Footer from './../Footer/Footer';

export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
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
            <span className="navbar-toggler-icon" />
          </button>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <NavLink
                className="nav-link position-relative "
                aria-current="page"
                to="signin"
              >
                Signin
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink
                className="nav-link position-relative "
                aria-current="page"
                to="signup"
              >
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <Footer/>
    </>
  );
}
