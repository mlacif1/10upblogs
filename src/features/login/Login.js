import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./loginSlice";
import "./Login.css";
import { Header } from "../header/Header";

export const Login = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Header/>
      <h1>Login</h1>

      <div className="login">
        Connect this form with the WP JWT API.
        <form method="post">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" name="username" />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
