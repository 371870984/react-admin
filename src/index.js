import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
import "./index.less";

import { mainRoutes } from "./routes";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={routerProps => {
              return <App {...routerProps} />;
            }}
          />
          {mainRoutes.map(route => {
            return <Route path={route.pathname} component={route.component} key={route.pathname} />;
          })}
          <Redirect to="/admin" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
