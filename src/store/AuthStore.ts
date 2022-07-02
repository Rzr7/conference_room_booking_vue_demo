import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import axiosClient from '@/helpers/http-common';
import { ITokenResponse, IUser } from '@/types/user.types';

const loginUrl = '/auth/login';
const registerUrl = '/auth/register';
const userDetailsUrl = '/person/info';

const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('token'),
    username: '',
    name: '',
    birthdate: '',
    isLoggedIn: !!localStorage.getItem('token'),
  }),
  actions: {
    login(username: string, password: string) {
      axiosClient.post(
        loginUrl,
        {
          username: username,
          password: password,
        },
      ).then((tokenDetails : AxiosResponse<ITokenResponse>) => {
        this.setLoggedIn(tokenDetails.data.token);
      });
    },
    register(username: string, password: string, name: string, birthdate: string) {
      axiosClient.post(
        registerUrl,
        {
          username: username,
          password: password,
          name: name,
          birthdate: birthdate,
        },
      ).then((tokenDetails : AxiosResponse<ITokenResponse>) => {
        this.setLoggedIn(tokenDetails.data.token);
      });
    },
    setLoggedIn(token: string) {
      localStorage.setItem('token', token);
      window.location.href = '/';
    },
    logout() {
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
    loadUserData() {
      axiosClient.get(userDetailsUrl).then((userDetails: AxiosResponse<IUser>) => {
        this.username = userDetails.data.username;
        this.name = userDetails.data.name;
        this.birthdate = userDetails.data.birthdate;
      });
    },
  },
});

export default useAuthStore;
