const notificationReducer = (state = "Hello World", action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case "VOTE_NOTIFY":
      return `you voted '${action.message}'`;
    case "CREATE_NOTIFY":
      return `you created '${action.message}'`;
    case "CLEAR_NOTIFY":
      return action.message;
    default:
      return state;
  }
};

export const voteNotification = (message) => {
  return {
    type: "VOTE_NOTIFY",
    message,
  };
};

export const createNotification = (message) => {
  return {
    type: "CREATE_NOTIFY",
    message,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFY",
    message: "",
  };
};

export default notificationReducer;
