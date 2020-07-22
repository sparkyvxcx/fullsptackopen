import axios from "axios";
const endpoint = "/api/persons";

const getAll = () => {
  const request = axios.get(endpoint);
  return request.then((response) => response.data);
};

const createEntry = (newPerson) => {
  const request = axios.post(endpoint, newPerson);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${endpoint}/${id}`);
  return request.then((response) => response.status);
};

const updateEntry = (id, newPerson) => {
  const request = axios.put(`${endpoint}/${id}`, newPerson);
  return request.then((response) => response.data);
};

export default { getAll, createEntry, deleteEntry, updateEntry };
