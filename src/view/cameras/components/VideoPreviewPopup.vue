<template>
    <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
        class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.70)] flex items-center justify-center z-[999999] overflow-hidden">
        <div
            class="w-[45.5625rem] h-[28.5rem] rounded-[0.5rem] bg-white shadow-[0,0.625rem,1.25rem,0,rgba(0, 7, 22, 0.25)]">
            <!-- header -->
            <div class="px-[1.25rem] py-[1rem] flex items-center justify-between">
                <div class="justify-start text-zinc-950 text-xl font-medium font-['Roboto'] leading-8">10/24/25,6:35 AM
                </div>
                <div class="w-[2.25rem] h-[2.25rem] flex items-center justify-center cursor-pointer" @click="handlerClose">
                    <SvgIcon width="1.0625rem" height="1.0625rem" color="#000000" icon="video-close" />
                </div>
            </div>
            <!-- video -->
            <div class="w-[43.0625rem] h-[23rem] mx-[1.25rem] rounded-[0.625rem] bg-[#F4F5F6] overflow-hidden">
                <img src="@/assets/images/test1.png" alt="video-preview" class="w-full h-full object-cover" />
            </div>
        </div>
    </div>
    </transition>
</template>
<script setup>
import {ref,inject} from 'vue'
const { VideoStore} = inject('store')
const handlerClose = () => {
        VideoStore.methods.setPreview(false,"") //boolean string
}
</script>