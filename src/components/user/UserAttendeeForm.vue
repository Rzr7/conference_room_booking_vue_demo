<template>
  <el-dialog title="Add new attendee">
    <el-form>
      <el-form-item label="Select attendee">
        <el-select v-model="selectedUser" class="m-2" placeholder="Select">
          <el-option
            v-for="user in userStore.users"
            :key="user.id"
            :label="user.name"
            :value="user"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="emit('onSubmit', selectedUser)">Add</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import useUserStore from '@/store/UserStore';

const emit = defineEmits(['closeDialog', 'onSubmit']);

const userStore = useUserStore();
const selectedUser = ref();
</script>
