const initState = {
  username: localStorage.username || "",
  secret: localStorage.secret || "",
  agentName: localStorage.userInfo ? JSON.parse(localStorage.userInfo).agentName : "",
  isLogin: localStorage.username && localStorage.secret && localStorage.userInfo,
  isLoading: false,
  role: "001",
  avatarUrl: "http://i1.fuimg.com/704526/c7c995237710ff0d.jpg"
};

export default (state = initState, action) => {
  switch (action.type) {
    case "START_LOGIN":
      return {
        ...state,
        isLoading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        role: "001"
      };
    case "LOGIN_FAILED":
      return initState;
    case "LOGOFF_SUCCESS":
      return {
        username: "",
        secret: "",
        agentName: "",
        isLogin: false,
        isLoading: false,
        role: ""
      };
    case "SET_USER_INFO":
      return {
        ...state,
        secret: action.payload.secret,
        username: action.payload.username,
        agentName: action.payload.agentName
      };
    case "CHANGE_AVATAR":
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl
      };
    default:
      return state;
  }
};
