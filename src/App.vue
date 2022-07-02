<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthStore from '@/store/AuthStore';
import useRoomStore from '@/store/RoomStore';

onMounted(() => {
  const authStore = useAuthStore();
  const roomStore = useRoomStore();
  authStore.loadUserData();
  roomStore.loadRooms();
});
</script>
