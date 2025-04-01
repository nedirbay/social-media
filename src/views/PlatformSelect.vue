<template>
  <div class="space-y-8 relative">
    <div class="absolute inset-0 bg-pattern opacity-10"></div>
    <div class="relative">
      <h1
        :class="[isDarkMode ? 'text-white' : 'text-gray-900']"
        class="text-3xl font-bold text-center text-gray-900 mb-12"
      >
        Search user from all social platforms
      </h1>
      <div style="width:100%;display:flex;justify-content:center;">
        <button
          @click="navigateToSearch"
          class="search-button"
        >
          <img
            src="../assets/search.png"
            alt="seacrh icon"
            width="125"
          >
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="platform in platforms"
          :key="platform.id"
          class="platform-card backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
        >
          <div class="flex items-center space-x-4">
            <div :class="['w-12 h-12 flex items-center justify-center rounded-full', platform.bgColor]">
              <component
                :is="platform.icon"
                class="w-6 h-6"
                :style="{ color: 'white' }"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ platform.name }}</h2>
              <p class="text-gray-500 dark:text-gray-400">Search {{ platform.name }} users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { h } from "vue";
import {
  siTwitter,
  siGithub,
  siInstagram,
  siFacebook,
  siLinkedin,
  siYoutube,
  siTiktok,
  siPinterest,
  siReddit,
  siTwitch,
  siOpensearch,
} from "simple-icons";

const router = useRouter();
import { isDarkMode } from "./DarkData";
const createSvgIcon = (icon: any) => {
  return h("svg", {
    viewBox: "0 0 24 24",
    innerHTML: `<path d="${icon.path}"/>`,
    fill: "currentColor",
  });
};

const platforms = [
  {
    id: "twitter",
    name: "Twitter",
    icon: createSvgIcon(siTwitter),
    bgColor: "bg-blue-400",
  },
  {
    id: "github",
    name: "GitHub",
    icon: createSvgIcon(siGithub),
    bgColor: "bg-gray-900",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: createSvgIcon(siInstagram),
    bgColor: "bg-pink-500",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: createSvgIcon(siFacebook),
    bgColor: "bg-blue-600",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: createSvgIcon(siLinkedin),
    bgColor: "bg-blue-700",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: createSvgIcon(siYoutube),
    bgColor: "bg-red-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: createSvgIcon(siTiktok),
    bgColor: "bg-black",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: createSvgIcon(siPinterest),
    bgColor: "bg-red-500",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: createSvgIcon(siReddit),
    bgColor: "bg-orange-500",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: createSvgIcon(siTwitch),
    bgColor: "bg-purple-600",
  },
];

const navigateToSearch = (platform: string) => {
  router.push(`/search/${platform}`);
};
</script>

<style>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.platform-card {
  @apply rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
</style>

