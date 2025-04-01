<template>
  <div class="space-y-6">
    <button @click="$router.back()" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center">
      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

    <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white">
      Videos
    </h1>

    <div v-if="loading" class="text-center text-gray-900 dark:text-white">
      <p>Loading videos...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="grid gap-6">
      <div
        v-for="video in videos"
        :key="video.id"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div class="aspect-w-16 aspect-h-9 mb-4">
          <img :src="video.thumbnail" :alt="video.title" class="rounded-lg object-cover w-full" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ video.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ video.description }}</p>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ video.views }} views • {{ formatDate(video.publishedAt) }}
          </div>
          <button 
            @click="navigateToComments(video.id)"
            class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {{ video.commentCount }} Comments
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const videos = ref([]);
const loading = ref(true);
const error = ref('');

// Mock data for demonstration
const mockVideos = [
  {
    id: '1',
    title: 'Getting Started with Vue.js',
    description: 'Learn the basics of Vue.js framework',
    thumbnail: 'https://picsum.photos/800/450',
    views: '1.2K',
    publishedAt: '2024-01-15',
    commentCount: 45
  },
  {
    id: '2',
    title: 'Advanced TypeScript Features',
    description: 'Deep dive into TypeScript advanced concepts',
    thumbnail: 'https://picsum.photos/800/451',
    views: '856',
    publishedAt: '2024-01-10',
    commentCount: 32
  },
  {
    id: '3',
    title: 'Building Modern Web Apps',
    description: 'Complete guide to modern web development',
    thumbnail: 'https://picsum.photos/800/452',
    views: '2.3K',
    publishedAt: '2024-01-05',
    commentCount: 78
  }
];

const fetchVideos = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    videos.value = mockVideos;
  } catch (err) {
    error.value = 'Error fetching videos';
  } finally {
    loading.value = false;
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const navigateToComments = (videoId: string) => {
  router.push(`/videos/${route.params.platform}/${route.params.username}/${videoId}/comments`);
};

onMounted(fetchVideos);
</script>