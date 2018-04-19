import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3001/v1/'
});

const sendData = data => {
  console.log(data, 'axios');
  return axiosInstance.post('/companies', data);
};

export default { sendData };
