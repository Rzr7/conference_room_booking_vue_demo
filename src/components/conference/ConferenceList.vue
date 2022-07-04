<template>
  <el-row class="mb-4">
    <el-button type="success" @click="openFormDialog">New Conference</el-button>
  </el-row>

  <el-table
    :data="conferenceStore.conferences"
    style="width: 100%"
  >
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="bookedAt" label="Booked for" />
    <el-table-column prop="duration" label="Duration" />
    <el-table-column prop="actions" label="Actions">
      <template #default="scope">
        <el-button type="primary" size="small" @click="onConferenceEdit(scope.row.id)">
          Edit
        </el-button>
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="onConferenceDelete(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger" size="small">Delete</el-button>
          </template>
        </el-popconfirm>
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

const conferenceStore = useConferenceStore();
const isFormOpened = ref(false);

const openFormDialog = () => {
  isFormOpened.value = true;
};

const closeFormDialog = () => {
  isFormOpened.value = false;
};

const onConferenceDelete = (conferenceId: number) => {
  conferenceStore.deleteConference(conferenceId);
};

const onConferenceEdit = (conferenceId: number) => {
  console.log(`Edit: ${conferenceId}`);
  openFormDialog();
};
</script>
