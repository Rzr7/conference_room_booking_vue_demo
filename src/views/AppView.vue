<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header (Logged in as: {{ authStore.username }})</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import useAuthStore from '@/store/AuthStore';

const authStore = useAuthStore();
</script>
