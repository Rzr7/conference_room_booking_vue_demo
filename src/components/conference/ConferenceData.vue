<template>
  <el-card v-if="isLoaded">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div>
          <el-button class="button" type="primary" @click="isEditFormOpened = true">Edit</el-button>
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="onConferenceDelete(props.conferenceId)"
          >
            <template #reference>
              <el-button type="danger" class="button">Delete</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
    <div class="text item">Room: {{ room?.name }}</div>
    <div class="text item">Room capacity: {{ room?.capacity }}</div>
    <div class="text item">Booked For: {{ bookedAt }}</div>
    <div class="text item">Duration: {{ duration }}</div>
    <div class="text item">Booked by: {{ owner?.name }}</div>
    <div class="text item">Attendees ({{ persons?.length + '/' + room?.capacity }}):</div>
    <div class="text item pad-left" v-for="(person, index) in persons" v-bind:key="person">
      {{ index + 1 }}. {{ person?.name }}
      <el-button type="danger" circle size="small" @click="onAttendeeRemove(person?.id)">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-minus" />
        </template>
      </el-button>
    </div>
    <el-button v-if="persons.length < room.capacity" type="primary" size="small" @click="isAttendeeFormOpened = true" round>Add person</el-button>
  </el-card>
  <user-attendee-form v-model="isAttendeeFormOpened" @close-dialog="onAttendeeFormClose" @on-submit="onAttendeeFormSubmit" />
  <conference-form-dialog
    v-model="isEditFormOpened"
    :id="props.conferenceId"
    @closeDialog="onEditFormClose"
  />
</template>

<script lang="ts" setup>
import {
  ref, defineProps, computed, onMounted, nextTick,
} from 'vue';
import useConferenceStore from '@/store/ConferenceStore';
import { IConference } from '@/types/conference.types';
import { getHumanDateTime } from '@/helpers/time-operations';
import { IRoom } from '@/types/room.types';
import { IUser } from '@/types/user.types';
import router from '@/router';
import UserAttendeeForm from '@/components/user/UserAttendeeForm.vue';
import ConferenceFormDialog from '@/components/conference/ConferenceFormDialog.vue';

const props = defineProps({
  conferenceId: {
    type: Number,
    required: true,
  },
});
const conferenceStore = useConferenceStore();
const conferenceData = ref<IConference>();
const isAttendeeFormOpened = ref(false);
const isEditFormOpened = ref(false);
const isLoaded = ref(false);

const updateConferenceData = () => {
  conferenceStore.getConferenceData(props.conferenceId).then((conference) => {
    conferenceData.value = conference;
  });
};

onMounted(() => {
  updateConferenceData();
  nextTick().then(() => {
    isLoaded.value = true;
  });
});

const title = computed(() => (conferenceData.value ? conferenceData.value?.name : ''));
const bookedAt = computed(() => (conferenceData.value ? getHumanDateTime(conferenceData.value?.booked_at) : ''));
const duration = computed(() => (conferenceData.value ? `${conferenceData.value?.duration} min` : ''));
const room = computed(() => (conferenceData.value ? (conferenceData.value?.room as IRoom) : ''));
const owner = computed(() => (conferenceData.value ? (conferenceData.value?.owner as IUser) : ''));
const persons = computed(() => (conferenceData.value ? (conferenceData.value?.persons as IUser[]) : []));

const onConferenceDelete = (conferenceId: number) => {
  conferenceStore.deleteConference(conferenceId).then(() => {
    router.push({ name: 'conferences' });
  });
};

const onAttendeeFormClose = () => {
  isAttendeeFormOpened.value = false;
};

const onAttendeeFormSubmit = (attendee: IUser) => {
  conferenceStore.addAttendee(props.conferenceId, attendee).then(() => {
    updateConferenceData();
    onAttendeeFormClose();
  });
};

const onEditFormClose = () => {
  isEditFormOpened.value = false;
};

const onAttendeeRemove = (attendeeId: number) => {
  conferenceStore.removeAttendee(props.conferenceId, attendeeId).then(() => {
    updateConferenceData();
  });
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.pad-left {
  padding-left: 15px;
}
</style>
