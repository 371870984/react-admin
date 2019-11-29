import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Upload, Icon, message, Progress } from 'antd';
import axios from 'axios';
import { changeAvatar } from '../../actions/user';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const mapState = state => {
  return {
    avatarUrl: state.user.avatarUrl
  };
};

@connect(mapState, { changeAvatar })
class Avatar extends React.Component {
  state = {
    loading: false,
    percent: 0
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    this.setState({
      imageUrl: '',
      loading: false
    });
    return isJpgOrPng && isLt2M;
  };

  handleCustomRequest = ({ file }) => {
    this.setState({ loading: true, percent: 0 });
    const fileData = new FormData();
    fileData.append(
      'Token',
      '18372bf9c3726a6f5063bc03b2c0aedacb81d95c:7z5RvdEKuM61bGA1heoMjrdsVns=:eyJkZWFkbGluZSI6MTU3NDc0OTMxNiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA0NTI2IiwiYWlkIjoiMTY0ODA2MCIsImZyb20iOiJmaWxlIn0='
    );
    fileData.append('file', file);
    axios
      .post('http://up.imgapi.com/', fileData, {
        onUploadProgress: progressEvent => {
          const percent = parseInt((progressEvent.loaded / progressEvent.total) * 100);
          if (this.updater.isMounted(this)) {
            this.setState({
              percent
            });
          }
        }
      })
      .then(res => {
        if (res.status === 200) {
          if (this.updater.isMounted(this)) {
            this.setState({
              imageUrl: res.data.linkurl,
              loading: false
            });
            this.props.changeAvatar(res.data.linkurl);
          }
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          imageUrl: '',
          loading: false,
          percent: 0
        });
      });
  };

  render() {
    const uploadButton = !this.state.loading ? (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    ) : (
      <Progress width={104} type='circle' percent={this.state.percent} />
    );

    const { imageUrl } = this.state;
    return (
      <>
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          disabled={this.state.loading}
          beforeUpload={this.beforeUpload}
          customRequest={this.handleCustomRequest}
        >
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <Card title='个人中心'>
        <Avatar />
      </Card>
    );
  }
}
export default Profile;
