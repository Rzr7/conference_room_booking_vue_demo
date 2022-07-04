import { defineStore } from 'pinia';
import axiosClient from '@/helpers/http-common';
import { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { IConference, IConferenceRequest } from '@/types/conference.types';

const useConferenceStore = defineStore('conferenceStore', {
  state: () => ({
    conferences: [] as IConference[],
  }),
  actions: {
    loadConferences() {
      axiosClient.get('/conference').then((conferencesList: AxiosResponse<IConference[]>) => {
        this.conferences = conferencesList.data;
      });
    },
    createConference(conferenceForm: IConferenceRequest) {
      return axiosClient.post(
        '/conference',
        conferenceForm,
      ).then((conferenceDetails : AxiosResponse<IConference>) => {
        if (conferenceDetails.data.id) {
          this.conferences.push(conferenceDetails.data);
          ElMessage({
            message: `Conference ${conferenceDetails.data.name} created!`,
            type: 'success',
          });
        } else {
          ElMessage.error('Oops, something went wrong.');
        }
      }).catch((error) => {
        ElMessage.error(error.response.data.message || error.message);
      });
    },
    deleteConference(conferenceId: number) {
      return axiosClient.delete(`/conference/${conferenceId}`).then(() => {
        const deleted = this.removeFromState(conferenceId);
        if (deleted) {
          ElMessage({
            message: `Conference ${deleted.name} deleted!`,
            type: 'success',
          });
        } else {
          ElMessage.error('Oops, something went wrong.');
        }
      }).catch((error) => {
        ElMessage.error(error.response.data.message || error.message);
      });
    },
    removeFromState(conferenceId: number) : IConference | null {
      // returns deleted element
      const conferenceIndex = this.conferences.findIndex((conference) => conference.id === conferenceId);
      if (conferenceIndex > -1) {
        const deleted = this.conferences[conferenceIndex];
        this.conferences.splice(conferenceIndex, 1);
        return deleted;
      }
      return null;
    },
  },
});

export default useConferenceStore;
