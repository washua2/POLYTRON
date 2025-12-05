<template>
  <div class="layout-root flex items-start">
    <div class="w-[5rem] relative">
      <Menu />
    </div>

    <!-- 主区域：给一个 min 宽高，低于阈值就滚动 -->
    <div class="layout-content flex flex-col flex-wrap items-start justify-start">
      <Navbar />
      <div class="w-full h-[calc(100vh_-_4rem)] ipad:h-[calc(100svh_-_4rem)]">
        <router-view></router-view>
      </div>
    </div>

    <!-- VideoPreviewPopup 预览视频 -->
    <VideoPreviewPopup v-if="isPreview" />
    <!-- UploadPhoto -->
    <UploadPhoto v-if="isUpload" />
    <!-- CreateProfile -->
    <CreateProfile v-if="isCreateProfile" />
    <!-- addCameras -->
    <AddCameras v-if="isAddDeviceShow"/>
  </div>
</template>

<script setup>
import Menu from './menu/index.vue';
import Navbar from './navbar/index.vue';
import VideoPreviewPopup from './cameras/components/VideoPreviewPopup.vue';
import UploadPhoto from '@/components/UploadPhoto.vue';
import CreateProfile from './camerasDetail/components/CreateProfile.vue';
import AddCameras from './addCameras/index.vue';
import { inject, computed } from 'vue'

const { VideoStore } = inject('store')
const isPreview = computed(() => VideoStore.state.isPreview)
const isUpload = computed(() => VideoStore.state.isUpload)
const isCreateProfile = computed(() => VideoStore.state.isCreateProfile)
const isAddDeviceShow = computed(() => VideoStore.state.isAddDeviceShow)
</script>

<style lang="scss" scoped>
/* 1) 默认不滚动，避免页面一开始就出现滚动条 */
.layout-root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 2) 你的实际页面最低需要的宽高（按你设计稿来改）
   低于这个就让用户滚动，而不是挤压 */
.layout-content {
  min-width: 1920px;  /* 例：布局最小宽 */
  min-height: 800px;  /* 例：布局最小高 */
}

/* 3) 当视口小于阈值，开启 x/y 滚动条 */
@media (max-width: 1920px), (max-height: 800px) {
  .layout-root {
    overflow: auto;          /* 出现xy滚动 */
    -webkit-overflow-scrolling: touch;
  }
}
</style>
