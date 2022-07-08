<template>
  <el-dialog :title="props.id ? 'Edit ' + props.id : 'Create new conference'">
    <el-form :model="form">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Room">
        <el-select v-model="bookRoom" class="m-2" placeholder="Select" @change="onRoomOrDateChange">
          <el-option
            v-for="room in roomStore.rooms"
            :key="room.id"
            :label="room.name + ' (' + room.location + ')'"
            :value="room.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Room is booked for:" v-if="bookedTimes.length">
        <ul>
          <li v-for="time in bookedTimes" v-bind:key="time.from">
            {{ getTimeRangeString(time) }}
          </li>
        </ul>
      </el-form-item>
      <el-alert title="Room is already booked for this time range" type="error" v-if="!timeValidation" />
      <el-form-item label="Date">
        <el-col :span="24" class="text-center">
        <el-date-picker
          v-model="bookDate"
          @change="onRoomOrDateChange"
          style="width: 100%"
          type="date"
          placeholder="Pick a day"
          :disabled-date="disabledDate"
          format="DD.MM.YYYY"
          value-format="YYYY-MM-DD"
          :disabled="!bookRoom"
        />
        </el-col>
          <el-col :span="11">
            <el-time-select
              placeholder="Start time"
              @change="validateTime"
              style="width: 100%"
              v-model="startTime"
              start="08:00"
              step="00:15"
              end="18:30"
              :disabled="!bookDate"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-select
              placeholder="End time"
              @change="validateTime"
              style="width: 100%"
              v-model="endTime"
              start="08:00"
              step="00:15"
              end="18:30"
              :min-time="startTime"
              :disabled="!bookDate"
            />
          </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="onCreateOrUpdate">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  defineEmits, defineProps, reactive, ref, onMounted,
} from 'vue';
import { IConferenceRequest } from '@/types/conference.types';
import useRoomStore from '@/store/RoomStore';
import {
  differenceInMinutes,
  getHumanTime,
  getRequestDate,
  incrementDuration,
} from '@/helpers/time-operations';
import useConferenceStore from '@/store/ConferenceStore';
import { IRoom, ITimeSlot } from '@/types/room.types';

const bookedTimes = ref<ITimeSlot[]>([]);
const roomStore = useRoomStore();
const conferenceStore = useConferenceStore();
const emit = defineEmits(['closeDialog', 'onSubmit']);
const timeValidation = ref(true);
const bookRoom = ref();
const bookDate = ref();
const startTime = ref();
const endTime = ref();
const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
});

const disabledDate = (time: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return time.getTime() < today.getTime() - 1;
};

const form = reactive<IConferenceRequest>({
  name: '',
  bookedAt: '',
  duration: 60,
  roomId: roomStore.rooms[0]?.id || 0,
});

onMounted(() => {
  if (props.id) {
    conferenceStore.getConferenceData(props.id).then((conferenceData) => {
      form.name = conferenceData.name;
      const bookedAt = String(conferenceData.booked_at);
      bookDate.value = bookedAt;
      startTime.value = getHumanTime(bookedAt);
      endTime.value = getHumanTime(incrementDuration(bookedAt, conferenceData.duration));
      form.duration = conferenceData.duration;
      bookRoom.value = (conferenceData.room as IRoom)?.id || 0;
    });
  }
});

const onCreateOrUpdate = () => {
  form.duration = differenceInMinutes(startTime.value, endTime.value);
  form.bookedAt = `${getRequestDate(bookDate.value)} ${startTime.value}`;
  form.roomId = bookRoom.value;
  if (props.id) {
    conferenceStore.updateConference(props.id, form).then(() => emit('closeDialog'));
  } else {
    conferenceStore.createConference(form).then(() => emit('closeDialog'));
  }
};

const onRoomOrDateChange = async () => {
  if (bookRoom.value && bookDate.value) {
    bookedTimes.value = await roomStore.getBookedTimes(bookRoom.value, bookDate.value);
    console.log(bookedTimes.value);
  }
};

const getTimeRangeString = (timeSlot: ITimeSlot) => `${getHumanTime(timeSlot.from)} - ${getHumanTime(timeSlot.to)}`;

const validateTime = () => {
  if (!(startTime.value && endTime.value)) {
    return;
  }
  const startDate = new Date(`${bookDate.value} ${startTime.value}`);
  const endDate = new Date(`${bookDate.value} ${endTime.value}`);
  let isOverlapping = false;
  bookedTimes.value.every((bookedSlot: ITimeSlot) => {
    const from = new Date(bookedSlot.from);
    const to = new Date(bookedSlot.to);
    // (StartDateA <= EndDateB) and (EndDateA >= StartDateB)
    if (from.getTime() <= endDate.getTime()
      && to.getTime() >= startDate.getTime()) {
      // overlapping
      isOverlapping = true;
      return false;
    }
    return true;
  });
  timeValidation.value = !isOverlapping;
};
</script>
