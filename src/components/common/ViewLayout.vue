<template>
  <div class="common-layout h-full">
    <el-container class="h-full">
      <el-aside>
        <navigation-menu />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import NavigationMenu from '@/components/common/NavigationMenu.vue';

</script>
