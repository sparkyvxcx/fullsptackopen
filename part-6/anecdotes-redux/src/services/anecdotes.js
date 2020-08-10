import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const fetchAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createOne = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export default { fetchAll, createOne };
