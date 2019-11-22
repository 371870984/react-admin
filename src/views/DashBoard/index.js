import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from "bizcharts";
import DataSet from "@antv/data-set";

import "./dashBoard.less";

class Donut extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: "事例一",
        count: 40
      },
      {
        item: "事例二",
        count: 21
      },
      {
        item: "事例三",
        count: 17
      },
      {
        item: "事例四",
        count: 13
      },
      {
        item: "事例五",
        count: 9
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart height={window.innerHeight} data={dv} scale={cols} padding={[80, 100, 80, 80]} forceFit>
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend position="right" offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>'
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default class DashBoard extends Component {
  render() {
    const colorMap = [
      "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6),
      "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6),
      "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6),
      "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
    ];
    return (
      <>
        <Card title="概览" bordered={false}>
          <Row gutter={16}>
            {colorMap.map(item => {
              return (
                <Col className="gutter-row" span={6} key={item}>
                  <div className="gutter-box" style={{ backgroundColor: item }}>
                    col-6
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card>
        <Card title="浏览量" bordered={false}>
          <Donut />
        </Card>
      </>
    );
  }
}
