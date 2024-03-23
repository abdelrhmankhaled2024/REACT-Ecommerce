import React, { useContext, useEffect } from "react";
import logo from "../../assests/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../context/cartContext";

export default function Navbar() {
  let { counter, setCounter, getCart } = useContext(cartContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to '/signin' path
    navigate("/signin");
  };
  useEffect(() => {
    (async () => {
      let data = await getCart();
      setCounter(data.numOfCartItems);
    })();
  }, []);
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <NavLink
                  className="nav-link position-relative"
                  aria-current="page"
                  to="/cart"
                >
                  Cart
                  <i className="fa-solid fa-cart-shopping"></i>
                  {counter ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {counter}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              <li
                onClick={handleSignOut}
                className="nav-item pt-2 cursor-pointer"
              >
                SignOut
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
