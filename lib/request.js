import axios from 'axios';
import toast from './toast';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  function (response) {
    const { code, message } = response.data;
    if (code !== 0 && message) {
      toast.error(message);
    }
    return response.data;
  },
  function (error) {
    const {
      response: { data },
    } = error;
    const msg = data?.message || error.message || 'Failed';
    toast.error(msg);
    return Promise.reject({ msg, stack: error });
  }
);

export default instance;
