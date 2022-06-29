import { defineStore } from 'pinia';
import axiosClient from '@/helpers/http-common';
import { ITokenResponse, IUser } from '@/types/user.types';
import { AxiosResponse } from 'axios';

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
    async login(username: string, password: string) {
      const tokenDetails : AxiosResponse<ITokenResponse> = await axiosClient.post(
        loginUrl,
        {
          username: username,
          password: password,
        },
      );
      // update pinia state
      const tokenString = tokenDetails.data.token;
      this.username = username;
      this.token = tokenString;
      this.isLoggedIn = true;

      localStorage.setItem('token', tokenString);
      // redirect to previous url or default to home page
      window.location.href = '/';
    },
    async register(username: string, password: string, name: string, birthdate: string) {
      const tokenDetails : AxiosResponse<ITokenResponse> = await axiosClient.post(
        registerUrl,
        {
          username: username,
          password: password,
          name: name,
          birthdate: birthdate,
        },
      );
      // update pinia state
      const tokenString = tokenDetails.data.token;
      this.username = username;
      this.token = tokenString;
      this.isLoggedIn = true;

      localStorage.setItem('token', tokenString);
      // redirect to previous url or default to home page
      window.location.href = '/';
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
    async loadUserData() {
      const userDetails : AxiosResponse<IUser> = await axiosClient.get(userDetailsUrl);
      this.username = userDetails.data.username;
      this.name = userDetails.data.name;
      this.birthdate = userDetails.data.birthdate;
    },
  },
});

export default useAuthStore;
