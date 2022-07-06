<template>
  <el-row class="mb-4">
    <el-button type="success" @click="openFormDialog">New Conference</el-button>
  </el-row>

  <el-table
    :data="conferenceStore.conferences"
    style="width: 100%; cursor: pointer"
    @row-click="(row) => router.push({ name: 'conference-view', params: { conferenceId: row.id } })"
  >
    <el-table-column prop="id" label="ID" width="50" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="bookedAt" label="Booked for">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-clock" />
          </el-icon>
          <span style="margin-left: 10px">{{ getHumanDateTime(scope.row.booked_at) }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="duration" label="Duration">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.duration }} min</span>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <conference-form-dialog
    v-model="isFormOpened"
    @closeDialog="closeFormDialog"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useConferenceStore from '@/store/ConferenceStore';
import ConferenceFormDialog from '@/components/conference/ConferenceFormDialog.vue';
import { getHumanDateTime } from '@/helpers/time-operations';
import router from '@/router';

const conferenceStore = useConferenceStore();
const isFormOpened = ref(false);

const openFormDialog = () => {
  isFormOpened.value = true;
};

const closeFormDialog = () => {
  isFormOpened.value = false;
};
</script>
