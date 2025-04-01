<template>
  <div class="space-y-8">
    <button @click="$router.back()" class="text-gray-600 hover:text-gray-900 flex items-center">
      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

    <h1 class="text-3xl font-bold text-center text-gray-900">
      Followers
    </h1>
    
    <div v-if="loading" class="text-center">
      <p>Loading followers...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="grid gap-6">
      <div
        v-for="follower in followers"
        :key="follower.id"
        class="bg-white p-4 rounded-lg shadow flex items-center space-x-4"
      >
        <img
          :src="follower.avatar_url"
          :alt="follower.login"
          class="w-12 h-12 rounded-full"
        />
        <div>
          <h2 class="text-lg font-semibold text-gray-900">{{ follower.login }}</h2>
          <a
            :href="follower.html_url"
            target="_blank"
            class="text-blue-600 hover:text-blue-800"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const followers = ref([]);
const loading = ref(true);
const error = ref('');

const fetchFollowers = async () => {
  const { username } = route.params;
  try {
    // For demo purposes, using GitHub API
    const response = await axios.get(`https://api.github.com/users/${username}/followers`);
    followers.value = response.data;
  } catch (err) {
    error.value = 'Error fetching followers';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchFollowers);
</script>