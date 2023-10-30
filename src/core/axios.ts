import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8090/api/v1/';

axios.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const { token } = Cookies.get();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
