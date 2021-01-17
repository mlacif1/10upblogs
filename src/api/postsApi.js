import axios from "axios";

export const getPosts = () => {
  const config = {
    crossdomain: true,
  };

  return axios.get("https://js1.10up.com/wp-json/wp/v2/posts", config);
};

export const fetchAuthor = (url) => {
  const config = {
    crossdomain: true,
  };

  return axios.get(url, config);
};
