import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogin } from './actions/user';

import { adminRoutes } from './routes';
import { Frame } from './components';

const menus = adminRoutes.filter(route => route.isNav === true);

const mapState = state => {
  return {
    isLogin: state.user.isLogin,
    agentName: state.user.agentName,
    role: state.user.role
  };
};
@connect(mapState, { autoLogin })
class App extends Component {
  componentDidMount() {
    // 自动登录
    // if (localStorage.username && localStorage.secret && !this.props.isLogin) {
    //   this.props.autoLogin();
    // }
  }
  render() {
    return this.props.isLogin ? (
      <Frame menus={menus}>
        <Switch>
          {adminRoutes.map(route => {
            return (
              <Route
                path={route.pathname}
                key={route.pathname}
                exact={route.exact}
                render={routerProps => {
                  // 权限控制
                  const hasPermission = route.roles.includes(this.props.role);
                  return hasPermission ? <route.component {...routerProps} /> : <Redirect to='/admin/noauth' />;
                }}
              />
            );
          })}
          <Redirect to='/admin/dashboard' from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame>
    ) : (
      <Redirect to='/login' />
    );
  }
}

export default App;
