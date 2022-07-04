<template>
  <el-menu
    :default-active="route.path"
    class="h-full"
    :router="true"
  >
    <el-menu-item
      v-for="item in nav"
      v-bind:key="item.index"
      :class="item.htmlClass"
      :index="item.index"
    >
      <el-icon>
        <font-awesome-icon :icon="'fa-solid ' + item.icon" />
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { nav } from '@/helpers/navigation-menu';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
