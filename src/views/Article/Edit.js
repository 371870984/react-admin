import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { Card, Button, Form, Input, InputNumber, Spin, message } from 'antd';
import { getArticleDetail } from '../../services/article';

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
};

@Form.create({ name: 'normal_login' })
class Edit extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({
      isLoading: true
    });
    getArticleDetail({
      orderno: this.props.match.params.orderNo
    })
      .then(res => {
        if (res.status === '0') {
          this.setState({
            title: res.data.insuredInfoList[0].riskInfoList[0].riskName
          });
          this.props.form.setFieldsValue({
            name: res.data.appntInfo.name,
            riskName: res.data.insuredInfoList[0].riskInfoList[0].riskName,
            prem: res.data.insuredInfoList[0].riskInfoList[0].prem
          });
        }
      })
      .catch(err => {
        message.error('错误');
        this.setState({ isError: true });
        console.error(err);
        this.props.history.goBack();
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState(
          {
            isLoading: true
          },
          () => {
            setTimeout(() => {
              this.setState(
                {
                  isLoading: false
                },
                () => {
                  message.success('保存成功！');
                  this.props.history.push('/admin/article');
                }
              );
            }, 2000);
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.isLoading}>
        <Card
          title={this.state.title}
          bordered={false}
          extra={<Button onClick={this.props.history.goBack}>取消</Button>}
        >
          <Form onSubmit={this.handleSubmit} className='login-form' {...formItemLayout}>
            <Form.Item label='投保人'>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please input your name!' },
                  { min: 2, message: 'min-length 2!' }
                ]
              })(<Input placeholder='Name' />)}
            </Form.Item>
            <Form.Item label='险种名称'>
              {getFieldDecorator('riskName', {
                rules: [
                  { required: true, message: 'Please input your riskname!' },
                  { min: 5, message: 'min-length 5!' }
                ]
              })(<Input placeholder='Riskname' />)}
            </Form.Item>
            <Form.Item label='保费'>
              {getFieldDecorator('prem', {
                rules: [{ required: true, message: 'Please input your prem!' }]
              })(<InputNumber min={100} placeholder='prem' />)}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {this.state.isError ? <></> : <Prompt message='您确定要离开该页面吗?' />}
      </Spin>
    );
  }
}

export default Edit;
