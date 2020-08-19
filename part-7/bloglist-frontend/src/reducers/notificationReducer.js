const initialNotify = ["Hello world"];

const notificationReducer = (state = initialNotify, action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case "CREATE_NOTIFY":
      return action.message;
    case "LIKE_NOTIFY":
      return [`you created '${action.message[0]}'`, action.message[1]];
    case "CLEAR_NOTIFY":
      return action.message;
    default:
      return state;
  }
};

export const likeNotification = (content, timeout, previousTimeoutID) => {
  console.log("----- timeoutId -----", previousTimeoutID);
  clearTimeout(previousTimeoutID);
  return (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFY",
        message: [""],
      });
    }, 1000 * timeout);
    dispatch({
      type: "LIKE_NOTIFY",
      message: [content, timeoutID],
    });
  };
};

export const createNotification = (content) => {
  return {
    type: "CREATE_NOTIFY",
    message: content,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFY",
    message: "",
  };
};

export default notificationReducer;
