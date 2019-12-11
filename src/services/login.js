import { services, servicesLogin } from './axios';

export const doLoginAjax = data => {
  return servicesLogin.post('member/login.do', data);
};

export const getUserInfoAjax = data => {
  return services.post('member/info.do', data);
};
