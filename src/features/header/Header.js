import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./headerSlice";
import "./Header.css";

export const Header = () => {
  const dispatch = useDispatch();

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
        <a href="#menu-main-nav" id="js-menu-toggle" className="site-menu-toggle">
          <span className="screen-reader-text">Primary Menu</span>
          <span aria-hidden="true">☰</span>
        </a>
        Make sure to update menu links to work with your app.
        <ul id="menu-main-nav" className="primary-menu">
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1912">
            <a href="home.html">Home</a>
          </li>
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            <a href="about.html">About</a>
          </li>
          Should only show when user is logged out
          <li className="logged-out menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            <a href="login.html">Login</a>
          </li>
          Should only show when user is logged in
          <li className="logged-in menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
