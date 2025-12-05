<template>
    <div
        class="w-[113.375rem] h-[41.5625rem] ipad:h-[62.5rem] fhd:h-[52.1875rem] qhd:h-[38.125rem] uhd:h-[38.125rem] pr-[0.625rem] overflow-y-auto overflow-hidden scroll">
        <div class="grid gap-[1rem]" :class="gridColsClass">
            <div v-for="clip in list" :key="clip.id" class="group cursor-pointer" @click="handleOpen(clip)">
                <!-- thumb -->
                <div class="relative w-full aspect-[16/9] rounded-[0.5rem] overflow-hidden border border-[#EAECEF]
                 bg-[#F7F8FA] transition
                 group-hover:shadow-md">
                    <img :src="clip.thumb" alt="" class="w-full h-full object-cover" />

                    <!-- duration badge -->
                    <div class="absolute top-[0.5rem] left-[0.5rem]
                   bg-[rgba(32,36,47,0.35)] text-white text-[0.75rem] font-['light']
                   w-[3rem] h-[1.75rem] rounded-[0.25rem] flex items-center justify-center"
                        style="backdrop-filter: blur(0.1875rem)">
                        {{ clip.duration }}
                    </div>
                </div>

                <!-- meta -->
                <div class="mt-[0.5rem] space-y-[0.25rem]">
                    <!-- title -->
                    <div class="text-[#09090B] text-[1.125rem] font-['medium']
                   leading-snug line-clamp-2">
                        {{ clip.title }}
                    </div>

                    <!-- tag / event -->
                    <div class="text-[#52525B] text-[1rem] font-['light']">
                        {{ clip.tag }}
                    </div>

                    <!-- time -->
                    <div class="text-[#52525B] text-[1rem] font-['light']">
                        {{ clip.time }}
                    </div>
                </div>
            </div>
        </div>

        <!-- empty -->
        <div v-if="!list.length" class="py-[2rem] text-center text-[#717784] text-[0.875rem] font-['light']">
            No clips
        </div>
        <!-- player modal -->
        <ClipPlayerModal v-model:open="playerOpen" :clip="currentClip" @download="onDownload" @delete="onDelete" />
          <!-- DeleteModel -->
       <DeleteModel v-model:open="showDelete" :loading="deleteLoading" @confirm="doDelete"/>
    </div>
</template>

<script setup>
import ClipPlayerModal from './ClipPlayerModal.vue';
import DeleteModel from './DeleteModel.vue';
import { computed, ref } from "vue";
const playerOpen = ref(false);
const currentClip = ref(null);
const showDelete = ref(false);
/**
 * 你可以把 list 换成接口数据。
 * 字段格式见下面 mock。
 */
const list = ref([
    {
        id: "1",
        thumb: "https://picsum.photos/600/360?1",
        duration: "1:00",
        title: "Railroad Entrance Speaker CD62-E",
        tag: "bike thief",
        date: "3/20/2025",
        time: "10:36 AM PDT",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "2",
        thumb: "https://picsum.photos/600/360?2",
        duration: "1:00",
        title: "South Claremont LPR Context CB62-E",
        tag: "bike thief",
        date: "3/20/2025",
        time: "10:36 AM PDT",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "3",
        thumb: "https://picsum.photos/600/360?3",
        duration: "1:00",
        title: "Railroad Entrance Speaker CD62-E",
        tag: "bike thief",
        date: "3/20/2025",
        time: "10:36 AM PDT",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "4",
        thumb: "https://picsum.photos/600/360?4",
        duration: "1:00",
        title: "4th Ave Lobby Entrance CD62-E",
        tag: "bike thief",
        date: "3/20/2025",
        time: "10:36 AM PDT",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
]);

/**
 * 栅格列数：
 * - 默认大屏 4 列
 * - md 2 列
 * - sm 1 列
 */
const gridColsClass = computed(() =>
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
);

function handleOpen(clip) {
    // 这里跳详情/打开弹窗/播放 clip
    currentClip.value = clip;
    playerOpen.value = true;
}

function onDownload(clip) {
    console.log("download clip:", clip);
}
function onDelete(clip) {
    console.log("delete clip:", clip);
    showDelete.value = true;
}
</script>

<style scoped></style>
