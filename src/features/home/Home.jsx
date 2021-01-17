import React, { useEffect, useState } from "react";
import { useSelector /*, useDispatch */ } from "react-redux";
import "./Home.css";
import Header from "../header/Header";
import {
  selectToken,
  selectTokenIsValid,
  selectUsername,
  // verfifyToken,
} from "../login/loginSlice";
// import { useHistory } from "react-router-dom";
import { getPosts } from "../../api/postsApi";
import { Post } from "../post/Post";

export const Home = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const selectedToken = useSelector(selectToken);
  const selectedTokenIsValid = useSelector(selectTokenIsValid) || true; // TODO: find out what is wrong with token validation
  const selectedUsername = useSelector(selectUsername);

  const [posts, setPosts] = useState([]);

  const canLoadPosts =
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
    if (canLoadPosts) {
      getPosts()
        .then(({ data }) => {
          setPosts(data);
        })
        .catch((e) => {
          console.log(e);
          setPosts([]);
        });
    }
  }, [canLoadPosts]);

  return (
    <div>
      <Header />

      {canLoadPosts && (
        <section key="1" className="welcome logged-in">
          Welcome {selectedUsername}!
        </section>
      )}

      {canLoadPosts && (
        <div itemScope itemType="https://schema.org/Blog">
          {posts.map((post, i) => {
            const {
              id,
              title: { rendered: renderedTitle },
              date,
              _links: {
                author: authorHref,
              },
              content: { rendered: renderedContent },
            } = post;
  
            return (
              <Post key={`${id}-${i}`} renderedTitle={renderedTitle} authorHref={authorHref[0].href} renderedContent={renderedContent} id={`${id}-${i}`} date={date}/>
            );
          })}
        </div>
      )}
    </div>
  );
};
