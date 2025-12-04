<template>
    <div class="pt-[1.875rem] ">
        <!-- header -->
        <div class="flex items-center pl-[1.25rem]">
            <div class="mr-[11.125rem] justify-start text-[#09090B] text-[1.75rem] font-['bold']">Camera Management
            </div>
            <div
                class="w-[67.8125rem] h-[3.25rem] pl-[1.25rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] bg-white overflow-hidden flex items-center">
                <SvgIcon width="1.25rem" height="1.25rem" color="#99A0AE" icon="search" />
                <input type="text" placeholder="Search cameras.." v-model="inputValue"
                    class="w-[56.25rem] h-[1.125rem] ipt p-0 m-0 font-normal font-['Roboto'] text-[#09090B] text-[0.875rem] border-none outline-none pt-[0.125rem]  ml-[0.75rem]"
                    style="box-shadow: none;" @keydown.enter="handleSearch" />
            </div>
            <div
                class="w-[7.875rem] h-[3.25rem] ml-[1.25rem] rounded-[0.5rem] bg-[#1C64F2] overflow-hidden flex items-center justify-center cursor-pointer">
                <div class="justify-start text-white text-[0.875rem] font-['medium']">+ Add Camera</div>
            </div>
        </div>
        <!-- list -->
        <div class="w-full mt-[2.125rem]">
            <TableList @handlerDelete="handlerDelete" @handlerEdit="handlerEdit" />
        </div>
        <!-- EditCamera -->
        <EditCamera @handlerClose="handlerClose" v-if="isEditCamera" />
        <!-- DeleteModel -->
        <DeleteModel v-model:open="showDelete" :loading="deleteLoading" @confirm="doDelete"
            @cancel="showDelete = false" />

    </div>
</template>
<script setup>
import EditCamera from "./components/EditCamera.vue"
import TableList from "./components/TableList.vue"
import DeleteModel from "./components/DeleteModel.vue"
import { ref, reactive, computed, watch } from 'vue'
const inputValue = ref('')
const isEditCamera = ref(false)
const showDelete = ref(false);
const deleteLoading = ref(false);
const handleSearch = () => {

}
const handlerClose = () => {
    isEditCamera.value = false
}
const handlerEdit = () => {
    isEditCamera.value = true
}
const handlerDelete = () => {
    // deleteLoading.value = true;
    showDelete.value = true;
    // try {
    //     // await apiDelete();
    //     showDelete.value = false; // 成功后关闭
    // } finally {
    //     deleteLoading.value = false;
    // }
}

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