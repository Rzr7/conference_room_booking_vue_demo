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
          <el-form v-if="!isRegistrationOpen" :model="authForm" label-width="120px">
            <el-form-item label="Username">
              <el-input v-model="authForm.username" />
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="authForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Sign In</el-button>
              <el-button @click="isRegistrationOpen = true">Create account</el-button>
            </el-form-item>
          </el-form>
          <el-form v-else :model="registrationForm" label-width="120px">
            <el-form-item label="Username">
              <el-input v-model="registrationForm.username" />
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="registrationForm.password" />
            </el-form-item>
            <el-form-item label="Name">
              <el-input v-model="registrationForm.name" />
            </el-form-item>
            <el-form-item label="Birthdate">
              <el-date-picker
                v-model="registrationForm.birthdate"
                type="date"
                placeholder="Birthdate"
                format="DD.MM.YYYY"
                value-format="YYYY-MM-DD"
                style="width: 100%;"
                :default-value="new Date(1999, 1, 11)"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onRegistrationSubmit">Sign Up</el-button>
              <el-button @click="isRegistrationOpen = false">Account already exist?</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import useAuthStore from '@/store/AuthStore';

const authStore = useAuthStore();
const isRegistrationOpen = ref(false);

const authForm = reactive({
  username: '',
  password: '',
});

const registrationForm = reactive({
  username: '',
  name: '',
  password: '',
  birthdate: '',
});

const onSubmit = () => {
  authStore.login(authForm.username, authForm.password);
};

const onRegistrationSubmit = () => {
  authStore.register(
    registrationForm.username,
    registrationForm.password,
    registrationForm.name,
    registrationForm.birthdate,
  );
};
</script>

<style>
.box-card {
  width: 480px;
  margin: 0 auto;
}
</style>
