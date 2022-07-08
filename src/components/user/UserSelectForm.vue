<template>
  <el-dialog :title="props.title">
    <el-form>
      <el-form-item :label="props.label ?? 'Select person'">
        <el-select v-model="selectedUserId" @change="onChange" class="m-2" placeholder="Select">
          <el-option
            v-for="user in userStore.users"
            :key="user.id"
            :label="user.name"
            :value="user.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="emit('onSubmit', selectedUser)">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  ref, defineEmits, defineProps,
} from 'vue';
import useUserStore from '@/store/UserStore';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(['closeDialog', 'onSubmit']);

const userStore = useUserStore();
const selectedUserId = ref();
const selectedUser = ref();

const onChange = (selectedId: number) => {
  selectedUser.value = userStore.getUser(selectedId);
};

</script>
