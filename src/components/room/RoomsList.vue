<template>
  <el-row class="mb-4">
    <el-button type="success" @click="onRoomCreate">New Room</el-button>
  </el-row>

  <el-table
    :data="roomStore.rooms"
    style="width: 100%"
  >
    <el-table-column prop="id" label="ID" width="50" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="location" label="Location" />
    <el-table-column prop="capacity" label="Capacity" />
    <el-table-column prop="actions" label="Actions">
      <template #default="scope">
        <el-button type="primary" size="small" @click="onRoomEdit(scope.row.id)">
          Edit
        </el-button>
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="onRoomDelete(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger" size="small">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <room-form-dialog
    v-model="isFormOpened"
    @closeDialog="closeFormDialog"
    :id="editRoomId"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RoomFormDialog from '@/components/room/RoomFormDialog.vue';
import useRoomStore from '@/store/RoomStore';

const roomStore = useRoomStore();
const isFormOpened = ref(false);
const editRoomId = ref(0);

const openFormDialog = () => {
  isFormOpened.value = true;
};

const closeFormDialog = () => {
  isFormOpened.value = false;
};

const onRoomDelete = (roomId: number) => {
  roomStore.deleteRoom(roomId);
};

const onRoomEdit = (roomId: number) => {
  editRoomId.value = roomId;
  openFormDialog();
};

const onRoomCreate = () => {
  editRoomId.value = 0;
  openFormDialog();
};
</script>
