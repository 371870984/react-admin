import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
// import { doLogin, getUserInfo } from "../../services/login";

import { login, logoff } from "../../actions/user";
import "./login.less";

const mapState = state => {
  return {
    isLoading: state.user.isLoading,
    isLogin: state.user.isLogin,
    agentName: state.user.agentName
  };
};

@connect(mapState, { login, logoff })
@Form.create()
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.props.login(values);
      }
    });
  };

  componentDidMount() {
    this.props.logoff();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.isLogin ? (
      <Redirect to="/admin" />
    ) : (
      <Card title="登录" bordered={false} className="login-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(
              <Input
                disabled={this.props.isLoading}
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }]
            })(
              <Input
                disabled={this.props.isLoading}
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>)}
            <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default Login;
