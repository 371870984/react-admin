import { services } from './axios';

export const getArticles = data => {
  return services.post('contract/listtemp.do', data);
};

export const getArticleDetail = data => {
  return services.post('contract/detailtemp.do', data);
};
