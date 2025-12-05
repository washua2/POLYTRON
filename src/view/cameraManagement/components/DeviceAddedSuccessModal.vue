<template>
  <div class="fixed inset-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]">
    <div class="w-[28.75rem] bg-white rounded-[1rem] overflow-hidden relative">
      <!-- close -->
      <div
        class="absolute top-[1rem] right-[1rem] w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer select-none"
        @click="handleClose"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="0.75rem" height="0.75rem" viewBox="0 0 12 12" fill="none">
          <g clip-path="url(#clip0)">
            <path
              d="M7.0885 6.0001L11.1645 1.92408C11.2381 1.85304 11.2967 1.76807 11.3371 1.67412C11.3774 1.58017 11.3987 1.47912 11.3996 1.37687C11.4005 1.27462 11.381 1.17321 11.3423 1.07857C11.3035 0.983933 11.2464 0.897952 11.1741 0.825648C11.1018 0.753343 11.0158 0.696163 10.9211 0.657442C10.8265 0.618722 10.7251 0.599238 10.6228 0.600127C10.5206 0.601015 10.4195 0.622259 10.3256 0.662618C10.2316 0.702977 10.1467 0.761643 10.0756 0.835193L5.99961 4.91121L1.92359 0.835193C1.77835 0.694917 1.58383 0.617298 1.38192 0.619052C1.18001 0.620807 0.986864 0.701795 0.844085 0.844574C0.701307 0.987352 0.620319 1.1805 0.618564 1.38241C0.616809 1.58432 0.694429 1.77884 0.834705 1.92408L4.91072 6.0001L0.834705 10.0761C0.761155 10.1472 0.702488 10.2321 0.662129 10.3261C0.621771 10.42 0.600527 10.5211 0.599638 10.6233C0.59875 10.7256 0.618234 10.827 0.656954 10.9216C0.695674 11.0163 0.752855 11.1022 0.825159 11.1745C0.897464 11.2469 0.983445 11.304 1.07808 11.3428C1.17272 11.3815 1.27413 11.401 1.37638 11.4001C1.47863 11.3992 1.57968 11.3779 1.67363 11.3376C1.76758 11.2972 1.85256 11.2386 1.92359 11.165L5.99961 7.08899L10.0756 11.165C10.2209 11.3053 10.4154 11.3829 10.6173 11.3811C10.8192 11.3794 11.0124 11.2984 11.1551 11.1556C11.2979 11.0128 11.3789 10.8197 11.3807 10.6178C11.3824 10.4159 11.3048 10.2214 11.1645 10.0761L7.0885 6.0001Z"
              fill="#6B7280"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <!-- body -->
      <div class="px-[2rem] pt-[2.25rem] pb-[1.75rem] flex flex-col items-center text-center">
        <!-- success icon -->
        <div
          class="w-[3.5rem] h-[3.5rem] rounded-full bg-[#E9FCEB] flex items-center justify-center mb-[1.25rem]"
        >
          <div class="w-[2.25rem] h-[2.25rem] rounded-full border border-[#BBF7D0] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.6667 5L8.125 13.5417L3.33334 8.75"
                stroke="#22C55E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div class="text-[#09090B] text-[1rem] font-['medium']">
          Device Added Successfully
        </div>
        <div class="mt-[0.5rem] text-[#717784] text-[0.875rem] font-['light']">
          You have successfully added the surveillance device.
        </div>
      </div>

      <!-- footer buttons -->
      <div class="px-[2rem] pb-[1.75rem] flex items-center justify-center gap-[1rem]">
        <button
          type="button"
          class="w-[11.5rem] h-[2.75rem] rounded-[0.5rem]
                 border border-[#E1E4EA] bg-white
                 hover:bg-[#F0F1F5] transition
                 text-[#09090B] text-[0.875rem] font-['light']"
          @click="handleContinue"
        >
          Continue Adding
        </button>

        <button
          type="button"
          class="w-[11.5rem] h-[2.75rem] rounded-[0.5rem]
                 border border-[#1C64F2] bg-[#1C64F2]
                 hover:bg-[#417cf3] transition
                 text-white text-[0.875rem] font-['light']"
          @click="handleAccess"
        >
          Access Surveillance
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close", "continueAdding", "accessSurveillance"]);

const handleClose = () => {
  emit("close");
};

const handleContinue = () => {
  emit("continueAdding");
};

const handleAccess = () => {
  emit("accessSurveillance");
};
</script>

<style scoped lang="scss">
/* 保持你项目里 checkbox / scroll 这些统一风格，这里不用额外加 */
</style>
