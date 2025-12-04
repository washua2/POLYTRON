<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]"
      @click.self="close"
    >
      <!-- modal container -->
      <div
        class="relative w-[76.1875rem] h-[34.6875rem] max-w-[95vw] rounded-[0.75rem] 
               bg-transparent flex"
      >
        <!-- left: player -->
        <div class="relative flex-1 bg-black rounded-l-[0.75rem] overflow-hidden">
          <!-- video -->
          <video
            ref="videoRef"
            class="w-full h-full object-fill bg-black"
            :src="clip?.videoUrl"
            controls
            autoplay
          />
          <!-- fullscreen btn (bottom-right like screenshot) -->
          <button
            class="absolute bottom-[0.75rem] right-[0.75rem]
                   text-white/80 hover:text-white transition"
            @click="toggleFullscreen"
            title="Fullscreen"
          >
            <SvgIcon width="1rem" height="1rem" icon="fullscreen" />
          </button>
        </div>

        <!-- right: info panel -->
        <div
          class="w-[15.625rem] bg-[#0B0B0C] rounded-r-[0.75rem]
                 px-[1rem] py-[1rem] pt-[1.25rem] text-white relative"
        >
          <!-- close in panel -->
          <!-- <button
            class="absolute top-[0.5rem] right-[0.5rem]
                   w-[1.5rem] h-[1.5rem] rounded-full bg-white/10
                   flex items-center justify-center hover:bg-white/20 transition"
            @click="close"
          >
            ✕
          </button> -->
          <div  class="absolute top-[-3rem] right-[-3rem] cursor-pointer
                     " @click="close">
              <SvgIcon width="2.125rem" height="2.125rem" icon="video-close-1" />
          </div>

          <div>
            <!-- title -->
            <div class="text-[1.125rem] font-['light']">
              {{ clip?.title || "-" }}
            </div>
            <!-- date -->
            <div class="mt-[1.25rem] text-[0.875rem] font-['light'] text-[#9F9F9F]">
              {{ clip?.date || "-" }}
            </div>

            <!-- time -->
            <div class="text-[0.875rem] font-['light'] text-[#9F9F9F]">
              {{ clip?.time || "-" }}
            </div>

            <!-- duration -->
            <div class="text-[0.875rem] font-['light'] text-[#9F9F9F]">
              {{ clip?.duration || "-" }}
            </div>
          </div>

          <!-- actions -->
          <div class="mt-[1rem] flex items-center gap-[1.5rem] text-white/80">
            <button class="hover:text-white transition" title="Download" @click="handleDownload">
              <SvgIcon width="0.875rem" height="0.875rem" icon="video-down" />
            </button>
            <button class="hover:text-white transition" title="Delete" @click="handleDelete">
              <SvgIcon width="0.875rem" height="0.875rem" icon="video-del" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  clip: { type: Object, default: null }, // {title,duration,date,time,videoUrl,deviceModel...}
});
const emit = defineEmits(["update:open", "close", "download", "delete"]);

const videoRef = ref(null);

function close() {
  emit("update:open", false);
  emit("close");
}

function handleDownload() {
  emit("download", props.clip);
}

function handleDelete() {
  emit("delete", props.clip);
}

// full screen
function toggleFullscreen() {
  const el = videoRef.value;
  if (!el) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    el.requestFullscreen?.();
  }
}

// open 时自动从头播放（更像截图）
watch(
  () => props.open,
  (v) => {
    if (v && videoRef.value) {
      videoRef.value.currentTime = 0;
      videoRef.value.play?.();
    }
  }
);

// esc 关闭
function onKey(e) {
  if (e.key === "Escape" && props.open) close();
}
window.addEventListener("keydown", onKey);
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>
