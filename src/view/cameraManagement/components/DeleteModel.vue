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
      v-if="open"
       class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]"
      @mousedown.self="handleCancel"
    >
      <div
        class="w-[30rem] bg-white rounded-[1rem] overflow-hidden px-[2.5rem] pt-[2.25rem] pb-[2rem]"
      >
        <!-- icon circle -->
        <div class="w-full flex justify-center">
          <div
            class="w-[5.5rem] h-[5.5rem] rounded-full bg-[#FFF5F7] flex items-center justify-center"
          >
            <div
              class="w-[3.75rem] h-[3.75rem] rounded-full border border-[#F9D0D8] bg-white flex items-center justify-center"
            >
              <SvgIcon icon="trash" width="1.5rem" height="1.5rem" color="#DF1C41" />
            </div>
          </div>
        </div>

        <!-- title -->
        <div class="mt-[2rem] text-center text-[#09090B] text-[1.5rem] font-['semibold']">
          Confirm Delete
        </div>

        <!-- desc -->
        <div class="mt-[0.5rem] text-center text-[#717784] text-[1rem] font-['light']">
          Are you sure you want to delete this data?
        </div>

        <!-- actions -->
        <div class="mt-[2rem] flex items-center justify-between gap-[1rem]">
          <button
            type="button"
            class="flex-1 h-[3rem] rounded-[0.5rem] border border-[#DFE1E7]
                   bg-white hover:bg-[#F7F8FA] transition
                   text-[#0D0D12] text-[1rem] font-['light']"
            :disabled="loading"
            @click="handleCancel"
          >
            Cancel
          </button>

          <button
            type="button"
            class="flex-1 h-[3rem] rounded-[0.5rem] border border-transparent
                   bg-[#DF1C41] hover:bg-[#F02655] active:scale-[0.98] transition
                   text-white text-[1rem] font-['light']
                   flex items-center justify-center gap-2"
            :disabled="loading"
            @click="handleConfirm"
          >
            <span
              v-if="loading"
              class="inline-block w-[1rem] h-[1rem] rounded-full border-2 border-white border-t-transparent animate-spin"
            ></span>
            Delete
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["update:open", "cancel", "confirm"]);

const handleCancel = () => {
  emit("cancel");
  emit("update:open", false);
};

const handleConfirm = () => {
  emit("confirm");
  // 不自动关，由父层/接口成功后关
};

// esc close
const onKeydown = (e) => {
  if (e.key === "Escape" && props.open && !props.loading) {
    handleCancel();
  }
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
