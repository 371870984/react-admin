import axios from 'axios';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';

const services = axios.create({
  baseURL: isDev ? 'http://bnttest.aeonlife.com.cn/' : '',
  timeout: 2000
});

services.interceptors.request.use(
  config => {
    config.data = {
      ...config.data,
      secret: localStorage.secret,
      username: localStorage.username
    };
    return config;
  },
  err => {
    console.error('请求错误！', err);
    message.error('请求错误！');
    return Promise.reject(err);
  }
);
services.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res.data;
    } else {
      message.error(res.MSG);
    }
  },
  err => {
    console.error('响应错误！', err);
    message.error('响应错误！');
    return Promise.reject(err);
  }
);

const servicesLogin = axios.create({
  baseURL: isDev ? 'http://bnttest.aeonlife.com.cn/' : '',
  timeout: 2000
});

export { services, servicesLogin };
