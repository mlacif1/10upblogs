import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./aboutSlice";
import "./About.css";
import { Header } from "../header/Header";

export const About = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Header/>
      <h1>About</h1>

      <div className="page">
        Retrieve about text from WP API. 10up about text...
      </div>
    </div>
  );
};
