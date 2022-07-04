import axios, { AxiosRequestHeaders } from 'axios';

const axiosClient = () => {
  const headers : AxiosRequestHeaders = {};
  if (localStorage.getItem('token')) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 3000,
    headers: headers,
  });
};

axios.interceptors.response.use((response) => response, (error) => {
  if ([401, 403].includes(error.response.status)) {
    window.location.href = '/logout';
  }
  return Promise.reject(error);
});

export default axiosClient();
