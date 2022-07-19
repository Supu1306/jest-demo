import axios from "axios";

export const Post = (url, requestContent) => {
  return axios.post(url, requestContent);
};

export const Get = (url) => {
  return axios.get(url);
};

export const Put = (url, requestContent) => {
  return axios.put(url, requestContent);
};
