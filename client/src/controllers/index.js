import axios from 'axios';
import CONFIG from '../config';
const axiosInstance = axios.create({
  baseURL: CONFIG.API_LOCAL_V1
});

const sendData = data => {
  console.log(data, 'axios');
  return axiosInstance.post('/companies', data);
};

export default { sendData };
