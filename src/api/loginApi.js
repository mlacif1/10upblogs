import axios from "axios";

export const fetchLoginToken = (username, password) => {
  const config = {
    crossdomain: true
  };

  const bodyParameters = {
    username,
    password
  };

  return axios.post(
    "https://js1.10up.com/wp-json/jwt-auth/v1/token",
    bodyParameters,
    config
  );
};


export const validateLoginToken = (token) => {
    const config = {
      crossdomain: true,
      headers: {
        Authentication: `Bearer ${token}`,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };
    
    return axios.post(
      "https://js1.10up.com/wp-json/jwt-auth/v1/token/validate",
      null,
      config
    );
  };
  