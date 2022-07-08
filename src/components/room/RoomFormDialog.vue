<template>
  <el-dialog :title="props.id && props.id !== 0 ? 'Edit ' + roomForm.name : 'Create new room'">
    <el-form :model="roomForm">
      <el-form-item label="Name">
        <el-input v-model="roomForm.name" />
      </el-form-item>
      <el-form-item label="Location">
        <el-input v-model="roomForm.location" />
      </el-form-item>
      <el-form-item label="Capacity">
        <el-input-number v-model="roomForm.capacity" :min="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="onCreateOrEdit">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  reactive, defineProps, defineEmits, watch,
} from 'vue';
import { IRoom } from '@/types/room.types';
import useRoomStore from '@/store/RoomStore';
import useConferenceStore from '@/store/ConferenceStore';

const roomStore = useRoomStore();
const conferenceStore = useConferenceStore();
const emit = defineEmits(['closeDialog', 'onUpdate']);

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
});

const roomForm = reactive<IRoom>({
  name: '',
  location: '',
  capacity: 0,
});

watch(() => props.id, () => {
  if (props.id && props.id !== 0) {
    roomStore.getRoomData(props.id).then((roomData) => {
      roomForm.name = roomData.name;
      roomForm.location = roomData.location;
      roomForm.capacity = roomData.capacity;
    });
  } else {
    roomForm.name = '';
    roomForm.location = '';
    roomForm.capacity = 0;
  }
});

const onCreateOrEdit = () => {
  if (props.id && props.id !== 0) {
    roomStore.updateRoom(props.id, roomForm).then(() => conferenceStore.loadConferences()).then(() => emit('closeDialog'));
  } else {
    roomStore.createRoom(roomForm).then(() => emit('closeDialog'));
  }
};
</script>
