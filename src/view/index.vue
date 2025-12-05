<template>
  <div class="flex items-start ">
    <div class="w-[5rem] relative">
      <Menu />
    </div>
    <div class=" flex flex-col flex-wrap items-start justify-start flex-shrink-0">
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
import { ref, inject, computed } from 'vue'
const { VideoStore } = inject('store')

const isPreview = computed(() => VideoStore.state.isPreview)
const isUpload = computed(() => VideoStore.state.isUpload)
const isCreateProfile = computed(() => VideoStore.state.isCreateProfile)
const isAddDeviceShow = computed(() => VideoStore.state.isAddDeviceShow)

</script>
<style lang="scss" scoped></style>