import { createRouter, createWebHistory } from 'vue-router'
import PlatformSelect from '../views/PlatformSelect.vue'
import UserSearch from '../views/UserSearch.vue'
import UserProfile from '../views/UserProfile.vue'
import FollowersList from '../views/FollowersList.vue'
import VideosList from '../views/VideosList.vue'
import VideoComments from '../views/VideoComments.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'platforms',
      component: PlatformSelect
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/search/:platform',
      name: 'search',
      component: UserSearch
    },
    {
      path: '/profile/:platform/:username',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/followers/:platform/:username',
      name: 'followers',
      component: FollowersList
    },
    {
      path: '/videos/:platform/:username',
      name: 'videos',
      component: VideosList
    },
    {
      path: '/videos/:platform/:username/:videoId/comments',
      name: 'video-comments',
      component: VideoComments
    }
  ]
})

export default router