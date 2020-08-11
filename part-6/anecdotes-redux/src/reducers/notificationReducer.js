const initializeNotify = ["Hello World"];

const notificationReducer = (state = initializeNotify, action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case "VOTE_NOTIFY":
      return action.message;
    case "CREATE_NOTIFY":
      return [`you created '${action.message[0]}'`, action.message[1]];
    case "CLEAR_NOTIFY":
      return action.message;
    default:
      return state;
  }
};

export const voteNotification = (content, timeout, previousTimeoutID) => {
  console.log("----- timeoutId -----", previousTimeoutID);
  clearTimeout(previousTimeoutID);
  return (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFY",
        message: "",
      });
    }, 1000 * timeout);
    dispatch({
      type: "VOTE_NOTIFY",
      message: [content, timeoutID],
    });
  };
};

export const createNotification = (content) => {
  return {
    type: "CREATE_NOTIFY",
    message: [content],
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFY",
    message: [""],
  };
};

export default notificationReducer;
