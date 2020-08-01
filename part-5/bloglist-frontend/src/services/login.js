import axios from "axios";
const bashUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(bashUrl, credentials);
  return response.data;
};

export default { login };
