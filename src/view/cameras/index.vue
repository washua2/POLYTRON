<template>
    <div class="h-[calc(100vh_-_4rem)] ipad:h-[calc(100svh_-_4rem)] pt-[1.875rem] relative">
        <!-- search -->
        <Search @handleSearch="handleSearch" @handleCloseSearch="handleCloseSearch" @handlerAllSites="handlerAllSites"
            :isShowTree="isShowTree" />
        <!-- Navigation -->
        <div class="mt-[2.125rem] pl-[1.25rem] mb-[1.125rem]" v-show="!isLoading" v-if="!searchValue">
            <Navigation />
        </div>
        <!-- main -->
        <div>
            <!-- !searchValue && !isLoading -->
            <div v-if="isUploadImage||searchValue">
                <!-- !isLoading && searchValue -->
                <VideoContent v-if="!isLoading && searchValue" />
            </div>
            <div v-if="!isUploadImage">
                <CCTVContent v-if="!searchValue && !isLoading" />
            </div>

            <div class="w-full h-full flex items-center justify-center mt-[23.1875rem]" v-show="isLoading">
                <div class="w-[4.375rem] flex flex-col justify-center gap-[2.5rem]">
                    <!-- <img src="@/assets/icons/search-loading.svg" alt=""> -->
                    <SvgIcon width="4.375rem" height="4.375rem" icon="search-loading" />
                    <div class="justify-start text-[#44444E] text-[1.125rem] font-['light'] line-clamp-1">Searching ...
                    </div>
                </div>
            </div>
        </div>
        <!-- page -->
        <div class="w-[115rem] h-[4rem] px-[1.25rem] border-t-[0.0625rem] border-[#E1E4EA] bg-white z-[10] flex items-center justify-between fixed bottom-0"
            v-show="!isLoading">
            <div>
                <div class="justify-start"><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']">Showing</span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> </span><span
                        class="text-black text-[1rem] font-normal font-['Roboto'] uppercase"> 1-10 </span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> </span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> of </span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> </span><span
                        class="text-black text-[1rem] font-normal font-['Roboto'] uppercase"> 1000</span></div>
            </div>
            <Page :totalPages="totalPages" @currentToPage="currentToPage" v-model="current"  />
        </div>
        <!-- AllSitesTree -->

        <div class="absolute left-0 top-0 z-[12] w-full h-[calc(100vh_-_4rem)] ipad:h-[calc(100svh_-_4rem)] flex items-start" v-if="isShowTree">
            <div class="h-[calc(100vh_-_4rem)] ipad:h-[calc(100svh_-_4rem)] bg-white shadow-[0_1.25rem_2.25rem_0_rgba(0,7,22,0.40)] pt-[1.625rem] px-[1.6875rem] border-r-[0.0625rem]
    transition-all duration-[200ms] ease-in-out overflow-hidden" :class="isShowTree ? 'w-[21.5rem]' : 'w-0'">
                <!-- search -->
                <div class="w-full pl-[0.625rem] pt-[0.5rem] pb-[0.5rem] bg-[#F4F5F6] flex items-center gap-[0.5rem]">
                    <SvgIcon width="1rem" height="1rem" color="#99A0AE" icon="search" />
                    <input type="text" placeholder="Search"
                        class="w-full h-[1.125rem] text-[0.875rem] text-[#717784] bg-[#F4F5F6] p-0 m-0 border-none outline-none"
                        style="box-shadow: none;" />
                </div>

                <div class="mt-[1.75rem]">
                    <AllSitesTree :data="treeData"/>
                </div>
            </div>
            <!-- 遮罩层，点一下关闭抽屉 -->
            <div class="w-full h-[calc(100vh_-_4rem)] bg-black/20" @click="isShowTree = false" v-if="isShowTree"></div>
        </div>
    </div>
</template>
<script setup>
import Search from './components/Search.vue'
import Navigation from './components/Navigation.vue'
import VideoContent from './components/VideoContent.vue'
import CCTVContent from './components/CCTVContent.vue'
import AllSitesTree from './components/AllSitesTree.vue'
import { ref, inject, computed } from 'vue'
const { VideoStore } = inject('store')
const totalPages = ref(100)
const current = ref(1)
const searchValue = ref(null)
const isLoading = ref(false)
const isShowTree = ref(false)
const treeData = [
    {
        id: "1",
        label: "1. SG - ASPIAL ONE",
        children: [
            { id: "1-1", label: "1.1 Ground Floor Lobby" },
            { id: "1-2", label: "1.2 Second Floor" },
            { id: "1-3", label: "1.3 Third Floor" },
            { id: "1-4", label: "1.4 Fourth Floor" }
        ]
    },
    {
        id: "2",
        label: "2. Circuit Road",
        children: [
            { id: "2-1", label: "1.1 Exit" },
            { id: "2-2", label: "1.2 Entrance" }
        ]
    },
    {
        id: "3",
        label: "3. Tai Seng Street",
        children: [
            { id: "3-1", label: "1.1 Crossroads" },
            { id: "3-2", label: "1.2 Parking spot" },
            { id: "3-3", label: "1.3 Central Street" }
        ]
    }
];
const isUploadImage = computed(() => VideoStore.state.isUploadImage)

const currentToPage = (page) => {
    console.log(page)
}
// handleSearch
const handleSearch = (val) => {
    searchValue.value = val
    initVideoData()
}
const handleCloseSearch = () => {
    searchValue.value = null
    initCCTVData()
}
const handlerAllSites = (val) => {
    isShowTree.value = val
}
// 模拟接口
const initVideoData = () => {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
    console.log(searchValue.value)
}
const initCCTVData = () => {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
    console.log(searchValue.value)
}
</script>
<style lang="scss" scoped></style>