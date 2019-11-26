import ajax from "./axios";

export const doLoginAjax = data => {
  return ajax.servicesLogin.post("member/login.do", data);
};

export const getUserInfoAjax = data => {
  return ajax.services.post("member/info.do", data);
};
