<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthStore from '@/store/AuthStore';
import useRoomStore from '@/store/RoomStore';
import useConferenceStore from '@/store/ConferenceStore';

onMounted(() => {
  const authStore = useAuthStore();
  const roomStore = useRoomStore();
  const conferenceStore = useConferenceStore();
  if (authStore.isLoggedIn) {
    authStore.loadUserData();
    roomStore.loadRooms();
    conferenceStore.loadConferences();
  }
});
</script>
