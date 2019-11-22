import React, { Component } from "react";
import { Spin } from "antd";

export default class Loading extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", padding: '40%' }}>
        <Spin size="large" />
      </div>
    );
  }
}
