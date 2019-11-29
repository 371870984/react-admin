import { doLoginAjax, getUserInfoAjax } from '../services/login';

const setUserInfo = data => {
  return {
    type: 'SET_USER_INFO',
    payload: {
      secret: localStorage.secret,
      agentName: data.agentName,
      username: localStorage.username
    }
  };
};

const startLogin = () => {
  return { type: 'START_LOGIN' };
};

const loginSuccess = () => {
  return { type: 'LOGIN_SUCCESS' };
};

const getUserInfo = dispatch => {
  getUserInfoAjax()
    .then(res => {
      if (res.status === '0') {
        dispatch(
          setUserInfo({
            agentName: res.data.agentName
          })
        );
        localStorage.userInfo = JSON.stringify(res.data);
        setTimeout(() => {
          dispatch(loginSuccess());
        }, 1000);
      } else {
        dispatch(loginFailed());
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const loginFailed = () => {
  return { type: 'LOGIN_FAILED' };
};

const logoffSuccess = () => {
  return { type: 'LOGOFF_SUCCESS' };
};

export const autoLogin = () => {
  return dispatch => {
    getUserInfo(dispatch);
  };
};

export const logoff = () => {
  return dispatch => {
    delete localStorage.secret;
    delete localStorage.username;
    delete localStorage.userInfo;
    // setTimeout(() => {
    dispatch(logoffSuccess());
    // }, 1000);
  };
};

export const login = userInfo => {
  return dispatch => {
    dispatch(startLogin());
    var SEC = 'abcdefgabcdefg12';
    var key = window.CryptoJS.enc.Utf8.parse(SEC);
    var srcs = window.CryptoJS.enc.Utf8.parse(userInfo.password);
    var encrypted = window.CryptoJS.AES.encrypt(srcs, key, {
      mode: window.CryptoJS.mode.ECB,
      padding: window.CryptoJS.pad.Pkcs7
    });
    doLoginAjax({
      username: userInfo.username,
      password: encrypted.toString()
    }).then(res => {
      if (res.status === 200) {
        localStorage.secret = res.data.secret;
        localStorage.username = userInfo.username;
        getUserInfo(dispatch);
      } else {
        dispatch(loginFailed());
      }
    });
  };
};

export const changeAvatar = avatarUrl => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_AVATAR',
      payload: {
        avatarUrl: avatarUrl
      }
    });
  };
};
