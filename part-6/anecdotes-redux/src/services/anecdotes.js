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

const updateOne = async (anecdote) => {
  const response = axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response;
};

export default { fetchAll, createOne, updateOne };
