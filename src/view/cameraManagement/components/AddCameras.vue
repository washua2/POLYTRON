<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]">
        <div class="w-[48.125rem] bg-white rounded-[1rem] overflow-hidden relative">
            <!-- header -->
            <div class="flex items-center justify-between px-[1.5rem] py-[1.25rem] border-b border-[#EAECEF]">
                <div class="text-[#09090B] text-[1rem] font-['medium']">Add Camera</div>
                <div class="w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer select-none"
                    @click="handleClose">
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.75rem" height="0.75rem" viewBox="0 0 12 12"
                        fill="none">
                        <g clip-path="url(#clip0)">
                            <path
                                d="M7.0885 6.0001L11.1645 1.92408C11.2381 1.85304 11.2967 1.76807 11.3371 1.67412C11.3774 1.58017 11.3987 1.47912 11.3996 1.37687C11.4005 1.27462 11.381 1.17321 11.3423 1.07857C11.3035 0.983933 11.2464 0.897952 11.1741 0.825648C11.1018 0.753343 11.0158 0.696163 10.9211 0.657442C10.8265 0.618722 10.7251 0.599238 10.6228 0.600127C10.5206 0.601015 10.4195 0.622259 10.3256 0.662618C10.2316 0.702977 10.1467 0.761643 10.0756 0.835193L5.99961 4.91121L1.92359 0.835193C1.77835 0.694917 1.58383 0.617298 1.38192 0.619052C1.18001 0.620807 0.986864 0.701795 0.844085 0.844574C0.701307 0.987352 0.620319 1.1805 0.618564 1.38241C0.616809 1.58432 0.694429 1.77884 0.834705 1.92408L4.91072 6.0001L0.834705 10.0761C0.761155 10.1472 0.702488 10.2321 0.662129 10.3261C0.621771 10.42 0.600527 10.5211 0.599638 10.6233C0.59875 10.7256 0.618234 10.827 0.656954 10.9216C0.695674 11.0163 0.752855 11.1022 0.825159 11.1745C0.897464 11.2469 0.983445 11.304 1.07808 11.3428C1.17272 11.3815 1.27413 11.401 1.37638 11.4001C1.47863 11.3992 1.57968 11.3779 1.67363 11.3376C1.76758 11.2972 1.85256 11.2386 1.92359 11.165L5.99961 7.08899L10.0756 11.165C10.2209 11.3053 10.4154 11.3829 10.6173 11.3811C10.8192 11.3794 11.0124 11.2984 11.1551 11.1556C11.2979 11.0128 11.3789 10.8197 11.3807 10.6178C11.3824 10.4159 11.3048 10.2214 11.1645 10.0761L7.0885 6.0001Z"
                                fill="#6B7280" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="12" height="12" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>

            <!-- tabs -->
            <div class="px-[1.5rem] pt-[0.75rem]">
                <div class="flex items-center gap-[1.5rem] text-[0.75rem] font-['medium']">
                    <div class="cursor-pointer select-none pb-[0.5rem]"
                        :class="activeTab === 'manual' ? 'text-[#1C64F2] border-b-2 border-[#1C64F2]' : 'text-[#717784]'"
                        @click="activeTab = 'manual'">
                        + Manual Addition
                    </div>
                    <div class="cursor-pointer select-none pb-[0.5rem]"
                        :class="activeTab === 'scan' ? 'text-[#1C64F2] border-b-2 border-[#1C64F2]' : 'text-[#717784]'"
                        @click="activeTab = 'scan'">
                        Scan Camera to Add
                    </div>
                </div>
            </div>

            <!-- body -->
            <div class="px-[1.5rem] py-[1.25rem] pb-[5rem]">
                <!-- =============== Manual Addition =============== -->
                <div v-show="activeTab === 'manual'">
                    <div class="my-[0.75rem] text-[#09090B] text-[0.875rem] font-['medium']">
                        Device Information Filling
                    </div>

                    <form id="deviceForm" @submit.prevent="handleManualSubmit">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[0.875rem] gap-y-[1rem]">
                            <!-- Device Type -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Device Type <span class="text-red-500">*</span>
                                </label>
                                <BaseSelect v-model="form.deviceType"
                                    :options="deviceTypes.map(t => ({ label: t, value: t }))"
                                    placeholder="Please Select Device Type" :error="errors.deviceType"
                                    @blur="validateField('deviceType')" />
                                <p v-if="errors.deviceType"
                                    class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.deviceType }}
                                </p>
                            </div>

                            <!-- Brand -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Brand <span class="text-red-500">*</span>
                                </label>
                                <BaseSelect v-model="form.brand" :options="brands.map(b => ({ label: b, value: b }))"
                                    placeholder="Please Select The Brand" :error="errors.brand"
                                    @blur="validateField('brand')" />
                                <p v-if="errors.brand" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.brand }}
                                </p>
                            </div>

                            <!-- Device Name -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Device Name <span class="text-red-500">*</span>
                                </label>
                                <input v-model.trim="form.deviceName" @input="validateField('deviceName')"
                                    @blur="validateField('deviceName')" type="text"
                                    placeholder="Example: Front Door Surveillance"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                                    :class="inputClass('deviceName')" />
                                <p v-if="errors.deviceName"
                                    class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.deviceName }}
                                </p>
                            </div>

                            <!-- Site Name -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Site Name <span class="text-red-500">*</span>
                                </label>
                                <input v-model.trim="form.siteName" @input="validateField('siteName')"
                                    @blur="validateField('siteName')" type="text" placeholder="Enter Site Name"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                                    :class="inputClass('siteName')" />
                                <p v-if="errors.siteName"
                                    class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.siteName }}
                                </p>
                            </div>

                            <!-- Group Name -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Group Name <span class="text-red-500">*</span>
                                </label>
                                <input v-model.trim="form.groupName" @input="validateField('groupName')"
                                    @blur="validateField('groupName')" type="text" placeholder="Enter Group Name"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                                    :class="inputClass('groupName')" />
                                <p v-if="errors.groupName"
                                    class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.groupName }}
                                </p>
                            </div>

                            <!-- Stream Address -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Stream Address <span class="text-red-500">*</span>
                                </label>
                                <input v-model.trim="form.streamAddress" @input="validateField('streamAddress')"
                                    @blur="validateField('streamAddress')" type="text"
                                    placeholder="rtsp://example.com/stream"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                                    :class="inputClass('streamAddress')" />
                                <p v-if="errors.streamAddress"
                                    class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.streamAddress }}
                                </p>
                            </div>

                            <!-- IP Address -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    IP Address <span class="text-red-500">*</span>
                                </label>
                                <input v-model.trim="form.ipAddress" @input="validateField('ipAddress')"
                                    @blur="validateField('ipAddress')" type="text" placeholder="192.168.1.100"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                                    :class="inputClass('ipAddress')" />
                                <p v-if="errors.ipAddress"
                                    class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.ipAddress }}
                                </p>
                            </div>

                            <!-- Port -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Port <span class="text-red-500">*</span>
                                </label>
                                <input v-model.trim="form.port" @input="validateField('port')"
                                    @blur="validateField('port')" type="text" placeholder="554"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                                    :class="inputClass('port')" />
                                <p v-if="errors.port" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                    {{ errors.port }}
                                </p>
                            </div>

                            <!-- Username -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Username
                                </label>
                                <input v-model.trim="form.username" type="text" placeholder="Device Login Username"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border border-gray-200 px-4 py-[0.5rem] outline-none transition" />
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Password
                                </label>
                                <input v-model.trim="form.password" type="password" placeholder="Device Login Password"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border border-gray-200 px-4 py-[0.5rem] outline-none transition" />
                            </div>
                        </div>

                        <!-- Recording Rule Settings -->
                        <div class="pt-[1.25rem]">
                            <div class="text-[#09090B] text-[0.875rem] font-['medium'] mb-[0.5rem]">
                                Recording Rule Settings
                            </div>
                            <label class="flex items-center gap-[0.5rem] cursor-pointer select-none">
                                <input type="checkbox" v-model="form.isAuto"
                                    class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA] ipt outline-none cursor-pointer accent-[#1C64F2]" />
                                <div class="flex items-center h-[1rem]">
                                    <span class="text-[#09090B] text-[0.75rem] font-['light']">Auto-enable
                                        Recording &nbsp;</span>
                                    <span class="text-[#717784] text-[0.75rem] font-['light']"> (Continuous
                                        Recording)</span>
                                </div>
                            </label>

                            <div class="mt-[0.75rem] w-[21.5rem]">
                                <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.25rem]">
                                    Storage Policy
                                </div>
                                <BaseSelect v-model="form.storagePolicy" :options="storagePolicies"
                                    placeholder="Select storage policy" class="h-[2.3125rem]" />
                            </div>
                        </div>
                    </form>
                </div>

                <!-- =============== Scan Camera to Add =============== -->
                <div v-show="activeTab === 'scan'" class="mt-[0.5rem]">
                    <div class="justify-center text-[#09090B] text-[0.875rem] font-['medium']">
                        Scan for camera devices in the local area network
                    </div>

                    <!-- scanning area -->
                    <div
                        class="flex flex-col items-center gap-[1rem] mt-[0.75rem] fhd:mt-[3rem] qhd:mt-[3rem] uhd:mt-[3rem]">
                        <div class="w-[6rem] h-[6rem] spin-infinite">
                            <img src="@/assets/images/scan.png" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="justify-start text-[#09090B] text-[0.875rem] font-['light']">
                            Scanning for surveillance devices in the local area network. Please wait...
                        </div>

                        <div class="w-[25rem] h-[0.5rem] bg-[#E1E4EA] rounded-full overflow-hidden relative">
                            <div class="h-[0.5rem] bg-[#1C64F2] absolute left-0 top-0 transition-all"
                                :style="{ width: scanProgress + '%' }"></div>
                        </div>

                        <div class="justify-start text-[#717784] text-[0.875rem] font-['light']">
                            Scan completed. {{ deviceList.length }} devices found.
                        </div>
                    </div>

                    <div class="mt-[2.25rem] justify-center text-[#09090B] text-[0.875rem] font-['medium']">
                        Found Devices ({{ deviceList.length }})
                    </div>

                    <!-- device cards -->
                    <div class="flex mt-[1.125rem] gap-[0.875rem] flex-wrap">
                        <div class="w-[22.125rem] h-[6rem] rounded-[0.375rem] pl-[0.75rem] pr-[1.1875rem] pb-[0.75rem] pt-[1.125rem] border-[0.0625rem] border-[#E1E4EA] flex"
                            v-for="item in deviceList" :key="item.id">
                            <!-- icon -->
                            <div
                                class="w-[2.625rem] h-[2.625rem] rounded-full bg-[#ECF3FF] flex-shrink-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.125rem" height="1.125rem"
                                    viewBox="0 0 18 18" fill="none">
                                    <path
                                        d="M10.9561 3.58423H1.7173C1.7173 3.58423 0.169922 3.58423 0.169922 5.0861V12.6865C0.169922 14.1883 1.7173 14.1883 1.7173 14.1883H10.9561C10.9561 14.1883 12.5034 14.1883 12.5034 12.6865V5.13161C12.5034 3.58423 10.9561 3.58423 10.9561 3.58423ZM17.2821 4.35792C17.1456 4.31241 17.009 4.31241 16.918 4.40343L13.8688 6.77001C13.7777 6.86103 13.7322 6.95205 13.7322 7.04307V10.8205C13.7322 10.9115 13.7777 11.048 13.8688 11.0936L16.918 13.4601C16.9635 13.5056 17.0545 13.5512 17.1456 13.5512C17.1911 13.5512 17.2366 13.5512 17.3276 13.5056C17.4641 13.4601 17.5097 13.3236 17.5097 13.1871V4.67649C17.5097 4.53996 17.4186 4.40343 17.2821 4.35792Z"
                                        fill="#1C64F2" />
                                </svg>
                            </div>

                            <!-- text -->
                            <div class="ml-[0.75rem] flex-1 min-w-0">
                                <div
                                    class="h-[1.5rem] justify-center text-[#09090B] text-[0.75rem] font-['medium'] truncate">
                                    {{ item.name }}
                                </div>
                                <div
                                    class="w-[9.375rem] justify-start text-[#09090B] text-[0.625rem] font-['light'] truncate">
                                    {{ item.model }}
                                </div>
                                <div class="justify-start text-[#52525B] text-[0.625rem] font-['light'] tracking-tight">
                                    IP : {{ item.ip }}:{{ item.port }}
                                </div>
                            </div>

                            <!-- actions -->
                            <div class="flex items-center gap-[1.25rem] justify-end self-end ml-[0.75rem]">
                                <label class="flex items-center gap-[0.4375rem] cursor-pointer select-none">
                                    <input type="checkbox" v-model="item.selected"
                                        class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA] ipt outline-none cursor-pointer accent-[#1C64F2]" />
                                    <div class="justify-center text-[#09090B] text-[0.75rem] font-['medium']">Select
                                    </div>
                                </label>

                                <div v-if="item.editable"
                                    class="h-[1rem] flex items-center gap-[0.4375rem] cursor-pointer select-none"
                                    @click="handleDeviceEdit(item)">
                                    <SvgIcon width="0.75rem" height="0.75rem" color="#1C64F2" icon="edit" />
                                    <div class="justify-center text-[#09090B] text-[0.75rem] font-['medium']">Edit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- footer actions -->
            <div class="flex items-center gap-[1rem] justify-end absolute bottom-[1.25rem] right-[1.25rem]">
                <button v-if="activeTab === 'scan'"
                    class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] overflow-hidden hover:bg-[#f0f1f5]"
                    @click="handleRescan">
                    <div class="justify-center text-[#09090B] text-[0.875rem] font-['light']">Rescan</div>
                </button>

                <button v-if="activeTab === 'scan'"
                    class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#1C64F2] bg-[#1C64F2] overflow-hidden hover:bg-[#417cf3]"
                    @click="handleConfirmScan">
                    <div class="justify-center text-[#fff] text-[0.875rem] font-['light']">Confirm</div>
                </button>

                <button v-if="activeTab === 'manual'" type="submit" form="deviceForm"
                    class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#1C64F2] bg-[#1C64F2] overflow-hidden hover:bg-[#417cf3]">
                    <div class="justify-center text-[#fff] text-[0.875rem] font-['light']">Add Camera</div>
                </button>
            </div>
        </div>
       
    </div>
</template>

<script setup>
import { reactive, ref, defineEmits } from "vue";
import BaseSelect from "@/components/BaseSelect.vue";

const emit = defineEmits(["close", "manualSubmit", "scanConfirm", "scanRescan", "scanEdit"]);
// tabs
const activeTab = ref("manual");

// ===== Manual Addition form =====
const deviceTypes = ["IPC", "PTZ", "NVR", "DVR", "Doorbell", "Other"];
const brands = ["Hikvision", "Dahua", "Axis", "Reolink", "Other"];
const storagePolicies = [
    { label: "Auto Overwrite the Earliest Recordings", value: "auto_overwrite" },
    { label: "Keep Last 7 Days", value: "keep_7d" },
    { label: "Keep Last 30 Days", value: "keep_30d" },
];

const form = reactive({
    deviceType: "",
    brand: "",
    deviceName: "",
    siteName: "",
    groupName: "",
    streamAddress: "",
    ipAddress: "",
    port: "",
    username: "",
    password: "",
    isAuto: false,
    storagePolicy: "auto_overwrite",
});

const errors = reactive({
    deviceType: "",
    brand: "",
    deviceName: "",
    siteName: "",
    groupName: "",
    streamAddress: "",
    ipAddress: "",
    port: "",
});

const rules = {
    deviceType: (v) => (!!v ? "" : "Please select a device type"),
    brand: (v) => (!!v ? "" : "Please select a brand"),
    deviceName: (v) => (v ? "" : "Please enter a device name"),
    siteName: (v) => (v ? "" : "Please enter a site name"),
    groupName: (v) => (v ? "" : "Please enter a group name"),
    streamAddress: (v) => {
        if (!v) return "Please enter a stream address";
        const ok = /^rtsp:\/\/.+|^https?:\/\/.+/i.test(v);
        return ok ? "" : "Stream address must start with rtsp:// or http(s)://";
    },
    ipAddress: (v) => {
        if (!v) return "Please enter an IP address";
        const ipReg = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
        return ipReg.test(v) ? "" : "Invalid IP address format";
    },
    port: (v) => {
        if (v === "" || v === null || v === undefined) return "Please enter a port number";
        const n = Number(v);
        if (!Number.isInteger(n)) return "Port must be an integer";
        if (n < 1 || n > 65535) return "Port must be between 1 and 65535";
        return "";
    },
};

function validateField(field) {
    errors[field] = rules[field]?.(form[field]) ?? "";
}
function validateAll() {
    let ok = true;
    Object.keys(errors).forEach((k) => {
        validateField(k);
        if (errors[k]) ok = false;
    });
    return ok;
}
function inputClass(field) {
    return errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-400";
}

function handleManualSubmit() {
    if (!validateAll()) return;
    emit("manualSubmit", { ...form });
    // 这里你接完 API 可以关闭
    // activeTab.value = "scan";
}

function handleClose() {
    emit("close");
}

// ===== Scan tab =====
const scanProgress = ref(80);

const deviceList = ref([
    {
        id: "dev_001",
        name: "Unknown Device",
        model: "POLYTRON IPCAM - PT - 1080P",
        ip: "192.168.1.110",
        port: 554,
        selected: false,
        editable: true,
    },
    {
        id: "dev_002",
        name: "Unknown Device",
        model: "POLYTRON IPCAM - PT - 1080P",
        ip: "192.168.1.110",
        port: 554,
        selected: true,
        editable: true,
    },
]);

function handleRescan() {
    emit("scanRescan");
    scanProgress.value = 0;

    // demo：模拟进度
    const timer = setInterval(() => {
        scanProgress.value += 10;
        if (scanProgress.value >= 100) clearInterval(timer);
    }, 120);
}

function handleConfirmScan() {
    const selected = deviceList.value.filter(d => d.selected);
    emit("scanConfirm", selected);
}

function handleDeviceEdit(item) {
    emit("scanEdit", item);
    detailOpen.value = true;
}
</script>

<style scoped lang="scss">
.ipt[type="checkbox"] {
    outline: none;
    box-shadow: none;
}

@keyframes spin360 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.spin-infinite {
    animation: spin360 1s linear infinite;
}
</style>
