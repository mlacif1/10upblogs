import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import "./Header.css";
import { logoutUser, selectToken } from "../login/loginSlice";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Header = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const selectedToken = useSelector(selectToken);
  const { width } = useWindowDimensions();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    setIsMenuVisible(width > 850);
  }, [width]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const onLogout = () => {
    dispatch(logoutUser());
    history.push("/home");
  };

  return (
    <header
      className="site-header"
      role="banner"
      itemScope="itemScope"
      itemType="http://schema.org/WPHeader"
    >
      <div
        className="site-title"
        itemScope
        itemType="http://schema.org/Organization"
      >
        10up Blog
      </div>

      <nav
        className="site-navigation"
        role="navigation"
        itemScope="itemScope"
        itemType="http://schema.org/SiteNavigationElement"
      >
        <a
          id="js-menu-toggle"
          className="site-menu-toggle"
          onClick={() => toggleMenu()}
        >
          <span className="screen-reader-text">Primary Menu</span>
          <span aria-hidden="true">☰</span>
        </a>

        <ul
          id="menu-main-nav"
          className="primary-menu"
          style={{ display: isMenuVisible ? "block" : "none" }}
        >
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1912">
            <a onClick={() => history.push("/home")}>Home</a>
          </li>
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            <a onClick={() => history.push("/about")}>About</a>
          </li>
          {!selectedToken /*|| !selectedTokenIsValid*/ && (
            <li className="logged-out menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
              <a onClick={() => history.push("/login")}>Login</a>
            </li>
          )}
          {selectedToken /*&& selectedTokenIsValid*/ && (
            <li
              className="logged-in menu-item menu-item-type-custom menu-item-object-custom menu-item-1915"
              onClick={() => onLogout()}
            >
              <a>Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
