import React, { Component } from "react";
import { Card, List, Avatar, Button, Badge } from "antd";
import { connect } from "react-redux";
import {
  markNotificationToRead,
  markAllNotificationToRead,
  markAllNotificationToUnread
} from "../../actions/notification";

const mapState = state => {
  return {
    notificationList: state.notifications.list
  };
};

@connect(mapState, { markNotificationToRead, markAllNotificationToRead, markAllNotificationToUnread })
class Settings extends Component {
  render() {
    const notificationList = this.props.notificationList;
    return (
      <Card
        title="通知消息"
        bordered={false}
        extra={
          <>
            <Button
              disabled={notificationList.every(item => item.hasRead === false)}
              onClick={this.props.markAllNotificationToUnread}
            >
              全部标记为未读
            </Button>
            <Button
              disabled={notificationList.every(item => item.hasRead !== false)}
              onClick={this.props.markAllNotificationToRead}
            >
              全部标记为已读
            </Button>
          </>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={notificationList}
          renderItem={item => (
            <List.Item
              extra={
                item.hasRead ? null : (
                  <Button loading={item.isLoading} onClick={this.props.markNotificationToRead.bind(this, item.id)}>
                    已读
                  </Button>
                )
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <Badge dot={!item.hasRead}>
                    <span>{item.title}</span>
                  </Badge>
                }
                description={item.content}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Settings;
