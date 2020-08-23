import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";

const reducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  message: notificationReducer,
  signeduser: loginReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
