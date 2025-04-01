<template>
  <div class="space-y-6">
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

    <div
      v-if="loading"
      class="text-center"
    >
      <p class="text-xl">Loading...</p>
    </div>
    <div
      v-else-if="error"
      class="text-center text-red-600"
    >
      <p>{{ error }}</p>
    </div>
    <div
      v-else-if="userData"
      class="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div class="p-8">
        <div class="flex items-center space-x-6">
          <img
            :src="userData.avatar_url"
            :alt="userData.name"
            class="w-24 h-24 rounded-full"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ userData.name }}</h1>
            <p class="text-gray-600">@{{ userData.login }}</p>
            <p class="text-gray-500 mt-1">{{ userData.location }}</p>
          </div>
        </div>

        <div class="mt-6">
          <p class="text-gray-700">{{ userData.bio }}</p>
          <div class="mt-4 space-y-2">
            <p
              v-if="userData.company"
              class="text-gray-600"
            >
              <span class="font-semibold">Company:</span> {{ userData.company }}
            </p>
            <p
              v-if="userData.blog"
              class="text-gray-600"
            >
              <span class="font-semibold">Website:</span>
              <a
                :href="userData.blog"
                target="_blank"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ userData.blog }}
              </a>
            </p>
            <p class="text-gray-600">
              <span class="font-semibold">Joined:</span>
              {{ new Date(userData.created_at).toLocaleDateString() }}
            </p>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-4 text-center">
          <div
            class="bg-gray-50 p-4 rounded-lg cursor-pointer"
            @click="navigateToFollowers"
          >
            <p class="text-2xl font-bold text-gray-900">{{ userData.followers }}</p>
            <p class="text-gray-600">Followers</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-2xl font-bold text-gray-900">{{ userData.following }}</p>
            <p class="text-gray-600">Following</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-2xl font-bold text-gray-900">{{ userData.public_repos }}</p>
            <p class="text-gray-600">Repositories</p>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-600">Public Gists</p>
              <p class="text-xl font-semibold text-gray-900">{{ userData.public_gists }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-600">Account Type</p>
              <p class="text-xl font-semibold text-gray-900">{{ userData.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const userData = ref(null);
const loading = ref(true);
const error = ref("");
import { isDarkMode } from "./DarkData";
const fetchUserData = async () => {
  const { platform, username } = route.params;
  try {
    // For demo purposes, using GitHub API
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    userData.value = response.data;
  } catch (err) {
    error.value = "Error fetching user data";
  } finally {
    loading.value = false;
  }
};

const navigateToFollowers = () => {
  router.push(`/followers/${route.params.platform}/${route.params.username}`);
};

onMounted(fetchUserData);
</script>