import { defineStore } from 'pinia';

const useUser = defineStore('user', {
  state: () => ({
    name: '',
    birthdate: '',
  }),
});

export default useUser;
