<template>
    <div>
        <div class="w-[17.75rem] h-[10.3125rem] ipad:w-[22.625rem] ipad:h-[13.375rem] rounded-[0.25rem] bg-[#D9D9D9] overflow-hidden relative">
            <!-- close -->
            <div class=" absolute top-[0.75rem] right-[0.75rem] cursor-pointer" @click="handlerClose">
                <SvgIcon width="1.625rem" height="1.625rem" color="#FFFFFFE5" icon="search-photo-close" />
            </div>
            <img src="@/assets/images/test1.png" alt="" class="w-full h-full">
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
const { VideoStore } = inject('store')
const handlerClose = () => {
    VideoStore.methods.setUploadImage(false)
}
</script>