import axios from "./axios";

export const getArticles = data => {
  return axios.post("contract/listtemp.do", data);
};

export const getArticleDetail = data => {
  return axios.post("contract/detailtemp.do", data);
};