<template>
  <el-row class="mb-4">
    <el-button type="success" @click="openFormDialog">New Room</el-button>
  </el-row>

  <el-table
    :data="roomStore.rooms"
    style="width: 100%"
  >
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="location" label="Location" />
    <el-table-column prop="capacity" label="Capacity" />
  </el-table>

  <room-form-dialog
    v-model="isFormOpened"
    @closeDialog="closeFormDialog"
    @onSubmit="onCreate"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IRoomForm } from '@/types/room.types';
import RoomFormDialog from '@/components/RoomFormDialog.vue';
import useRoomStore from '@/store/RoomStore';

const roomStore = useRoomStore();
const isFormOpened = ref(false);

const openFormDialog = () => {
  isFormOpened.value = true;
};

const closeFormDialog = () => {
  isFormOpened.value = false;
};

const onCreate = (roomForm: IRoomForm) => {
  roomStore.createRoom(roomForm).then(() => closeFormDialog());
};
</script>
