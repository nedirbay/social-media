<template>
  <div class="space-y-8">
    <h1
      class="text-3xl font-bold text-center text-gray-900"
      :class="[isDarkMode ? 'text-white' : 'text-gray-900']"
    >
      Choose a Platform
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="platform in platforms"
        :key="platform.id"
        class="platform-card"
        @click="navigateToSearch(platform.id)"
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
} from "simple-icons";
import { isDarkMode } from "./DarkData";
const router = useRouter();

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