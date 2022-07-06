<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthStore from '@/store/AuthStore';
import useRoomStore from '@/store/RoomStore';
import useUserStore from '@/store/UserStore';
import useConferenceStore from '@/store/ConferenceStore';

onMounted(() => {
  const authStore = useAuthStore();
  const roomStore = useRoomStore();
  const userStore = useUserStore();
  const conferenceStore = useConferenceStore();
  if (authStore.isLoggedIn) {
    userStore.loadUsers();
    authStore.loadUserData();
    roomStore.loadRooms();
    conferenceStore.loadConferences();
  }
});
</script>
