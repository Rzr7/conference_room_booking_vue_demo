import { defineStore } from 'pinia';
import axiosClient from '@/helpers/http-common';
import { AxiosResponse } from 'axios';
import { IRoom, IRoomForm } from '@/types/room.types';
import { ElMessage } from 'element-plus';

const useRoomStore = defineStore('roomStore', {
  state: () => ({
    rooms: [] as IRoom[],
  }),
  actions: {
    loadRooms() {
      axiosClient.get('/room').then((roomsList: AxiosResponse<IRoom[]>) => {
        this.rooms = roomsList.data;
      });
    },
    createRoom(roomForm: IRoomForm) {
      return axiosClient.post(
        '/room',
        {
          name: roomForm.name,
          location: roomForm.location,
          capacity: roomForm.capacity,
        },
      ).then((roomDetails : AxiosResponse<IRoom>) => {
        if (roomDetails.data.id) {
          this.rooms.push(roomDetails.data);
          ElMessage({
            message: `Room ${roomDetails.data.name} created!`,
            type: 'success',
          });
        } else {
          ElMessage.error('Oops, something went wrong.');
        }
      }).catch((error) => {
        ElMessage.error(error.response.data.message || error.message);
      });
    },
  },
});

export default useRoomStore;
