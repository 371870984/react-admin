import axios from "./axios";

export const doLogin = data => {
  return axios.post("member/login.do", data);
};