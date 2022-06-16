import axios from 'axios';
import toast from './toast';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const { code, message } = response.data;
    if (code !== 0 && message) {
      toast.error(message);
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(error.message || 'Failed');
    return Promise.reject(error);
  }
);

export default instance;
