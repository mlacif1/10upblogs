import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./About.css";
import Header from "../header/Header";
import {
  selectToken,
  selectTokenIsValid,
  selectUsername,
} from "../login/loginSlice";
import { getPages } from "../../api/pagesApi";

export const About = () => {
  const dispatch = useDispatch();
  const selectedToken = useSelector(selectToken);
  const selectedTokenIsValid = useSelector(selectTokenIsValid) || true; // TODO: find out what is wrong with token validation
  const selectedUsername = useSelector(selectUsername);

  const [page, setPage] = useState(null);

  const canLoadPages =
    selectedToken && selectedTokenIsValid && selectedUsername;

  /// TODO: enable this once the token validation will work
  // useEffect(() => {
  //   if (canLoadPosts) {
  //     dispatch(verfifyToken({ token: selectedToken }));
  //   } else {
  //     history.push("/login");
  //   }
  // });

  useEffect(() => {
    if (canLoadPages) {
      getPages()
        .then(({ data }) => {
          const aboutPage = data && data.find((d) => d.slug === "about-us");
          setPage(aboutPage);
        })
        .catch((e) => {
          console.log(e);
          setPage([]);
        });
    }
  }, [canLoadPages]);

  return (
    <div>
      <Header />
      <h1>About</h1>

      {page && (
        <div
          className="page"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        ></div>
      )}
    </div>
  );
};
