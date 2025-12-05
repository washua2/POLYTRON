<template>
    <div class="w-full min-h-[100vh] ipad:min-h-[100svh] bg-[#09090B]">
        <div
            class="flex items-start pt-[3.5625rem] gap-[23.125rem] ipad:gap-[8.75rem] fhd:gap-[8.625rem] qhd:gap-[8.625rem] uhd:gap-[8.625rem]">
            <div class="w-[3.125rem] h-[3.125rem] ml-[3.5625rem] rounded-full border-[0.0625rem] border-[#C9CDD3] flex items-center justify-center cursor-pointer"
                @click="handlerBack">
                <SvgIcon width="0.875rem" height="1.25rem" color="#FFFFFF" icon="arrow-left" />
            </div>

            <!-- video -->
            <div class="w-[62.5rem] h-[37.5rem] ipad:w-[90.625rem] fhd:w-[89.375rem] qhd:w-[89.375rem] uhd:w-[89.375rem] ipad:h-[56.25rem]  fhd:h-[51.25rem] qhd:h-[51.25rem] uhd:h-[51.25rem]
             rounded-[0.75rem] bg-[#D9D9D9] overflow-hidden relative">
                <!-- 地址条 -->
                <div
                    class="w-[11.25rem] h-[3rem] fhd:w-[19.1875rem] qhd:w-[19.1875rem] uhd:w-[19.1875rem] fhd:h-[4.25rem] qhd:h-[4.25rem] uhd:h-[4.25rem] box-address flex items-center justify-center absolute top-[2.0625rem] right-[0.6875rem]">
                    <div class="justify-start text-white text-[1.125rem] fhd:text-[1.625rem] qhd:text-[1.625rem] uhd:text-[1.625rem] 
                     font-normal font-['Roboto'] ">
                        178 Orion Ave
                    </div>
                </div>

                <!-- video 元素 -->
                <div class="w-full h-full">
                    <video ref="videoRef" :src="testVideoSrc" class="w-full h-full object-fill"
                        @loadedmetadata="onLoadedMetadata" @timeupdate="onTimeUpdate" @ended="onEnded"></video>
                </div>
            </div>
        </div>

        <!-- 底部控制条 + 时间轴 -->
        <div class="w-full h-[9.75rem] fixed bottom-0 left-0 bg-[#111928]">
            <!-- 时间轴：传入当前时间 & 总时长，拖动时触发 seek -->
            <TimeCanvas ref="TimeCanvasRef" :current-time="currentTimeMs" :duration="durationMs" :segments="timeFrame"
                @seek="onSeekFromTimeline" />

            <!-- play control -->
            <div class="flex items-center justify-between px-[1.5rem]">
                <!-- 左侧：快退 / 播放暂停 / 快进 + 倍速 -->
                <div class="flex items-center">
                    <!-- 后退15s -->
                    <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center cursor-pointer"
                        @click="fastBackward">
                        <SvgIcon width="0.4375rem" height="0.875rem" color="#FFFFFF" icon="video-1" />
                    </div>

                    <!-- 播放 / 暂停 -->
                    <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center cursor-pointer"
                        @click="togglePlay">
                        <!-- 这里按状态切 icon，你可以换成真正的播放/暂停图标 -->
                        <SvgIcon v-if="!isPlaying" width="1.625rem" height="1.625rem" color="#FFFFFF"
                            icon="play-video" />
                        <SvgIcon v-else width="2.25rem" height="2.625rem" color="#FFFFFF" icon="video-2" />
                    </div>

                    <!-- 快进15s -->
                    <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center cursor-pointer"
                        @click="fastForward">
                        <SvgIcon width="0.4375rem" height="0.875rem" color="#FFFFFF" icon="video-3" />
                    </div>

                    <!-- 倍速 -->
                    <div class="w-[3.25rem] h-[3.25rem] flex items-center justify-center cursor-pointer text-[1.125rem] font-['light']"
                        :class="speedClass(1)" @click="setSpeed(1)">
                        x1
                    </div>
                    <div class="w-[3.25rem] h-[3.25rem] flex items-center justify-center cursor-pointer text-[1.125rem] font-['light']"
                        :class="speedClass(2)" @click="setSpeed(2)">
                        x2
                    </div>
                    <div class="w-[3.25rem] h-[3.25rem] flex items-center justify-center cursor-pointer text-[1.125rem] font-['light']"
                        :class="speedClass(5)" @click="setSpeed(5)">
                        x5
                    </div>
                </div>

                <!-- 右侧：截图 / 下载 -->
                <div class="flex items-center">

                    <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center  relative"
                        >
                        <CustomDatePicker v-model="CustomDatePickerDate"/>
                        <!-- <SvgIcon width="1.5rem" height="1.5rem" color="#FFFFFF" icon="video-4" class="cursor-pointer" @click="isShowDateModel = !isShowDateModel"/>
                      
                        <div class=" absolute top-[-22.5rem] left-[-12.5rem] z-[12]" v-show="isShowDateModel">
                            <CustomDatePicker v-model="startDate" />
                        </div> -->
                    </div>
                    <!--  -->
                    <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center  relative"
                        >
                        <SvgIcon width="1.5rem" height="1.5rem" color="#FFFFFF" icon="video-6" class="cursor-pointer" @click="isShowDateModel2 = !isShowDateModel2"/>
                        <!-- DateModel -->
                        <div class=" absolute top-[-22.5rem] left-[-12.5rem] z-[12]" v-show="isShowDateModel2">
                            <DateModel @handlerDateClose="isShowDateModel2 = false" @apply="handlerDateApply" />
                        </div>
                    </div>
                     <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center cursor-pointer"
                        @click="isArchiveClipShow = true">
                        <SvgIcon width="1.5rem" height="1.5rem" color="#FFFFFF" icon="video-7" />
                    </div>
                    <!-- 下载整段视频 -->
                    <div class="w-[3.5625rem] h-[3.25rem] flex items-center justify-center cursor-pointer"
                        @click="downloadVideo">
                        <SvgIcon width="1.5rem" height="1.5rem" color="#FFFFFF" icon="video-5" />
                    </div>
                </div>
            </div>
        </div>
        <!-- ArchiveClip -->
        <ArchiveClip @handlerClose="handlerClose" v-if="isArchiveClipShow" />

    </div>
</template>

<script setup>
import ArchiveClip from "./components/ArchiveClip.vue";
import TimeCanvas from "./components/timeCanvas.vue";
import DateModel from "./components/DateModel.vue";
import CustomDatePicker from "@/components/CustomDatePicker.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isArchiveClipShow = ref(false);
const isShowDateModel = ref(false);
const isShowDateModel2 = ref(false);
const CustomDatePickerDate= ref("")
// 视频 src
const testVideoSrc = "/public/video/test2.mp4";

// 单视频
const videoRef = ref(null);

// 当前时间（毫秒）
const currentTimeMs = ref(0);
// 总时长（毫秒）
const durationMs = ref(0);

// 播放状态
const isPlaying = ref(false);

// 倍速
const multipleSpeed = ref(1);

// 时间片段（时间轴高亮用，可按需填）
const timeFrame = ref([]);

// 时间轴 ref
const TimeCanvasRef = ref(null);

const videoStartTimestamp = new Date().getTime();

// 载入视频元数据（拿到总时长）
const onLoadedMetadata = () => {
    const video = videoRef.value;
    if (!video) return;

    const duration = video.duration * 1000; // ms
    durationMs.value = duration;
    console.log("视频时长：", duration);
    // 
    timeFrame.value = [{
        id: 3,
        start: videoStartTimestamp,
        end: videoStartTimestamp + parseInt(duration),
        style: { background: "#1C64F2" }
    }];
    console.log(timeFrame.value);
};

// 视频播放进度更新 → 同步给时间轴
const onTimeUpdate = () => {
    const video = videoRef.value;
    if (!video) return;
    currentTimeMs.value = video.currentTime * 1000;
    // 如果你的 TimeCanvas 里是用 props 驱动的，这里只要改 currentTimeMs 就行
};

// 视频播完
const onEnded = () => {
    isPlaying.value = false;
};

// 时间轴拖动 / 点击 → 跳转视频
const onSeekFromTimeline = (absMs) => {
    const video = videoRef.value;
    if (!video) return;

    let relative = absMs - videoStartTimestamp;

    // 限制在视频范围内
    relative = Math.max(0, Math.min(relative, durationMs.value));

    video.currentTime = relative / 1000;
    currentTimeMs.value = relative;
};


// 播放 / 暂停
const togglePlay = () => {
    const video = videoRef.value;
    if (!video) return;
    if (isPlaying.value) {
        video.pause();
        isPlaying.value = false;
    } else {
        video.play();
        video.playbackRate = multipleSpeed.value;
        isPlaying.value = true;
    }
};

// 快进 15s
const fastForward = () => {
    const video = videoRef.value;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 15, video.duration);
};

// 后退 15s
const fastBackward = () => {
    const video = videoRef.value;
    if (!video) return;
    video.currentTime = Math.max(video.currentTime - 15, 0);
};

// 设置倍速（双向同步的 B 部分：视频驱动时间轴）
const setSpeed = (rate) => {
    multipleSpeed.value = rate;
    const video = videoRef.value;
    if (!video) return;
    video.playbackRate = rate;
};

// 倍速按钮样式
const speedClass = (rate) =>
    multipleSpeed.value === rate ? "text-[#1C64F2]" : "text-white";

// 截图当前画面（下载 PNG）
const captureFrame = () => {
    const video = videoRef.value;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = `frame_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// 下载整段视频（原文件）
const downloadVideo = () => {
    const a = document.createElement("a");
    a.href = testVideoSrc;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// 跳到末尾
const jumpToEnd = () => {
    const video = videoRef.value;
    if (!video) return;
    video.currentTime = video.duration;
};
const handlerClose = () => {
    isArchiveClipShow.value = false;
}
// 返回
const handlerBack = () => {
    router.push("/");
};
</script>

<style lang="scss" scoped>
.box-address {
    border-radius: 0.625rem;
    background: rgba(32, 36, 47, 0.3);
    backdrop-filter: blur(0.1875rem);
}
</style>
