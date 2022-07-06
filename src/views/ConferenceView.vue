<template>
  <view-layout>
    <conference-data v-if="selectedConference" :conference-id="selectedConference" />
  </view-layout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import ViewLayout from '@/components/common/ViewLayout.vue';
import ConferenceData from '@/components/conference/ConferenceData.vue';
import { onMounted, ref } from 'vue';

const route = useRoute();
const selectedConference = ref();

onMounted(() => {
  const { conferenceId } = route.params;
  selectedConference.value = Number(conferenceId);
});
</script>
