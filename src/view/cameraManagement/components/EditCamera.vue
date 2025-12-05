<template>
    <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]">
        <div class="w-[48.125rem] bg-white rounded-[1rem] overflow-hidden">
            <!-- header -->
            <div class="flex items-center justify-between px-[1.25rem] py-[1.25rem] border-b border-[#EAECEF]">
                <div class="text-[#09090B] text-[1rem] font-['medium']">Edit Camera</div>

                <div class="w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer select-none"
                    @click="handlerClose">
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.75rem" height="0.75rem" viewBox="0 0 12 12"
                        fill="none">
                        <g clip-path="url(#clip0_506_6501)">
                            <path
                                d="M7.0885 6.0001L11.1645 1.92408C11.2381 1.85304 11.2967 1.76807 11.3371 1.67412C11.3774 1.58017 11.3987 1.47912 11.3996 1.37687C11.4005 1.27462 11.381 1.17321 11.3423 1.07857C11.3035 0.983933 11.2464 0.897952 11.1741 0.825648C11.1018 0.753343 11.0158 0.696163 10.9211 0.657442C10.8265 0.618722 10.7251 0.599238 10.6228 0.600127C10.5206 0.601015 10.4195 0.622259 10.3256 0.662618C10.2316 0.702977 10.1467 0.761643 10.0756 0.835193L5.99961 4.91121L1.92359 0.835193C1.77835 0.694917 1.58383 0.617298 1.38192 0.619052C1.18001 0.620807 0.986864 0.701795 0.844085 0.844574C0.701307 0.987352 0.620319 1.1805 0.618564 1.38241C0.616809 1.58432 0.694429 1.77884 0.834705 1.92408L4.91072 6.0001L0.834705 10.0761C0.761155 10.1472 0.702488 10.2321 0.662129 10.3261C0.621771 10.42 0.600527 10.5211 0.599638 10.6233C0.59875 10.7256 0.618234 10.827 0.656954 10.9216C0.695674 11.0163 0.752855 11.1022 0.825159 11.1745C0.897464 11.2469 0.983445 11.304 1.07808 11.3428C1.17272 11.3815 1.27413 11.401 1.37638 11.4001C1.47863 11.3992 1.57968 11.3779 1.67363 11.3376C1.76758 11.2972 1.85256 11.2386 1.92359 11.165L5.99961 7.08899L10.0756 11.165C10.2209 11.3053 10.4154 11.3829 10.6173 11.3811C10.8192 11.3794 11.0124 11.2984 11.1551 11.1556C11.2979 11.0128 11.3789 10.8197 11.3807 10.6178C11.3824 10.4159 11.3048 10.2214 11.1645 10.0761L7.0885 6.0001Z"
                                fill="#6B7280" />
                        </g>
                        <defs>
                            <clipPath id="clip0_506_6501">
                                <rect width="12" height="12" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>

            <!-- body -->
            <div class="pr-[0.625rem]">
                <div
                    class="h-[43.75rem] px-[1.25rem] pr-[0.625rem] py-[1.25rem]  overflow-y-auto overflow-hidden scroll">
                    <form id="editCameraForm" @submit.prevent="handleSubmit">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[1rem] gap-y-[1rem]">
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
                                    placeholder="Please select the brand" :error="errors.brand"
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
                                    placeholder="Example: Front Door Surveillance" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                       focus:ring-2 focus:ring-blue-200" :class="inputClass('deviceName')" />
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
                                    @blur="validateField('siteName')" type="text" placeholder="Enter Site" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                       focus:ring-2 focus:ring-blue-200" :class="inputClass('siteName')" />
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
                                    @blur="validateField('groupName')" type="text" placeholder="Enter Group" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                       focus:ring-2 focus:ring-blue-200" :class="inputClass('groupName')" />
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
                                    placeholder="rtsp://example.com/stream" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                       focus:ring-2 focus:ring-blue-200" :class="inputClass('streamAddress')" />
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
                                    @blur="validateField('ipAddress')" type="text" placeholder="192.168.1.100" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                       focus:ring-2 focus:ring-blue-200" :class="inputClass('ipAddress')" />
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
                                    @blur="validateField('port')" type="text" placeholder="554" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                       focus:ring-2 focus:ring-blue-200" :class="inputClass('port')" />
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
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border border-gray-200 px-4 py-[0.5rem]
                       outline-none transition focus:ring-2 focus:ring-blue-200" />
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                    Password
                                </label>
                                <input v-model.trim="form.password" type="password" placeholder="Device Login Password"
                                    class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border border-gray-200 px-4 py-[0.5rem]
                       outline-none transition focus:ring-2 focus:ring-blue-200" />
                            </div>
                        </div>
                    </form>

                    <!-- Recording Rule Settings + Custom block -->
                    <div class="mt-[1.5rem]">
                        <div class="text-[#09090B] text-[0.875rem] font-['medium'] mb-[0.75rem]">
                            Recording Rule Settings
                        </div>

                        <!-- Auto-enable -->
                        <label class="flex items-center gap-[0.5rem] cursor-pointer select-none">
                            <input type="checkbox" v-model="form.isAuto" class="w-[1rem] h-[1rem] rounded-[0.25rem]
                     border-[0.0625rem] border-[#E1E4EA]
                     ipt outline-none cursor-pointer accent-[#1C64F2]" />
                            <div class="mt-[-0.125rem]">
                                <span class="text-[#09090B] text-[0.75rem] font-['light']">
                                    Auto-enable Recording
                                </span>
                                <span class="text-[#717784] text-[0.75rem] font-['light']">
                                    (Continuous Recording)
                                </span>
                            </div>
                        </label>

                        <!-- radio options -->
                        <div class="mt-[0.75rem] ml-[1.5rem] space-y-[0.5rem]">
                            <label class="flex items-center gap-[0.5rem] cursor-pointer select-none">
                                <input type="radio" value="24_7" v-model="form.recordMode" :disabled="!form.isAuto"
                                    class="w-[1rem] h-[1rem] rounded-full border border-[#E1E4EA]
                       cursor-pointer accent-[#1C64F2]" />
                                <span class="text-[0.75rem] font-['light']"
                                    :class="form.isAuto ? 'text-[#09090B]' : 'text-[#A1A1AA]'">
                                    24/7 Continuous Recording
                                </span>
                            </label>

                            <label class="flex items-center gap-[0.5rem] cursor-pointer select-none">
                                <input type="radio" value="custom" v-model="form.recordMode" :disabled="!form.isAuto"
                                    class="w-[1rem] h-[1rem] rounded-full border border-[#E1E4EA]
                       cursor-pointer accent-[#1C64F2]" />
                                <span class="text-[0.75rem] font-['light']"
                                    :class="form.isAuto ? 'text-[#09090B]' : 'text-[#A1A1AA]'">
                                    Custom Recording Time Period
                                </span>
                            </label>
                        </div>

                        <!-- custom block (second screenshot) -->
                        <div v-if="form.isAuto && form.recordMode === 'custom'">
                            <!-- divider -->
                            <div class="mt-[1rem] h-[1px] bg-[#EAECEF]"></div>

                            <!-- time range -->
                            <div class="flex items-center gap-[1rem] mt-[1rem]">
                                <!-- Start Time -->
                                <div>
                                    <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                        Start Time
                                    </label>
                                    <div class="relative">
                                        <CustomTimeSecondPicker v-model="form.customStart" />
                                    </div>
                                </div>

                                <!-- End Time -->
                                <div>
                                    <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                        End Time
                                    </label>
                                    <div class="relative">
                                        <CustomTimeSecondPicker v-model="form.customEnd" />
                                    </div>
                                </div>
                            </div>

                            <!-- Repeat -->
                            <div class="mt-[1rem]">
                                <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.5rem]">
                                    Repeat
                                </div>

                                <div class="flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem]">
                                    <label v-for="d in weekDays" :key="d.value"
                                        class="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" v-model="form.repeatDays" :value="d.value" class="w-[1rem] h-[1rem] rounded-[0.25rem]
                           border-[0.0625rem] border-[#E1E4EA]
                           ipt outline-none cursor-pointer accent-[#1C64F2]" />
                                        <span class="text-[#09090B] text-[0.75rem] font-['light']">
                                            {{ d.label }}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Storage Policy -->
                        <div class="mt-[1.25rem] w-[21.5rem]">
                            <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.25rem]">
                                Storage Policy
                            </div>

                            <BaseSelect v-model="form.storagePolicy" :options="storagePolicies"
                                placeholder="Select storage policy" class="h-[2.3125rem]" />
                        </div>
                    </div>

                    <!-- footer buttons -->
                    <div class="flex items-center justify-end gap-[0.75rem] mt-[2.9375rem]">
                        <button type="button" class="w-[9.375rem] h-[2.5rem] rounded-[0.5rem]
                   border-[0.0625rem] border-[#E1E4EA] hover:bg-[#f0f1f5] transition
                   text-[#09090B] text-[0.875rem] font-['light']" @click="handlePrevious">
                            Previous Step
                        </button>

                        <button type="submit" form="editCameraForm" class="w-[9.375rem] h-[2.5rem] rounded-[0.5rem]
                   border-[0.0625rem] border-[#1C64F2] bg-[#1C64F2]
                   hover:bg-[#417cf3] transition
                   text-white text-[0.875rem] font-['light']">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script setup>
import { reactive ,defineEmits} from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
import CustomTimeSecondPicker from "@/components/CustomTimeSecondPicker.vue"; // Import the custom time picker component

const emit= defineEmits(['handlerClose'])
const deviceTypes = ["PTZ", "IPC", "NVR", "DVR", "Doorbell", "Other"];
const brands = ["Hikvision", "Dahua", "Axis", "Reolink", "Other"];

const storagePolicies = [
    { label: "Auto Overwrite the Earliest Recordings", value: "auto_overwrite" },
    { label: "Keep Last 7 Days", value: "keep_7d" },
    { label: "Keep Last 30 Days", value: "keep_30d" },
];

const weekDays = [
    { label: "Monday", value: "Mon" },
    { label: "Tuesday", value: "Tue" },
    { label: "Wednesday", value: "Wed" },
    { label: "Thursday", value: "Thu" },
    { label: "Friday", value: "Fri" },
    { label: "Saturday", value: "Sat" },
    { label: "Sunday", value: "Sun" },
];

const form = reactive({
    deviceType: "PTZ",
    brand: "Hikvision",
    deviceName: "AKEBONO",
    siteName: "Circuit Road",
    groupName: "Exit",
    streamAddress: "https://polytronone.com/738492",
    ipAddress: "192.503.182.41-99",
    port: "4455",
    username: "Coco Mario",
    password: "124434546",

    isAuto: true,
    recordMode: "24_7",           // "24_7" | "custom"
    customStart: "00:00:00",      // custom 开启时显示
    customEnd: "00:00:00",
    repeatDays: [],               // ["Mon","Tue"...]
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
        const ipReg =
            /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
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

function handlePrevious() {
    console.log("previous step");
}

function handleSubmit() {
    if (!validateAll()) return;

    const payload = {
        ...form,
        recordMode: form.isAuto ? form.recordMode : null,
        customSchedule:
            form.isAuto && form.recordMode === "custom"
                ? {
                    start: form.customStart,
                    end: form.customEnd,
                    days: [...form.repeatDays],
                }
                : null,
    };

    console.log("save changes payload:", payload);
    //  调接口
}

function handlerClose() {
    console.log("close modal");
    emit('handlerClose')
}
</script>

<style lang="scss" scoped>
.ipt[type='checkbox'] {
    outline: none;
    box-shadow: none;
}
</style>
