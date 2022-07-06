import axios, { AxiosRequestHeaders } from 'axios';
import { ElMessage } from 'element-plus/es';

const axiosClient = () => {
  const headers : AxiosRequestHeaders = {};
  if (localStorage.getItem('token')) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 3000,
    headers: headers,
  });

  instance.interceptors.response.use((response) => response, (error) => {
    if ([401, 403].includes(error.response.status)) {
      window.location.href = '/logout';
    }
    ElMessage.error(error.response.data.apierror.message || error.message);
    return Promise.reject(error);
  });

  return instance;
};

export default axiosClient();
