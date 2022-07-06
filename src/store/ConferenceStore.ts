import { defineStore } from 'pinia';
import axiosClient from '@/helpers/http-common';
import { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { IConference, IConferenceRequest } from '@/types/conference.types';
import { IUser } from '@/types/user.types';
import { delay } from '@/helpers/utils';

const useConferenceStore = defineStore('conferenceStore', {
  state: () => ({
    conferences: [] as IConference[],
    isLoaded: false,
  }),
  actions: {
    loadConferences() {
      axiosClient.get('/conference').then((conferencesList: AxiosResponse<IConference[]>) => {
        this.conferences = conferencesList.data;
        this.isLoaded = true;
      });
    },
    async getConferenceData(conferenceId: number) : Promise<IConference> {
      if (!this.isLoaded) {
        await delay(200); // wait before loaded
        return this.getConferenceData(conferenceId);
      }
      const conferenceIndex = this.conferences.findIndex((conference) => conference.id === conferenceId);
      return this.conferences[conferenceIndex];
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
      });
    },
    updateConference(conferenceForm: IConferenceRequest) {
      return axiosClient.put(
        '/conference',
        conferenceForm,
      ).then((conferenceDetails : AxiosResponse<IConference>) => {
        if (conferenceDetails.data.id) {
          const conferenceIndex = this.conferences.findIndex((conference) => conference.id === conferenceDetails.data.id);
          this.conferences[conferenceIndex] = conferenceDetails.data;
          ElMessage({
            message: `Conference ${conferenceDetails.data.name} updated!`,
            type: 'success',
          });
        } else {
          ElMessage.error('Oops, something went wrong.');
        }
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
    removeAttendeeFromState(conferenceId: number, attendeeId: number) : IUser | null {
      // returns deleted element
      const conferenceIndex = this.conferences.findIndex((conference) => conference.id === conferenceId);
      if (conferenceIndex > -1) {
        const personIndex = this.conferences[conferenceIndex].persons.findIndex((person) => person.id === attendeeId);
        if (personIndex > -1) {
          const deleted = this.conferences[conferenceIndex].persons[personIndex];
          this.conferences[conferenceIndex].persons.splice(personIndex, 1);
          return deleted;
        }
        return null;
      }
      return null;
    },
    addAttendee(conferenceId: number, attendee: IUser) {
      return axiosClient.post(
        `/conference/${conferenceId}/person/${attendee.id}`,
      ).then(() => {
        const confIndex = this.conferences.findIndex((conference) => conference.id === conferenceId);
        this.conferences[confIndex].persons.push(attendee);
        ElMessage({
          message: `Attendee ${attendee.name} added!`,
          type: 'success',
        });
      });
    },
    removeAttendee(conferenceId: number, attendeeId: number) {
      return axiosClient.delete(
        `/conference/${conferenceId}/person/${attendeeId}`,
      ).then(() => {
        const deleted = this.removeAttendeeFromState(conferenceId, attendeeId);
        ElMessage({
          message: `Attendee ${deleted?.name} removed!`,
          type: 'success',
        });
      });
    },
  },
});

export default useConferenceStore;
