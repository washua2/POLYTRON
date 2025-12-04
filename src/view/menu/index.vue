<template>
    <div id="menu" class="h-[100vh] ipad:h-[100svh] pb-[1.25rem] bg-white flex flex-wrap flex-col justify-between items-start border-r-[0.0625rem] box-menu
     absolute top-0 left-0 z-[20] transition-[width] duration-300 ease-in-out" :class="isCollapse ? 'w-[16.25rem]' : 'w-[5rem]'
        ">
        <!-- icon -->
        <div class="w-full">
            <div class="pt-[0.75rem] px-[1.25rem]">
                <div class="flex items-center gap-[1.25rem] cursor-pointer relative" @click="handlerTarget">
                    <div class="w-[2.5rem] h-[2.5rem] flex items-center justify-center ">
                        <SvgIcon width="1.25rem" height="1.25rem" icon="menu-1" />
                    </div>
                    <SvgIcon width="6.9375rem" height="0.875rem" color="#09090B" icon="logo"
                        class="transition-all duration-300 ease-in-out overflow-hidden absolute left-[3.125rem]"
                        :class="isCollapse ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'" />
                </div>
            </div>
            <div class="min-w-[2.5rem] max-w-full h-[1px] mx-[1.25rem] bg-[#E1E4EA] mt-[0.6875rem]"></div>
            <div class="w-full px-[1.25rem] mt-[1.125rem] flex flex-col gap-[0.5rem]">
                <div class="w-full h-[2.5rem]  rounded-[0.5rem] flex items-center justify-start pl-[0.625rem] gap-[1.125rem] relative cursor-pointer"
                    :class="activeIndex == index ? 'bg-[#1C64F2] text-white' : 'text-[#666D80]'"
                    @click="handlerSelect(item, index)" v-for="(item, index) in menuList" :key="index">
                    <SvgIcon width="1.25rem" height="1.25rem" :color="activeIndex == index&&index==0 ? '#fff' :index==0? '#666D80':''"
                        :icon="activeIndex == index ? item.iconActive : item.icon" />
                    <div class="justify-start  text-[0.875rem] font-medium font-['Roboto'] whitespace-nowrap transition-[width] duration-300 ease-in-out overflow-hidden absolute left-[3.125rem]"
                        :class="isCollapse ? 'opacity-100 max-w-full ' : 'opacity-0 max-w-0'">{{ item.title }}</div>
                </div>
            </div>
        </div>
        <!-- avatar -->
        <div class="w-full flex items-center relative">
            <div class="w-[2rem] h-[2rem] rounded-full overflow-hidden bg-[#FFC56E] ml-[1.5rem] ">
                <img src="@/assets/images/avatar.png" class="w-full h-full object-cover" alt="">
            </div>
            <div class=" whitespace-nowrap justify-start text-[0.875rem] font-medium font-['Roboto'] transition-all duration-300 ease-in-out overflow-hidden absolute left-[4.375rem]"
                :class="isCollapse ? 'opacity-100 max-w-full text-[#09090B]' : 'opacity-0 max-w-0 text-white'">Coco
                Mario</div>
        </div>

    </div>
</template>
<script setup>
import { ref, computed, watch , onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isCollapse = ref(false);

const menuList = ref([
    { title: "Camera", icon: "menu-2", iconActive: "menu-2-active", router: "/cameras" },
    { title: "Management", icon: "menu-3", iconActive: "menu-3-active", router: "/cameraManagement" },
    { title: "Archive", icon: "menu-4", iconActive: "menu-4-active", router: "/archive" },
    { title: "Settings", icon: "menu-5", iconActive: "menu-5-active", router: "/settings" },
]);

// 根据当前路由计算高亮索引
const activeIndex = computed(() => {
    const idx = menuList.value.findIndex(m => route.path.startsWith(m.router));
    return idx === -1 ? 0 : idx;
});

const handlerTarget = () => {
    isCollapse.value = !isCollapse.value;
};

const handlerSelect = (item) => {
    if (route.path.startsWith(item.router)) return;
    isCollapse.value= false;
    router.push(item.router);
};
const initMenuElement = () => {
    const dropdownMenu = document.getElementById("menu");
    document.addEventListener("click", function (event) {
        // 如果点击的不是 dropdown 本身，也不是它的子元素
        if (!dropdownMenu.contains(event.target)) {
             isCollapse.value = false;
        }
    });
}
// 刷新后也保留折叠状态
watch(isCollapse, v => localStorage.setItem("menuCollapse", v ? "1" : "0"), { immediate: false });
isCollapse.value = localStorage.getItem("menuCollapse") === "1";

onMounted(() => {
    initMenuElement();
})
</script>
<style lang="scss" scoped>
.box-menu{
    background: #FFF;
box-shadow: 0 0.0625rem 1rem 0 rgba(0, 7, 22, 0.20);
}
</style>
