import axios from 'axios';
import { getSessionStorageItem } from './sessionStorage';

axios.interceptors.request.use((req) => {
  const token = getSessionStorageItem('token');
  if (token) {
    req.headers.authorization = token;
  }
  return req;
});

export default axios;
