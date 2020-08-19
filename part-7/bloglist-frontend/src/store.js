import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  blog: blogReducer,
  message: notificationReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
