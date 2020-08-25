import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const fetchAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// return newly created blog object
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// return newly updated blog object
const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

// retrun status code
const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response;
};

const addComment = async (blogId, newObject) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, newObject);
  return response;
};

export default {
  getAll,
  fetchAll,
  create,
  update,
  remove,
  addComment,
  setToken,
};
