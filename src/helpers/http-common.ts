import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

axios.interceptors.response.use((response) => response, (error) => {
  if ([401, 403].includes(error.response.status)) {
    window.location.href = '/logout';
  }
  return Promise.reject(error);
});
