import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar, Badge, Dropdown } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoff } from "../../actions/user";

import logo from "./logo.png";
import "./frame.less";

const { Header, Content, Sider } = Layout;

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    agentName: state.user.agentName
  };
};
@connect(mapState, { logoff })
@withRouter
class Frame extends Component {
  onMenuClick = ({ key }) => {
    this.props.history.push(key);
  };
  onDropdownClick = ({ key }) => {
    if (key === "0") {
      this.props.logoff();
    }
  };
  render() {
    const selectedKeyArr = this.props.location.pathname.split("/");
    selectedKeyArr.length = 3;
    return (
      <Layout style={{ height: "100%" }}>
        <Header className="header">
          <div className="logo">
            <img src={logo} alt="surface" />
          </div>
          <div>
            <Dropdown
              overlay={
                <Menu onClick={this.onDropdownClick.bind(this)}>
                  <Menu.Item key="0">
                    <span>退出登录</span>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link">
                {this.props.agentName}
                {/* <Icon type="down" /> */}
              </a>
            </Dropdown>
            <Badge count={this.props.notificationsCount}>
              <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }} size="default">
                Y
              </Avatar>
            </Badge>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              onClick={this.onMenuClick}
              mode="inline"
              selectedKeys={[selectedKeyArr.join("/")]}
              style={{ height: "100%", borderRight: 1 }}
            >
              {this.props.menus.map(menu => {
                return (
                  <Menu.Item key={menu.pathname}>
                    <Icon type={menu.icon} />
                    {menu.title}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                background: "#fff",
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Frame;
