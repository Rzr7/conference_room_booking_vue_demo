<template>
  <div class="common-layout h-full">
    <el-container class="h-full">
      <el-aside>
        <el-menu
          default-active="1"
          class="h-full"
        >
          <el-menu-item index="1">
            <el-icon>
              <font-awesome-icon icon="fa-solid fa-calendar-plus" />
            </el-icon>
            <span>Book room</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <font-awesome-icon icon="fa-solid fa-list-check" />
            </el-icon>
            <span>My rooms</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <font-awesome-icon icon="fa-solid fa-table" />
            </el-icon>
            <span>Manage rooms</span>
          </el-menu-item>
          <el-menu-item index="3" class="!absolute bottom-0 w-full">
            <el-icon>
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
            </el-icon>
            <span>Log Out</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RoomsList />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import RoomsList from '@/components/RoomsList.vue';

</script>
