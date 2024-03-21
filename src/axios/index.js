// axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8002',  // Replace with your API base URL
  headers: {
    'Content-Type': 'multipart/form-data',  // Set the default Content-Type
  },
});

export default axiosInstance;