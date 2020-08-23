import userService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "CREATE_USER":
      return [...state, action.data];
    case "UPDATE_USER":
      const updatedUser = action.data;
      const uid = updatedUser.id;
      return state.map((user) => (user.id === uid ? updatedUser : user));
    case "REMOVE_USER":
      const rid = action.data;
      return state.filter((user) => user.id !== rid);
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    // fetch an array containing user
    const data = await userService.fetchAll();
    dispatch({ type: "INIT_USER", data });
  };
};

export default reducer;
