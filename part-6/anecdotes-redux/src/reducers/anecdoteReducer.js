import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    default:
      return state;
  }
};

export const generateVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createOne(content);
    dispatch({ type: "NEW_ANECDOTE", data: newAnecdote });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.fetchAll();
    dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
  };
};

export default reducer;
