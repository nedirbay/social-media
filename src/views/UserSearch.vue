<template>
  <div class="max-w-2xl mx-auto space-y-8">
    <button
      @click="$router.back()"
      class="text-gray-600 hover:text-gray-900 flex items-center"
      :class="[isDarkMode ? 'text-white' : 'text-gray-900']"
    >
      <svg
        class="w-5 h-5 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>

    <div class="text-center">
      <h1
        class="text-3xl font-bold text-gray-900"
        :class="[isDarkMode ? 'text-white' : 'text-gray-900']"
      >
        Search User
      </h1>
      <p
        class="mt-2 text-gray-600"
        :class="[isDarkMode ? 'text-white' : 'text-gray-900']"
      >
        Enter a username to search
      </p>
    </div>

    <div class="space-y-4">
      <input
        v-model="username"
        type="text"
        placeholder="Enter username"
        class="search-input"
        @keyup.enter="searchUser"
      />
      <button
        @click="searchUser"
        class="btn-primary w-full"
        :disabled="!username"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const username = ref("");

const platformName = computed(() => {
  const platform = route.params.platform as string;
  return platform.charAt(0).toUpperCase() + platform.slice(1);
});
import { isDarkMode } from "./DarkData";
const searchUser = () => {
  if (username.value) {
    router.push(`/profile/${route.params.platform}/${username.value}`);
  }
};
</script>