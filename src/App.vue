<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthStore from '@/store/AuthStore';

onMounted(() => {
  const authStore = useAuthStore();
  authStore.loadUserData();
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
