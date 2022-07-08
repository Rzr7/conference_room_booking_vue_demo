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
    getUser(userId: number) {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      return this.users[userIndex];
    },
  },
});

export default useUserStore;
