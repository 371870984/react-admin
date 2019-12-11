import React, { Component } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { Chart, Geom, Tooltip, Label, View } from 'bizcharts';
import DataSet from '@antv/data-set';

import './dashBoard.less';
import axios from 'axios';

class Donut extends React.Component {
  state = {
    isLoaded: false,
    dv: null
  };
  componentDidMount() {
    axios
      .get('https://alifd.alibabausercontent.com/materials/@bizcharts/other-periodic-table/0.3.0/mock.json')
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoaded: true,
            dv: new DataSet.View().source(res.data, {
              type: 'hex'
            })
          });
        }
      });
  }
  render() {
    return this.state.isLoaded ? (
      <Chart width={700} height={450} forceFit={false}>
        <Geom type='point' position='carat*price' />
        <Tooltip showTitle={false} />
        <View data={this.state.dv}>
          <Geom
            type='polygon'
            position='x*y'
            color='category'
            style={{
              stroke: 'white',
              lineWidth: 2
            }}
            tooltip='symbol*name*number*atomic_mass*category'
          >
            <Label
              content='symbol'
              offset={0}
              textStyle={{
                fontSize: 450 / 24,
                fontWeight: 500
              }}
            />
          </Geom>
        </View>
      </Chart>
    ) : (
      <Spin />
    );
  }
}

export default class DashBoard extends Component {
  render() {
    const colorMap = [
      '#' + ((Math.random() * 0x1000000) << 0).toString(16),
      '#' + ((Math.random() * 0x1000000) << 0).toString(16),
      '#' + ((Math.random() * 0x1000000) << 0).toString(16),
      '#' + ((Math.random() * 0x1000000) << 0).toString(16)
    ];
    return (
      <>
        <Card title='概览' bordered={false}>
          <Row gutter={16}>
            {colorMap.map(item => {
              return (
                <Col className='gutter-row' span={6} key={item}>
                  <div className='gutter-box' style={{ backgroundColor: item }}>
                    col-6
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card>
        <Card title='浏览量' bordered={false}>
          <Donut />
        </Card>
      </>
    );
  }
}
