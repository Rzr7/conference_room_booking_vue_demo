import { defineStore } from 'pinia';
import axiosClient from '@/helpers/http-common';
import { AxiosResponse } from 'axios';
import { IRoom, ITimeSlot } from '@/types/room.types';
import { ElMessage } from 'element-plus';
import { delay } from '@/helpers/utils';

const useRoomStore = defineStore('roomStore', {
  state: () => ({
    rooms: [] as IRoom[],
    isLoaded: false,
  }),
  actions: {
    loadRooms() {
      axiosClient.get('/room').then((roomsList: AxiosResponse<IRoom[]>) => {
        this.rooms = roomsList.data;
        this.isLoaded = true;
      });
    },
    async getRoomData(roomId: number) : Promise<IRoom> {
      if (!this.isLoaded) {
        await delay(200); // wait before loaded
        return this.getRoomData(roomId);
      }
      const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
      return this.rooms[roomIndex];
    },
    createRoom(roomForm: IRoom) {
      return axiosClient.post(
        '/room',
        roomForm,
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
      });
    },
    updateRoom(roomId: number, roomForm: IRoom) {
      return axiosClient.put(
        `/room/${roomId}`,
        roomForm,
      ).then((roomDetails : AxiosResponse<IRoom>) => {
        if (roomDetails.data.id) {
          const roomIndex = this.rooms.findIndex((room) => room.id === roomDetails.data.id);
          this.rooms[roomIndex] = roomDetails.data;
          ElMessage({
            message: `Room ${roomDetails.data.name} updated!`,
            type: 'success',
          });
        } else {
          ElMessage.error('Oops, something went wrong.');
        }
      });
    },
    deleteRoom(roomId: number) {
      return axiosClient.delete(`/room/${roomId}`).then(() => {
        const deleted = this.removeFromState(roomId);
        if (deleted) {
          ElMessage({
            message: `Room ${deleted.name} deleted!`,
            type: 'success',
          });
        } else {
          ElMessage.error('Oops, something went wrong.');
        }
      });
    },
    removeFromState(roomId: number) : IRoom | null {
      // returns deleted element
      const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
      if (roomIndex > -1) {
        const deleted = this.rooms[roomIndex];
        this.rooms.splice(roomIndex, 1);
        return deleted;
      }
      return null;
    },
    async getBookedTimes(roomId: number, date: string) : Promise<ITimeSlot[]> {
      return axiosClient.get(`/room/${roomId}/booked?date=${date}`).then((timeSlots : AxiosResponse<ITimeSlot[]>) => timeSlots.data);
    },
  },
});

export default useRoomStore;
