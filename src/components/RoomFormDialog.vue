<template>
  <el-dialog :title="props.id ? 'Edit ' + props.id : 'Create new room'">
    <el-form :model="roomForm">
      <el-form-item label="Name">
        <el-input v-model="roomForm.name" />
      </el-form-item>
      <el-form-item label="Location">
        <el-input v-model="roomForm.location" />
      </el-form-item>
      <el-form-item label="Capacity">
        <el-input type="number" v-model="roomForm.capacity" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="emit('onSubmit', roomForm)">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from 'vue';
import { IRoomForm } from '@/types/room.types';

const emit = defineEmits(['closeDialog', 'onSubmit']);

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
});

const roomForm = reactive<IRoomForm>({
  name: '',
  location: '',
  capacity: 0,
});
</script>
