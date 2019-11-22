import axios from "axios";
import {message} from 'antd'

const isDev = process.env.NODE_ENV === "development";

const instance = axios.create({
  baseURL: isDev ? "http://bnttest.aeonlife.com.cn/" : "",
  timeout: 2000
});

instance.interceptors.request.use(
  config => {
    config.data = {
      ...config.data,
      secret: "cd1e21262db111f62b861d49a8ceaf4e",
      username: '1880100269'
    };
    return config;
  },
  err => {
    console.error("请求错误！", err);
    message.error('请求错误！');
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res.data;
    } else {
      message.error(res.MSG);
    }
  },
  err => {
    console.error("响应错误！", err);
    message.error('响应错误！');
    return Promise.reject(err);
  }
);

export default instance;
