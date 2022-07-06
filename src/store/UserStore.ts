import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import axiosClient from '@/helpers/http-common';
import { IUser } from '@/types/user.types';

const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as IUser[],
  }),
  actions: {
    loadUsers() {
      axiosClient.get('/person').then((usersList: AxiosResponse<IUser[]>) => {
        this.users = usersList.data;
      });
    },
  },
});

export default useUserStore;
