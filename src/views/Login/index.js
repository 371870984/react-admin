import React from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import { doLogin } from "../../services/login";

import { setUserSecret } from "../../actions/user";
import "./login.less";

const mapState = state => {
  return {
    secret: state.user.secret,
    username: state.user.username
  };
};

@connect(mapState, { setUserSecret })
@Form.create()
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.doLogin(values);
      }
    });
  };
  doLogin = values => {
    var SEC = "abcdefgabcdefg12";
    var key = window.CryptoJS.enc.Utf8.parse(SEC);
    var srcs = window.CryptoJS.enc.Utf8.parse(values.password);
    var encrypted = window.CryptoJS.AES.encrypt(srcs, key, {
      mode: window.CryptoJS.mode.ECB,
      padding: window.CryptoJS.pad.Pkcs7
    });

    doLogin({
      username: values.username,
      password: encrypted.toString()
    }).then(res => {
      console.log(res);
      if (res.status === "0") {
        this.dispatch(setUserSecret(res.secret))
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="登录" bordered={false} className="login-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(
              <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }]
            })(
              <Input
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
            })(<Checkbox>Remember me</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default Login;
