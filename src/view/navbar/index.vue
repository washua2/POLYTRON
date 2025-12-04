<template>
  <div
    class="w-[114.8125rem] h-[4rem] pr-[1.3125rem] border-b-[0.0625rem] border-[#E1E4EA] flex items-center justify-between">
    <div class="pl-[1.5rem] py-[1.375rem]">
      <SvgIcon width="10rem" height="1.0625rem" color="#09090B" icon="logo" />
    </div>
    <div class="flex items-center">
      <div class="flex items-center gap-[0.5625rem]">

        <div class="w-28 text-right justify-center">
          <span class="text-[#717784] text-[0.875rem] font-normal font-['Roboto']">Used</span><span
            class="text-[#09090B] text-[0.875rem] font-normal font-['Roboto']"> 0 </span><span
            class="text-[#717784] text-[0.875rem] font-normal font-['Roboto']">/ 600 min</span>
        </div>
        <SvgIcon width="1.125rem" height="1.125rem" color="#09090B" icon="clock" />
      </div>
      <div class="w-[0.0625rem] h-[1.375rem] ml-[1.375rem] mr-[1.25rem] bg-[#E1E4EA]"></div>
      <div id="language" class="relative">
        <div class="flex items-center gap-[0.5625rem] cursor-pointer" @click="isShow = !isShow">
          <div class="w-[1.25rem] h-[1.25rem] rounded-full bg-[#E1E4EA]">
            <img src="@/assets/images/us.png" class="w-full h-full object-cover" alt="">
          </div>
          <div class="w-[5.1875rem] justify-center text-[#09090B] text-[0.875rem] font-['light']">
            {{ selectedLang == 'cn' ? 'Chinese (CN)' : 'English (US)' }}
          </div>
          <div class="w-[1.25rem] h-[1.25rem] flex items-center justify-center">
            <SvgIcon width="1.25rem" height="0.4375rem" color="#09090B" icon="arrow-bottom" />
          </div>
        </div>
        <div
          class="w-[11.875rem] h-[6.5rem] box flex flex-col items-center justify-center absolute top-[1.875rem] left-[-3.125rem] z-[99]"
          v-show="isShow">
          <!-- Chinese -->
          <div class="group w-[11.875rem] h-[2.5rem] flex items-center pl-[1.125rem] gap-[0.75rem]
             text-[#09090B] text-[1rem] font-['light'] capitalize hover:bg-[#F4F5F6] cursor-pointer"
            @click="chooseLang('cn')">
            <SvgIcon width="0.75rem" height="0.625rem" color="#1C64F2" icon="tick-model"
              class="transition-opacity duration-150" :class="selectedLang === 'cn'
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'" />
            Chinese (CN)
          </div>

          <!-- English -->
          <div class="group w-[11.875rem] h-[2.5rem] flex items-center pl-[1.125rem] gap-[0.75rem]
             text-[#09090B] text-[1rem] font-['light'] capitalize hover:bg-[#F4F5F6] cursor-pointer"
            @click="chooseLang('us')">
            <SvgIcon width="0.75rem" height="0.625rem" color="#1C64F2" icon="tick-model"
              class="transition-opacity duration-150" :class="selectedLang === 'us'
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'" />
            English (US)
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const isShow = ref(false)
// 当前选中的语言
const selectedLang = ref("us");

const chooseLang = (val) => {
  selectedLang.value = val;
  isShow.value = false; // 选完收起
};
const initLanguageElement = () => {
  const dropdownLanguage = document.getElementById("language");
  document.addEventListener("click", function (event) {
    // 如果点击的不是 dropdown 本身，也不是它的子元素
    if (!dropdownLanguage.contains(event.target)) {
      isShow.value = false
    }
  });
}
onMounted(() => {
  initLanguageElement()
})
</script>
<style scoped lang="scss">
.box {
  border-radius: 0.25rem;
  background: #FFF;
  box-shadow: 0 0.375rem 1.125rem 0 rgba(0, 7, 22, 0.25);
}
</style>