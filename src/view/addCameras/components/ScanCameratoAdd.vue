<template>
    <div class="mt-[1.25rem]">
        <div class="justify-center text-[#09090B] text-[0.875rem] font-['medium']">Scan for camera devices in the local
            area network</div>
        <div class="flex flex-col items-center gap-[1rem] mt-[0.75rem] fhd:mt-[3rem] qhd:mt-[3rem] uhd:mt-[3rem]">
            <div class="w-[6rem] h-[6rem] spin-infinite">
                <img src="@/assets/images/scan.png" alt="" class="w-full h-full object-cover">
            </div>
            <div class="justify-start text-[#09090B] text-[0.875rem] font-['light']">Scanning for surveillance devices
                in the local area network. Please wait...</div>
            <div class="w-[25rem] h-[0.5rem] bg-[#E1E4EA] rounded-full overflow-hidden relative">
                <div class="w-[80%] h-[0.5rem] bg-[#1C64F2] absolute left-0 top-0"></div>
            </div>
            <div class="justify-start text-[#717784] text-[0.875rem] font-['light']">Scan completed. 2 devices found.
            </div>
        </div>
        <div class="mt-[2.25rem] justify-center text-[#09090B] text-[0.875rem] font-['medium']">Found Devices (2)</div>
        <!-- device -->
        <div class="flex mt-[1.125rem] gap-[1.375rem]">
            <div
                class="w-[22.125rem] h-[6rem] rounded-[0.375rem] pl-[0.75rem] pr-[1.1875rem] pb-[0.75rem] pt-[1.125rem] border-[0.0625rem] border-[#E1E4EA] flex "
                v-for="(item,index) in deviceList" :key="index">
                <div
                    class="w-[2.625rem] h-[2.625rem] rounded-full bg-[#ECF3FF] flex-shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.125rem" height="1.125rem" viewBox="0 0 18 18"
                        fill="none">
                        <path
                            d="M10.9561 3.58423H1.7173C1.7173 3.58423 0.169922 3.58423 0.169922 5.0861V12.6865C0.169922 14.1883 1.7173 14.1883 1.7173 14.1883H10.9561C10.9561 14.1883 12.5034 14.1883 12.5034 12.6865V5.13161C12.5034 3.58423 10.9561 3.58423 10.9561 3.58423ZM17.2821 4.35792C17.1456 4.31241 17.009 4.31241 16.918 4.40343L13.8688 6.77001C13.7777 6.86103 13.7322 6.95205 13.7322 7.04307V10.8205C13.7322 10.9115 13.7777 11.048 13.8688 11.0936L16.918 13.4601C16.9635 13.5056 17.0545 13.5512 17.1456 13.5512C17.1911 13.5512 17.2366 13.5512 17.3276 13.5056C17.4641 13.4601 17.5097 13.3236 17.5097 13.1871V4.67649C17.5097 4.53996 17.4186 4.40343 17.2821 4.35792Z"
                            fill="#1C64F2" />
                    </svg>
                </div>
                <div class="ml-[0.75rem]">
                    <div class="h-[1.5rem] justify-center text-[#09090B] text-[0.75rem] font-['medium']">Unknown Device
                    </div>
                    <div class="w-[9.375rem] justify-start text-[#09090B] text-[0.625rem] font-['light']">POLYTRON IPCAM
                        - PT - 1080P
                    </div>
                    <div class="justify-start text-[#52525B] text-[0.625rem] font-['light'] tracking-tight">IP : 192.168.1.110:554</div>
                </div>
                <div class="flex items-center gap-[1.25rem] justify-end self-end ml-[0.75rem]">
                    <div class="flex items-center gap-[0.4375rem] cursor-pointer select-none">
                        <input type="checkbox" v-model="item.selected"
                            class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA] ipt outline-none cursor-pointer" />
                        <div class="justify-center text-[#09090B] text-[0.75rem] font-['medium']">Select</div>
                    </div>
                    <div class="h-[1rem] flex items-center gap-[0.4375rem] cursor-pointer select-none" @click="handlerEdit(item)">
                        <SvgIcon width="0.75rem" height="0.75rem" color="#1C64F2" icon="edit" />
                        <div class="justify-center text-[#09090B] text-[0.75rem] font-['medium']">Edit</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Actions -->
        <div class="flex items-center gap-[1rem] justify-end absolute bottom-[1.25rem] right-[1.25rem]">
            <button
                class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] overflow-hidden hover:bg-[#f0f1f5]"
                @click="handlerRescan">
                <div class="justify-center text-[#09090B] text-[0.875rem] font-['light']">Rescan</div>
            </button>
            <button class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#1C64F2] bg-[#1C64F2] 
            overflow-hidden hover:bg-[#417cf3]" @click="handlerConfirm">
                <div class="justify-center text-[#fff] text-[0.875rem] font-['light']">Confirm</div>
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, defineEmits, inject } from 'vue'
const { VideoStore } = inject('store')
const emit = defineEmits(['handlerRescan', 'handlerConfirm','handlerEdit'])

const deviceList = [
    {
        id: "dev_001",
        name: "Unknown Device",
        model: "POLYTRON IPCAM - PT - 1080P",
        ip: "192.168.1.110",
        port: 554,
        selected: false,     // 是否勾选 Select
        editable: true       // 是否显示 Edit（可选）
    },
    {
        id: "dev_002",
        name: "Unknown Device",
        model: "POLYTRON IPCAM - PT - 1080P",
        ip: "192.168.1.110",
        port: 554,
        selected: true,
        editable: true
    }
];

const handlerRescan = () => {
    emit('handlerRescan')
}
const handlerConfirm = () => {
    emit('handlerConfirm')
    VideoStore.methods.setAddDeviceShow(false)
}
const handlerEdit = (item) => {
        emit('handlerEdit', item)
}
</script>
<style lang="scss" scoped>
.ipt[type='checkbox'] {
    outline: none;
    box-shadow: none;
}
@keyframes spin360 {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spin-infinite {
  animation: spin360 1s linear infinite;
}

</style>