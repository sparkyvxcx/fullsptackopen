import loginService from "../services/login";
import blogService from "../services/blogs";

const reducer = (state = null, action) => {
  console.log(action.type);

  switch (action.type) {
    case "USER_INIT":
      return action.data;
    case "USER_LOGIN":
      return action.data;
    case "USER_LOGOUT":
      return action.data;
    default:
      return state;
  }
};

export const userInit = (user) => {
  blogService.setToken(user.token);
  return { type: "USER_INIT", data: user };
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({ type: "USER_LOGIN", data: user });
  };
};

export const userLogout = () => {
  return { type: "USER_LOGOUT", data: null };
};

export default reducer;
