<template>
    <div class="h-[3.25rem] pl-[1.25rem] flex items-center">
        <div class="justify-start text-black text-[1.75rem] font-['bold']">Cameras</div>
        <div class="flex items-center gap-[1.25rem] ml-[11.9375rem]">
            <div
                class="w-[7.875rem] h-[3.25rem] pt-[0.9375rem] pb-[1rem] pl-[0.875rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] flex items-center cursor-pointer"
                 @click="handlerAllSites">
                <SvgIcon width="1.25rem" height="1.25rem" color="#09090B" icon="address" />
                <div
                    class="h-[1.3125rem] ml-[0.5rem] mr-[0.3438rem] justify-start text-[#09090B] text-[0.875rem] font-['Semibold']">
                    All Sites</div>
                <div class="w-[1rem] h-[1rem] flex items-center justify-center">
                    <SvgIcon width="1rem" height="0.375rem" color="#717784" icon="arrow-down" class=" transition-all duration-300 ease-in-out " 
                    :class="{ 'rotate-90': isAllSites }" @click="handlerRotate" />
                </div>
            </div>
            <!-- search -->
            <div class=" relative">
                <div id="search" class="w-[67.8125rem] h-[3.25rem] relative">
                    <div class="w-[67.8125rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] bg-white overflow-hidden 
                 transition-all duration-200 ease-in-out absolute top-0 left-0 z-[12]"
                        :class="isFocus ? 'ipt-box h-[32.125rem]' : 'h-[3.25rem]'">
                        <div
                            class="h-[3.25rem] ml-[1.25rem] py-[1rem] mr-[1rem] flex items-center justify-between border-b-[0.0625rem] border-[#E1E4EA]">
                            <div class="flex items-center">
                                <SvgIcon width="1.25rem" height="1.25rem" color="#99A0AE" icon="search" />
                                <input type="text" placeholder="Search cameras.." v-model="inputValue"
                                    v-if="!selectText && !currentColor"
                                    class="w-[56.25rem] h-[1.125rem] ipt p-0 m-0 font-normal font-['Roboto'] text-[#09090B] text-[0.875rem] border-none outline-none pt-[0.125rem]  ml-[0.75rem]"
                                    style="box-shadow: none;" @focus="handlerFocus" @blur="handlerBlur"
                                    @keydown.enter="handleSearch" />
                                <!-- fake input -->
                                <div class="flex items-center gap-[1rem]" v-else>
                                    <div
                                        class="ml-[0.75rem] justify-start text-[#09090B] text-[0.875rem] font-['Semibold'] line-clamp-1">
                                        {{ selectText }}
                                    </div>
                                    <div class="w-[1.5rem] h-[1.5rem] border rounded cursor-pointer"
                                        :style="{ backgroundColor: currentColor }" @click="isShowColor = true">
                                    </div>
                                </div>

                            </div>
                            <div class="flex items-center">
                                <div class="w-[1.5rem] h-[1.5rem] flex items-center justify-center cursor-pointer"
                                    @click="handlerClear" v-show="inputValue || selectText || currentColor">
                                    <SvgIcon width="1.25rem" height="1.25rem" color="#09090B" icon="search-close" />
                                </div>
                                <div class="w-[0.0625rem] h-[2rem] bg-[#E4E4E7] mx-[1.75rem]"
                                    v-show="inputValue || selectText || currentColor"></div>
                                <SvgIcon width="1.25rem" height="1.25rem" color="#000000" icon="cameras" class=" cursor-pointer" @click="handlerSearchCamera" />
                            </div>
                        </div>
                        <div class="w-full h-full" @mouseover="handlerMouseOver">
                            <!-- desc -->
                            <div class="pl-[1.25rem] mt-[0.75rem]" v-show="isFocus">
                                <div
                                    class="justify-start text-[#717784] text-[0.875rem] font-normal font-['Roboto'] line-clamp-1">
                                    Search results may be inaccurate or incomplete. Review results carefully before
                                    acting
                                    on
                                    them.</div>
                                <div
                                    class="mt-[1.5rem] justify-start text-[#09090B] text-[1rem] font-normal font-['Roboto']">
                                    Select search options</div>
                                <div class="mt-[0.625rem] flex items-center gap-[1.25rem]">
                                    <div class="w-[5.625rem] h-[2.125rem] rounded-full  flex items-center justify-center cursor-pointer"
                                        :class="selectCount == index ? 'bg-[#1C64F2] ' : 'bg-[#F4F5F6]'"
                                        v-for="(item, index) in selectList" :key="index" @click="handlerSelect(index)">
                                        <div class="justify-start text-[0.875rem] font-normal font-['Roboto'] tracking-tight"
                                            :class="selectCount == index ? 'text-white' : 'text-[#44444E]'">{{
                                                item.title }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- people -->
                            <div class="w-full mt-[1.3125rem]" v-show="selectCount == 0">
                                <div
                                    class="pl-[1.25rem] justify-start text-[#44444E] text-[0.875rem] font-normal font-['Roboto'] capitalize line-clamp-1">
                                    date:</div>
                                <div class="mt-[0.4375rem] flex flex-col">
                                    <div class="w-full h-[2.5rem] py-[0.6875rem] px-[1.25rem]  flex items-center justify-between cursor-pointer hover:bg-[#F4F5F6]"
                                        :class="item.checked ? 'bg-[#F4F5F6] ' : ''" v-for="(item, index) in peopleList"
                                        :key="index" @click="handlerPeople(item)">
                                        <div class="justify-start text-[0.875rem] font-normal font-['Roboto'] line-clamp-1"
                                            :class="item.checked ? 'text-[#09090B]' : 'text-[#44444E] '">
                                            {{ item.name }}</div>
                                        <SvgIcon width="1.25rem" height="1.25rem" color="#717784" icon="select-close"
                                            v-show="item.checked" />
                                    </div>
                                </div>
                            </div>
                            <!-- Vehicles -->
                            <div class="w-full" v-show="selectCount == 1">
                                <div class="mt-[0.4375rem] flex flex-col">
                                    <div class="w-full h-[2.5rem] py-[0.6875rem] px-[1.25rem]  flex items-center justify-between cursor-pointer hover:bg-[#F4F5F6]"
                                        :class="item.checked ? 'bg-[#F4F5F6] ' : ''"
                                        v-for="(item, index) in vehiclesList" :key="index"
                                        @click="handlerVehicles(item)">
                                        <div class="justify-start text-[0.875rem] font-normal font-['Roboto'] line-clamp-1"
                                            :class="item.checked ? 'text-[#09090B]' : 'text-[#44444E] '">
                                            {{ item.name }}</div>
                                        <SvgIcon width="1.25rem" height="1.25rem" color="#717784" icon="select-close"
                                            v-show="item.checked" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- color -->
                <div v-show="isShowColor">
                    <div class="color-box p-[1.5rem] absolute top-[4.0625rem] left-0 z-[11] flex items-center gap-[1.25rem]"
                        v-show="showColor">
                        <div class="w-[2.25rem] h-[2.25rem] rounded-[0.25rem] flex items-center justify-center cursor-pointer"
                            :class="item == '#ffffff' ? 'border-[0.0625rem] border-[#E8EAEF]' : ''"
                            :style="{ backgroundColor: item }" v-for="(item, index) in colors" :key="index"
                            @click="selectColor(item)">
                            <SvgIcon width="1.25rem" height="1rem" color="#717784" icon="color-sure"
                                v-show="currentColor == item" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- data -->
            <div id="date-model" class=" relative">
            <div 
                class="w-[3.25rem] h-[3.25rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] flex items-center justify-center relative cursor-pointer" @click="handlerShowDate">
                <SvgIcon width="1.25rem" height="1.25rem" icon="date"   />
                <!-- date -->
                
            </div>
            <div class=" absolute top-[4.375rem] left-[-9.375rem] z-[12]"  v-show="isShowDateModel">
                    <DateModel @handlerDateClose="isShowDateModel=false" @apply="handlerDateApply" />    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import DateModel from '@/components/DateModel.vue'
import { ref, onMounted, computed, watch, defineEmits,defineProps,inject} from 'vue'
const { VideoStore } = inject('store')
const props = defineProps({
    isShowTree: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['handleSearch', 'handleCloseSearch','handlerAllSites'])
const isFocus = ref(false)
const selectCount = ref(-1)
const currentColor = ref("")
const isShowColor = ref(true)
const inputValue = ref("")
const isAllSites = ref(false)
const isShowDateModel = ref(false)
const selectList = ref([{
    title: 'People'
}, {
    title: 'Vehicles'
}])
const peopleList = ref([{
    name: "Upper body:",
    checked: false
}, {
    name: "Lower body:",
    checked: false
}, {
    name: "Gender appearance:",
    checked: false
}, {
    name: "Wearing backpack:",
    checked: false
}])
const vehiclesList = ref([{
    name: "Sedan",
    checked: false
}, {
    name: "SUV",
    checked: false
}, {
    name: "Van",
    checked: false
}, {
    name: "Semi Truck",
    checked: false
}, {
    name: "Bus",
    checked: false
}, {
    name: "Motorcycle",
    checked: false
}, {
    name: "BiKe",
    checked: false
}, {
    name: "Utility Car",
    checked: false
}])
const colors = [
    '#ffffff', '#87929B', '#000000', '#FDD24F',
    '#F78D16', '#C02432', '#1A6F4E', '#1796CD', '#983402'
]
const showColor = computed(() => {
    let chrPeople = peopleList.value.some(item => item.checked)
    let chrVehicles = vehiclesList.value.some(item => item.checked)
    if (chrPeople || chrVehicles) {
        return true
    } else {
        return false
    }
})
const selectText = computed(() => {
    let chrPeople = peopleList.value.filter(item => item.checked == true)
    let chrVehicles = vehiclesList.value.filter(item => item.checked == true)
    if (chrPeople.length > 0) {
        return chrPeople[0].name
    } else if (chrVehicles.length > 0) {
        return chrVehicles[0].name
    } else {
        return ""
    }
})
const isUploadImage = computed(() => VideoStore.state.isUploadImage)

watch(()=>props.isShowTree, (val) => {
    isAllSites.value = val
})
watch(showColor, (val) => {
    isFocus.value = !val
})
watch(isUploadImage, (val) => {
    if (val) {
        inputValue.value = "Upload the schoolbag and search for people carrying a schoolbag"
        let data = {
            keyword: inputValue.value,
            tag: selectText.value,
            color: currentColor.value
        }
        emit("handleSearch", data)
    }else{
        inputValue.value = ""
        emit("handleSearch", null)
    }
})
const handlerShowDate= () => {
    isShowDateModel.value = !isShowDateModel.value
}
// 选中分类
const handlerSelect = (index) => {
    if (selectCount.value == index) return
    selectCount.value = index
}
// 选中子分类
const handlerPeople = (item) => {
    peopleList.value.forEach(item => item.checked = false)
    item.checked = !item.checked
    isShowColor.value = true
}
const handlerVehicles = (item) => {
    vehiclesList.value.forEach(item => item.checked = false)
    item.checked = !item.checked
    isShowColor.value = true
}
const selectColor = (color) => {
    currentColor.value = color
    isShowColor.value = false
}
// 清空状态
const handlerClear = () => {
    peopleList.value.forEach(item => item.checked = false)
    vehiclesList.value.forEach(item => item.checked = false)
    currentColor.value = ""
    selectCount.value = -1
    isFocus.value = false
    isShowColor.value = false
    inputValue.value = ""
    emit("handleCloseSearch")
}
// 
const handlerFocus = () => {
    isFocus.value = true
}
const handlerBlur = () => {
    isFocus.value = false
}
const handlerMouseOver = () => {
    if (showColor.value) return
    isFocus.value = true
}
const handlerSearchCamera = () => {
    VideoStore.methods.setUpload(true)
}
// 搜索数据
const handleSearch = () => {
    if (inputValue.value || selectText.value || currentColor.value) {
        isFocus.value = false
        let data = {
            keyword: inputValue.value,
            tag: selectText.value,
            color: currentColor.value
        }
        emit("handleSearch", data)
    }
} 
const initSearchElement = () => {
    const dropdown = document.getElementById("search");
    document.addEventListener("click", function (event) {
        // 如果点击的不是 dropdown 本身，也不是它的子元素
        if (!dropdown.contains(event.target)) {
            isFocus.value = false
        }
    });
    // const dropdownDate = document.getElementById("date-model");
    // document.addEventListener("click", function (event) {
    //     // 如果点击的不是 dropdown 本身，也不是它的子元素
    //     if (!dropdownDate.contains(event.target)) {
    //         isShowDateModel.value = false
    //     }
    // });
}
const handlerAllSites= () => {
    isAllSites.value = !isAllSites.value
    emit('handlerAllSites',isAllSites.value)
}
const handlerDateApply = () => {
    isShowDateModel.value = false
}
onMounted(() => {
    initSearchElement()
})
</script>
<style lang="scss" scoped>
.ipt-box {
    border-radius: 0.5rem;
    background: #FFF;
    box-shadow: 0 0.625rem 1.625rem 0 rgba(0, 7, 22, 0.25);
}

.color-box {
    width: 33.25rem;
    height: 5.25rem;
    border-radius: 0.25rem;
    background: #FFF;
    box-shadow: 0 0.375rem 1.125rem 0 rgba(0, 7, 22, 0.25);
}
.ipt::-webkit-input-placeholder {
    color: #717784;
}

.ipt:-ms-input-placeholder {
    color: #717784;
}

.ipt::placeholder {
    color: #717784;
}
</style>