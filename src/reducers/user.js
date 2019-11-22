const initState = {
  username: "",
  secret: "",
  isLogin: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_SECRET":
      return {
        ...state,
        secret: action.payload.secret
      };
    default:
      return state;
  }
};
