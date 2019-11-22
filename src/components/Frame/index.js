import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar, Badge } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./logo.png";
import "./frame.less";

const { Header, Content, Sider } = Layout;

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length
  };
};
@connect(mapState)
@withRouter
class Frame extends Component {
  onMenuClick = ({ key }) => {
    this.props.history.push(key);
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
            <Badge count={this.props.notificationsCount}>
              <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }} size="large">
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
