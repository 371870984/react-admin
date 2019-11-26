import React, { Component } from "react";
import { Card, Button, Table, Tag } from "antd";
import { getArticles } from "../../services/article";

const ButtonGroup = Button.Group;

export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      columns: [
        {
          title: "投保人",
          dataIndex: "appntName",
          key: "appntName"
        },
        {
          title: "保额",
          dataIndex: "sumPrem",
          key: "sumPrem",
          render: text => {
            return text > 1000 ? <Tag color="volcano">{text}</Tag> : <Tag color="geekblue">{text}</Tag>;
          }
        },
        {
          title: "险种",
          dataIndex: "mainRiskName",
          key: "mainRiskName"
        },
        {
          title: "创建日期",
          dataIndex: "modifyDate",
          key: "modifyDate"
        },
        {
          title: "操作",
          key: "actions",
          render: (text, record) => {
            return (
              <ButtonGroup>
                <Button size="small" type="primary" onClick={this.getDetail.bind(this, record)}>
                  详情
                </Button>
              </ButtonGroup>
            );
          }
        }
      ],
      total: 150,
      page: 1
    };
  }

  getData = () => {
    getArticles({
      username: "1880100269",
      prtno: "",
      appntname: "",
      insuredname: "",
      startdate: "",
      enddate: "",
      page: this.state.page
    })
      .then(res => {
        // console.log(res);
        if (res.status === "0") {
          if (!this.updater.isMounted(this)) return;
          this.setState({
            dataSource: res.data.policyInfoList
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onPageChange = (page, pageSize) => {
    this.setState(
      {
        page: page
      },
      () => {
        this.getData();
      }
    );
  };

  getDetail = record => {
    this.props.history.push(`/admin/article/edit/${record.orderNo}`);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <Card title="文章列表" bordered={false} extra={<Button>导出Excel</Button>}>
          <Table
            dataSource={this.state.dataSource}
            rowKey={record => record.orderNo}
            columns={this.state.columns}
            pagination={{
              total: this.state.total,
              pageSize: this.state.dataSource.length,
              onChange: this.onPageChange
            }}
          />
          ;
        </Card>
      </div>
    );
  }
}
