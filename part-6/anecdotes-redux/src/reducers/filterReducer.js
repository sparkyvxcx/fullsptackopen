const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH":
      return action.term;
    default:
      return state;
  }
};

export const filterChange = (term) => {
  return {
    type: "SEARCH",
    term,
  };
};

export default filterReducer;
