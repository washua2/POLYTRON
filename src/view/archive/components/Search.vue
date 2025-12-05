<template>
    <div class="h-[3.25rem] pl-[1.25rem] flex items-center">
        <div class="justify-start text-black text-[1.75rem] font-['bold']">Archives</div>
        <div class="flex items-center gap-[1.25rem] ml-[11.6875rem]">
            <!-- search -->
            <div class=" relative">
                <div id="search" class="w-[67.8125rem] h-[3.25rem] relative">
                    <div class="w-[67.8125rem] h-[3.25rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] bg-white overflow-hidden 
                 transition-all duration-200 ease-in-out absolute top-0 left-0 z-[12]"
                        >
                        <div
                            class="h-[3.25rem] ml-[1.25rem] py-[1rem] mr-[1rem] flex items-center justify-between border-b-[0.0625rem] border-[#E1E4EA]">
                            <div class="flex items-center">
                                <SvgIcon width="1.25rem" height="1.25rem" color="#99A0AE" icon="search" />
                                <input type="text" placeholder="Search cameras.." v-model="inputValue"
                                    v-if="!selectText && !currentColor"
                                    class="w-[56.25rem] h-[1.125rem] ipt p-0 m-0 font-normal font-['Roboto'] text-[#09090B] text-[0.875rem] border-none outline-none pt-[0.125rem]  ml-[0.75rem]"
                                    style="box-shadow: none;" @focus="handlerFocus" @blur="handlerBlur"
                                    @keydown.enter="handleSearch" />

                            </div>
                            <div class="flex items-center">
                                <div class="w-[1.5rem] h-[1.5rem] flex items-center justify-center cursor-pointer"
                                    @click="handlerClear" v-show="inputValue">
                                    <SvgIcon width="1.25rem" height="1.25rem" color="#09090B" icon="search-close" />
                                </div>
                            </div>
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
const emit = defineEmits(['handleSearch', 'handleCloseSearch','handlerAllSites'])
const isFocus = ref(false)
const inputValue = ref("")
const isShowDateModel = ref(false)

const handlerShowDate= () => {
    isShowDateModel.value = !isShowDateModel.value
}
// 清空状态
const handlerClear = () => {
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
  
        emit("handleSearch", inputValue)
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