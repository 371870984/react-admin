import ajax from "./axios";

export const getArticles = data => {
  return ajax.services.post("contract/listtemp.do", data);
};

export const getArticleDetail = data => {
  return ajax.services.post("contract/detailtemp.do", data);
};
