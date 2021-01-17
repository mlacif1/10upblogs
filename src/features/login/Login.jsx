import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  selectLoading,
  selectToken,
  selectTokenIsValid,
} from "./loginSlice";
import "./Login.css";
import Header from "../header/Header";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [usernameTxt, setUsernameTxt] = useState("");
  const [passwordTxt, setPasswordTxt] = useState("");

  const loading = useSelector(selectLoading);
  const selectedToken = useSelector(selectToken);
  const selectedTokenIsValid = useSelector(selectTokenIsValid);

  useEffect(() => {
    if (selectedToken && selectedTokenIsValid) {
      history.push("/home");
    }
  }, [selectedToken, selectedTokenIsValid]);

  const onLogin = () => {
    dispatch(getToken({ username: usernameTxt, password: passwordTxt }));
  };

  if (loading === "pending") {
    return (
      <Backdrop open={loading === "pending"}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div>
      <Header />
      <h1>Login</h1>

      <div className="login">
        <form method="post">
          <div>
            <label htmlFor="username">Username</label>{" "}
            <input
              id="username"
              type="text"
              name="username"
              onChange={(e) => setUsernameTxt(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>{" "}
            <input
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPasswordTxt(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Submit" onClick={() => onLogin()} />
          </div>
        </form>
      </div>
    </div>
  );
};
