<template>
    <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]" v-if="open" >
        <teleport to="body">
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-1"
                enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="open" class="fixed inset-0 z-[999] flex items-center justify-center "
                    @click.self="handleClose">
                    <transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="opacity-0 translate-y-2 scale-95"
                        enter-to-class="opacity-100 translate-y-0 scale-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="opacity-100 translate-y-0 scale-100"
                        leave-to-class="opacity-0 translate-y-2 scale-95">
                        <div class="w-[25rem] rounded-[1rem] bg-white overflow-hidden">
                            <!-- header -->
                            <div
                                class="flex items-center justify-between px-[1.25rem] py-[1.25rem] border-b border-[#EAECEF]">
                                <div class="text-[#09090B] text-[1.125rem] font-['medium']">
                                    Device Details
                                </div>
                                <button class="text-[#717784] hover:text-[#09090B] transition" @click="handleClose">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.75rem" height="0.75rem"
                                        viewBox="0 0 12 12" fill="none">
                                        <g clip-path="url(#clip0_470_6653)">
                                            <path
                                                d="M7.0885 5.99998L11.1645 1.92396C11.2381 1.85292 11.2967 1.76795 11.3371 1.674C11.3774 1.58004 11.3987 1.47899 11.3996 1.37674C11.4005 1.27449 11.381 1.17309 11.3423 1.07845C11.3035 0.983811 11.2464 0.89783 11.1741 0.825526C11.1018 0.753221 11.0158 0.69604 10.9211 0.65732C10.8265 0.6186 10.7251 0.599116 10.6228 0.600005C10.5206 0.600893 10.4195 0.622137 10.3256 0.662496C10.2316 0.702855 10.1467 0.761521 10.0756 0.835071L5.99961 4.91109L1.92359 0.835071C1.77835 0.694795 1.58383 0.617176 1.38192 0.61893C1.18001 0.620685 0.986864 0.701673 0.844085 0.844452C0.701307 0.98723 0.620319 1.18037 0.618564 1.38229C0.616809 1.5842 0.694429 1.77872 0.834705 1.92396L4.91072 5.99998L0.834705 10.076C0.761155 10.147 0.702488 10.232 0.662129 10.326C0.621771 10.4199 0.600527 10.521 0.599638 10.6232C0.59875 10.7255 0.618234 10.8269 0.656954 10.9215C0.695674 11.0161 0.752855 11.1021 0.825159 11.1744C0.897464 11.2467 0.983445 11.3039 1.07808 11.3426C1.17272 11.3814 1.27413 11.4008 1.37638 11.3999C1.47863 11.3991 1.57968 11.3778 1.67363 11.3375C1.76758 11.2971 1.85256 11.2384 1.92359 11.1649L5.99961 7.08886L10.0756 11.1649C10.2209 11.3052 10.4154 11.3828 10.6173 11.381C10.8192 11.3793 11.0124 11.2983 11.1551 11.1555C11.2979 11.0127 11.3789 10.8196 11.3807 10.6177C11.3824 10.4158 11.3048 10.2212 11.1645 10.076L7.0885 5.99998Z"
                                                fill="#6B7280" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_470_6653">
                                                <rect width="12" height="12" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>

                            <!-- body -->
                            <form class=" py-[1.25rem]  " @submit.prevent="handleConfirm">
                                <div class="px-[1.25rem] pb-[0.625rem]">
                                <div class="w-[23.4375rem] overflow-y-auto scroll">
                                    <div class="space-y-[1rem] w-[22.5rem] h-[25rem]">
                                        <!-- Device Name -->
                                        <div>
                                            <label
                                                class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                                Device Name <span class="text-red-500">*</span>
                                            </label>
                                            <input v-model.trim="local.deviceName" @input="validateField('deviceName')"
                                                @blur="validateField('deviceName')" type="text" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                           text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                           " :class="inputClass('deviceName')" />
                                            <p v-if="errors.deviceName"
                                                class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                                {{ errors.deviceName }}
                                            </p>
                                        </div>

                                        <!-- Device Type -->
                                        <div>
                                            <label
                                                class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                                Device Type <span class="text-red-500">*</span>
                                            </label>
                                            <BaseSelect v-model="local.deviceType"
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
                                            <label
                                                class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                                Brand <span class="text-red-500">*</span>
                                            </label>
                                            <BaseSelect v-model="local.brand"
                                                :options="brands.map(b => ({ label: b, value: b }))"
                                                placeholder="Please select the brand" :error="errors.brand"
                                                @blur="validateField('brand')" />
                                            <p v-if="errors.brand"
                                                class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                                                {{ errors.brand }}
                                            </p>
                                        </div>

                                        <!-- Username -->
                                        <div>
                                            <label
                                                class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                                Username
                                            </label>
                                            <input v-model.trim="local.username" type="text" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                           text-[0.875rem] border border-gray-200 px-4 py-[0.5rem]
                           outline-none transition " />
                                        </div>

                                        <!-- Password -->
                                        <div>
                                            <label
                                                class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                                                Password
                                            </label>
                                            <input v-model.trim="local.password" type="password" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                           text-[0.875rem] border border-gray-200 px-4 py-[0.5rem]
                           outline-none transition " />
                                        </div>

                                        <!-- Auto-enable Recording -->
                                        <label
                                            class="flex items-center gap-[0.5rem] mt-[0.5rem] cursor-pointer select-none">
                                            <input type="checkbox" v-model="local.isAuto" class="w-[1rem] h-[1rem] rounded-[0.25rem]
                           border-[0.0625rem] border-[#E1E4EA] ipt outline-none cursor-pointer" />
                                            <div class="h-[1rem] text-[#09090B] text-[0.75rem] font-['light']">
                                                Auto-enable Recording
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                </div>
                                <!-- footer button -->
                                <div class="pt-[1.25rem] px-[1.25rem] flex justify-end border-t-[0.0625rem] border-[#ccc] bg-[#F9FAFB]">
                                    <button type="submit" class="w-[10.5rem] h-[2.75rem] rounded-[0.5rem]
                         bg-[#1C64F2] text-white text-[0.875rem] font-['light']
                         hover:bg-[#417cf3] transition">
                                        Confirm Addition
                                    </button>
                                </div>
                            </form>
                        </div>
                    </transition>
                </div>
            </transition>
        </teleport>
    </div>
    </transition>
</template>

<script setup>
import { reactive, watch ,inject} from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
const props = defineProps({
    open: { type: Boolean, default: false },
    device: {
        type: Object,
        default: () => ({
            deviceName: "",
            deviceType: "",
            brand: "",
            username: "",
            password: "",
            isAuto: false,
        })
    }
});

const emit = defineEmits(["update:open", "confirm"]);

const deviceTypes = ["IPC", "NVR", "DVR", "Doorbell", "Other", "PTZ"];
const brands = ["Hikvision", "Dahua", "Axis", "Reolink", "Other"];

const local = reactive({
    deviceName: "",
    deviceType: "",
    brand: "",
    username: "",
    password: "",
    isAuto: false,
});

const errors = reactive({
    deviceName: "",
    deviceType: "",
    brand: "",
});

const rules = {
    deviceName: (v) => (v ? "" : "Please enter a device name"),
    deviceType: (v) => (!!v ? "" : "Please select a device type"),
    brand: (v) => (!!v ? "" : "Please select a brand"),
};

function validateField(field) {
    errors[field] = rules[field]?.(local[field]) ?? "";
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

function handleClose() {
    emit("update:open", false);
}

function handleConfirm() {
    if (!validateAll()) return;
    emit("confirm", { ...local });
    emit("update:open", false);
}

watch(
    () => props.device,
    (d) => {
        local.deviceName = d.deviceName || "";
        local.deviceType = d.deviceType || "";
        local.brand = d.brand || "";
        local.username = d.username || "";
        local.password = d.password || "";
        local.isAuto = !!d.isAuto;

        // reset errors on open/update
        Object.keys(errors).forEach(k => (errors[k] = ""));
    },
    { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.ipt[type='checkbox'] {
    outline: none;
    box-shadow: none;
}
</style>
