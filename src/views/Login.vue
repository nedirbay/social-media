<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <button @click="$router.back()" class="mb-4 text-gray-600 hover:text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="search-input mt-1"
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="search-input mt-1"
            required
          />
        </div>
        
        <button type="submit" class="btn-primary w-full">
          Login
        </button>
      </form>
      
      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:text-blue-800">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = () => {
  // Implement your login logic here
  console.log('Login:', { email: email.value, password: password.value });
  router.push('/');
};
</script>