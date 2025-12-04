<template>
    <div class="w-[48.125rem]   pl-[1.25rem] pr-[1rem] pt-[1.25rem] rounded-[1rem] bg-white relative overflow-hidden"
        :class="isStartAdding ? 'min-h-[46.6875rem] fhd:min-h-[51.0625rem] qhd:min-h-[51.0625rem] uhd:min-h-[51.0625rem]' : 'min-h-[36rem]'"
        style="box-shadow:0 4px 24px -8px rgba(0, 0, 0, 0.06);">
        <div class="w-[45.875rem] justify-start text-[#09090B] text-[1.25rem] font-['medium']">Device Addition Wizard
        </div>
        <div class="justify-start mt-[0.25rem] text-[#717784] text-[0.875rem] font-['light']">Please complete the
            device addition according to the steps to start using the monitoring service.</div>

        <div class="flex items-start justify-center gap-[17.875rem] mt-[1.75rem] relative">
            <div class="flex flex-col items-center gap-[0.625rem]">
                <div class="w-[3rem] h-[3rem] rounded-full bg-[#1C64F2] flex items-center justify-center">
                    <div class="justify-start text-white text-[1.5rem] font-['medium']">1</div>
                </div>
                <div class="justify-start text-[#09090B] text-[0.875rem] tracking-tight">Guidance
                    Instructions</div>
            </div>
            <div class=" h-[0.0625rem] bg-[#1C64F2] absolute left-[14.0625rem] top-[1.375rem] transition-all duration-200 ease-in-out overflow-hidden"
                :class="isFoundDevices ? 'w-[20rem]' : 'w-0'"></div>
            <div class="flex flex-col items-center gap-[0.625rem]">
                <div class="w-[3rem] h-[3rem] rounded-full  flex items-center justify-center"
                    :class="isStartAdding ? 'bg-[#1C64F2]' : 'bg-[#F4F5F6]'">
                    <div class="justify-start  text-[1.5rem] font-['medium']"
                        :class="isStartAdding ? 'text-white' : 'text-[#717784]'">2</div>
                </div>
                <div class="justify-start  text-[0.875rem] tracking-tight"
                    :class="isStartAdding ? 'text-[#09090B]' : 'text-[#717784]'">Add Device</div>
            </div>
        </div>
        <!-- step-1 -->
        <div v-show="!isStartAdding">
            <div class="mt-[2.25rem]">
                <div class="flex items-center gap-[0.875rem]">
                    <SvgIcon width="1.5rem" height="1.5rem" color="#000000" icon="computer" />
                    <div class="justify-center text-[#0E121B] text-[0.875rem] font-['medium']">Welcome to the Security
                        Surveillance Platform</div>
                </div>
                <div class="ml-[2.375rem]">
                    <div class="justify-center text-[#717784] text-[0.75rem] font-['light']">To quickly access
                        our monitoring service, please add your monitoring device first. After adding the device, you
                        can:<br />
                    </div>
                    <div class="mt-[1.5rem] flex flex-col gap-[0.75rem]">
                        <div class="flex items-center gap-[0.6875rem]">
                            <SvgIcon width="0.375rem" height="0.375rem" color="#000000" icon="dot" />
                            <div class="justify-center text-[#0E121B] text-[0.75rem] font-['light']">View real-time
                                monitoring
                                footage</div>
                        </div>
                        <div class="flex items-center gap-[0.6875rem]">
                            <SvgIcon width="0.375rem" height="0.375rem" color="#000000" icon="dot" />
                            <div class="justify-center text-[#0E121B] text-[0.75rem] font-['light']">Set recording rules
                                to
                                automatically save surveillance videos</div>
                        </div>
                        <div class="flex items-center gap-[0.6875rem]">
                            <SvgIcon width="0.375rem" height="0.375rem" color="#000000" icon="dot" />
                            <div class="justify-center text-[#0E121B] text-[0.75rem] font-['light']">Manage devices by
                                grouping
                            </div>
                        </div>
                        <div class="flex items-center gap-[0.6875rem]">
                            <SvgIcon width="0.375rem" height="0.375rem" color="#000000" icon="dot" />
                            <div class="justify-center text-[#0E121B] text-[0.75rem] font-['light']">View historical
                                monitoring
                                records</div>
                        </div>
                    </div>

                </div>

            </div>
            <div
                class="w-[45.625rem] h-[4rem] pl-[0.875rem] mt-[2.25rem] rounded-[0.375rem] bg-[#F4F5F6] overflow-hidden flex items-center justify-start gap-[0.75rem]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                        d="M9 2.25C12.7277 2.25 15.75 5.27231 15.75 9C15.75 12.7277 12.7277 15.75 9 15.75C5.27231 15.75 2.25 12.7277 2.25 9C2.25 5.27231 5.27231 2.25 9 2.25ZM9 3.375C5.89388 3.375 3.375 5.89388 3.375 9C3.375 12.1061 5.89388 14.625 9 14.625C12.1061 14.625 14.625 12.1061 14.625 9C14.625 5.89388 12.1061 3.375 9 3.375ZM9.12038 10.9288C9.34415 10.9288 9.55876 11.0177 9.717 11.1759C9.87523 11.3342 9.96413 11.5488 9.96413 11.7726C9.96413 11.9963 9.87523 12.2109 9.717 12.3692C9.55876 12.5274 9.34415 12.6163 9.12038 12.6163C8.8966 12.6163 8.68199 12.5274 8.52375 12.3692C8.36552 12.2109 8.27662 11.9963 8.27662 11.7726C8.27662 11.5488 8.36552 11.3342 8.52375 11.1759C8.68199 11.0177 8.8966 10.9288 9.12038 10.9288ZM9.08044 5.625C9.22962 5.625 9.3727 5.68426 9.47819 5.78975C9.58367 5.89524 9.64294 6.03832 9.64294 6.1875V9.40163C9.64294 9.55081 9.58367 9.69388 9.47819 9.79937C9.3727 9.90486 9.22962 9.96413 9.08044 9.96413C8.93125 9.96413 8.78818 9.90486 8.68269 9.79937C8.5772 9.69388 8.51794 9.55081 8.51794 9.40163V6.1875C8.51794 6.03832 8.5772 5.89524 8.68269 5.78975C8.78818 5.68426 8.93125 5.625 9.08044 5.625Z"
                        fill="#717784" />
                </svg>
                <div class="justify-center text-[#717784] text-[0.75rem] font-['light']">Please prepare information such
                    as the
                    device's stream address, IP address, and port number to complete the addition quickly.</div>
            </div>
            <div class="w-full flex items-center justify-end mt-[1.375rem]">
                <div class="w-[10.875rem] h-[2.5rem] rounded-[0.375rem] bg-[#1C64F2] flex items-center justify-center gap-[0.3125rem] cursor-pointer"
                    @click="handlerStartAdding">
                    <div
                        class="h-[1.125rem] justify-center text-white text-[0.875rem] font-medium font-['Roboto'] leading-[140%]">
                        Start Adding Device
                    </div>
                    <SvgIcon width="0.75rem" height="0.625rem" color="#fff" icon="arrow-left" class="rotate-180" />
                </div>
            </div>
        </div>
        <!-- step-2 -->
        <div class="mt-[2.25rem]" v-show="isStartAdding">
            <div class="flex items-center gap-[3.5625rem]">
                <div class="h-[2.3125rem] flex items-center gap-[0.375rem] border-b-[0.125rem] cursor-pointer"
                    :class="activeCount == 0 ? 'border-b-[0.125rem] border-[#1C64F2]' : 'border-transparent'" @click="activeCount = 0">
                    <SvgIcon width="0.75rem" height="0.75rem" :color="activeCount == 0 ? '#1C64F2' : '#717784'" icon="add" />
                    <div class="justify-start  text-[0.875rem] font-['medium'] mt-[0.125rem]"
                        :class="activeCount == 0 ? 'text-[#1C64F2]' : 'text-[#717784]'">Manual
                        Addition</div>
                </div>
                <div class="h-[2.3125rem] flex items-center gap-[0.375rem] border-b-[0.125rem] cursor-pointer"
                    :class="activeCount == 1 ? 'border-[#1C64F2]' : 'border-transparent'" @click="activeCount = 1">
                    <SvgIcon width="0.75rem" height="0.75rem" :color="activeCount == 1 ? '#1C64F2' : '#717784'" icon="scan" />
                    <div class="justify-start text-[0.875rem] font-['medium'] mt-[0.125rem]"
                        :class="activeCount == 1 ? 'text-[#1C64F2]' : 'text-[#717784]'">Scan Camera
                        to Add</div>
                </div>
            </div>
            <!-- ManualAddition -->
            <ManualAddition @handlerComplete="handlerComplete" @handlerPreviousStep="handlerPreviousStep"
                v-if="activeCount == 0" />
            <!-- ScanCameratoAdd -->
            <ScanCameratoAdd @handlerRescan="handlerRescan" @handlerConfirm="handlerConfirm" @handlerEdit="handlerEdit" v-else />
        </div>
        <!-- DeviceDetailsModal -->
        <DeviceDetailsModal v-model:open="detailOpen" :device="currentDevice" @confirm="onConfirmDevice" />
    </div>
</template>
<script setup>
import ManualAddition from './ManualAddition.vue'
import ScanCameratoAdd from './ScanCameratoAdd.vue'
import DeviceDetailsModal from './DeviceDetailsModal.vue'
import { ref } from 'vue'
const isStartAdding = ref(false)
const activeCount = ref(0)
const isFoundDevices = ref(false)
const detailOpen = ref(false)
const handlerStartAdding = () => {
    isStartAdding.value = true
}
const handlerRescan = () => {
    activeCount.value = 0
}
const handlerPreviousStep = () => {
    isStartAdding.value = false
}
const handlerConfirm = () => {
    isFoundDevices.value = true
}
const handlerEdit = (val) => {
    detailOpen.value = true
}
</script>