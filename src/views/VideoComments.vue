<template>
  <div class="space-y-6">
    <button @click="$router.back()" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center">
      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

    <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white">
      Video Comments
    </h1>

    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search comments..."
        class="search-input"
      />
      <div class="absolute right-3 top-2.5 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <div v-if="loading" class="text-center text-gray-900 dark:text-white">
      <p>Loading comments...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="comment in filteredComments"
        :key="comment.id"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-102 transition-transform duration-200"
      >
        <div class="flex items-start space-x-4">
          <img
            :src="comment.authorAvatar"
            :alt="comment.authorName"
            class="w-10 h-10 rounded-full"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ comment.authorName }}</h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="mt-2 text-gray-700 dark:text-gray-300">{{ comment.content }}</p>
            <div class="mt-2 flex items-center space-x-4">
              <button 
                @click="likeComment(comment)"
                class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                {{ comment.likes }}
              </button>
              <button 
                @click="dislikeComment(comment)"
                class="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                </svg>
                {{ comment.dislikes }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const comments = ref([]);
const loading = ref(true);
const error = ref('');
const searchQuery = ref('');

// Mock data for demonstration
const mockComments = [
  {
    id: '1',
    authorName: 'Alice Johnson',
    authorAvatar: 'https://ui-avatars.com/api/?name=Alice+Johnson',
    content: 'Great video! Very informative and well explained.',
    createdAt: '2024-01-20',
    likes: 24,
    dislikes: 2
  },
  {
    id: '2',
    authorName: 'Bob Smith',
    authorAvatar: 'https://ui-avatars.com/api/?name=Bob+Smith',
    content: 'Thanks for sharing this. Looking forward to more content like this!',
    createdAt: '2024-01-19',
    likes: 18,
    dislikes: 1
  },
  {
    id: '3',
    authorName: 'Carol White',
    authorAvatar: 'https://ui-avatars.com/api/?name=Carol+White',
    content: 'Could you make a follow-up video about advanced topics?',
    createdAt: '2024-01-18',
    likes: 15,
    dislikes: 0
  }
];

const filteredComments = computed(() => {
  if (!searchQuery.value) return comments.value;
  const query = searchQuery.value.toLowerCase();
  return comments.value.filter(comment => 
    comment.content.toLowerCase().includes(query) ||
    comment.authorName.toLowerCase().includes(query)
  );
});

const fetchComments = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    comments.value = mockComments;
  } catch (err) {
    error.value = 'Error fetching comments';
  } finally {
    loading.value = false;
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const likeComment = (comment: any) => {
  comment.likes++;
};

const dislikeComment = (comment: any) => {
  comment.dislikes++;
};

onMounted(fetchComments);
</script>

<style>
.scale-102 {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
}
</style>