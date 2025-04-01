<template>
  <div :class="['min-h-screen transition-colors duration-200', isDarkMode ? 'bg-gray-900' : 'bg-gray-100']">
    <nav :class="['shadow-sm transition-colors duration-200', isDarkMode ? 'bg-gray-800' : 'bg-white']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link
              to="/"
              class="flex items-center"
            >
              <span :class="['text-xl font-bold transition-colors duration-200', isDarkMode ? 'text-white' : 'text-gray-900']">
                Social Search
              </span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg transform hover:scale-110 transition-all duration-200"
              :class="isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'"
            >
              <svg
                v-if="isDarkMode"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Footer from "./components/Footer.vue";

const router = useRouter();
const showDropdown = ref(false);
const username = ref("John Doe");
const userAvatar = ref("https://ui-avatars.com/api/?name=John+Doe");
const isDarkMode = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value.toString());
};

// Initialize dark mode from localStorage
const initDarkMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  isDarkMode.value = savedMode === "true";
};

// Call initialization on component mount
initDarkMode();

const logout = () => {
  router.push("/login");
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>