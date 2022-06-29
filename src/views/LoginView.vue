<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Sign In</span>
            </div>
          </template>
          <AuthForm />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/components/AuthForm.vue'; // @ is an alias to /src

</script>

<style>
.box-card {
  width: 480px;
  margin: 0 auto;
}
</style>
