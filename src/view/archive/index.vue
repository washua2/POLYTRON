<template>
    <div class=" pt-[1.875rem]">
        <!-- search -->
        <div class="flex items-center">
            <Search />
            <div id="date" class="relative">
                <div
                    class="w-[8.375rem] h-[3.25rem] ml-[1.25rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] bg-white flex items-center 
                    justify-center gap-[0.6875rem] cursor-pointer" @click="isShow = !isShow">
                    <div class="w-[5rem] justify-start text-[#09090B] text-sm font-['light']">{{selected}}</div>
                    <SvgIcon width="0.875rem" height="0.625rem" color="#09090B" icon="arrow-left"
                        class="rotate-[-90deg]" />
                </div>
                <div class="w-[11.875rem] h-[6.5rem] box-date flex flex-col items-center justify-center absolute top-[3.75rem] left-[0rem] z-[99]"
                    v-show="isShow">
                    <!-- Chinese -->
                    <div class="group w-[11.875rem] h-[2.5rem] flex items-center pl-[1.125rem] gap-[0.75rem]
             text-[#09090B] text-[1rem] font-['light'] capitalize hover:bg-[#F4F5F6] cursor-pointer"
                        @click="choose('Newest First')">
                        <SvgIcon width="0.75rem" height="0.625rem" color="#1C64F2" icon="tick-model"
                            class="transition-opacity duration-150" :class="selected === 'Newest First'
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100'" />
                        Newest First
                    </div>

                    <!-- English -->
                    <div class="group w-[11.875rem] h-[2.5rem] flex items-center pl-[1.125rem] gap-[0.75rem]
             text-[#09090B] text-[1rem] font-['light'] capitalize hover:bg-[#F4F5F6] cursor-pointer"
                        @click="choose('Oldest First')">
                        <SvgIcon width="0.75rem" height="0.625rem" color="#1C64F2" icon="tick-model"
                            class="transition-opacity duration-150" :class="selected === 'Oldest First'
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100'" />
                        Oldest First
                    </div>
                </div>

            </div>

        </div>
        <!-- list -->
        <div class="px-[1.25rem] pr-[0.625rem] pt-[2.125rem]">
            <ArchiveClipGrid />
        </div>
        <!-- page -->
        <div
            class="w-[115rem] h-[4rem] px-[1.25rem] border-t-[0.0625rem] border-[#E1E4EA] bg-white z-[10] flex items-center justify-between fixed bottom-0 bg-white">
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
            <Page :totalPages="totalPages" @currentToPage="currentToPage" v-model="currentPage" />
        </div>
    </div>
</template>
<script setup>
import Search from './components/Search.vue';
import ArchiveClipGrid from './components/ArchiveClipGrid.vue';
import { ref , onMounted } from 'vue';
const isShow= ref(false)
const selected= ref('Newest First')
const totalPages = ref(100);
const currentPage = ref(1);
const currentToPage = (page) => {
    currentPage.value = page;
}
const choose = (val) => {
  selected.value = val;
  isShow.value = false; // 选完收起
};
const initElement = () => {
  const dropdown = document.getElementById("date");
  document.addEventListener("click", function (event) {
    // 如果点击的不是 dropdown 本身，也不是它的子元素
    if (!dropdown.contains(event.target)) {
      isShow.value = false
    }
  });
}
onMounted(() => {
  initElement()
})
</script>
<style lang="scss" scoped>
.box-date {
  border-radius: 0.25rem;
  background: #FFF;
  box-shadow: 0 0.375rem 1.125rem 0 rgba(0, 7, 22, 0.25);
}
</style>