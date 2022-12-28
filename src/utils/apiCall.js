import axios from "axios";

const apiCall = async (res) => {
  const response = await axios(res);
  return response.data;
};

export default apiCall;
