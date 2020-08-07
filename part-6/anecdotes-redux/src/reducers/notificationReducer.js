const notificationReducer = (state = "Hello World", action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case "INFO":
      return action.message;
    case "ERROR":
      return action.message;
    default:
      return state;
  }
};

export const notificationGenerate = (message) => {
  return {
    type: "INFO",
    message,
  };
};

export default notificationReducer;
