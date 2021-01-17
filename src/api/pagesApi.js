import axios from "axios";

export const getPages = () => {
  const config = {
    crossdomain: true,
  };

  return axios.get("https://js1.10up.com/wp-json/wp/v2/pages", config);
};
