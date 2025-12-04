<template>
    <div>
        <div class="my-[1.25rem] justify-center text-[#09090B] text-[0.875rem] font-['medium']">Device Information
            Filling</div>
        <div
            class="w-[46.125rem] h-[19rem]  fhd:h-[23.375rem] qhd:h-[23.375rem] uhd:h-[23.375rem] overflow-y-auto overflow-hidden scroll">
            <form class="w-[44.875rem] " id="deviceForm" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[0.875rem] gap-y-[1rem]">
                    <!-- Device Type -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Device Type <span class="text-red-500">*</span>
                        </label>

                        <div class="relative">
                            <BaseSelect v-model="form.deviceType"
                                :options="deviceTypes.map(t => ({ label: t, value: t }))"
                                placeholder="Please Select Device Type" :error="errors.deviceType"
                                @blur="validateField('deviceType')" />
                        </div>

                        <p v-if="errors.deviceType" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.deviceType }}</p>
                    </div>

                    <!-- Brand -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Brand <span class="text-red-500">*</span>
                        </label>

                        <div class="relative">
                            <BaseSelect v-model="form.brand" :options="brands.map(t => ({ label: t, value: t }))"
                                placeholder="Please select the brand" :error="errors.deviceType"
                                @blur="validateField('brand')" />
                        </div>
                        <p v-if="errors.brand" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.brand }}</p>
                    </div>


                    <!-- Device Name -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Device Name <span class="text-red-500">*</span>
                        </label>
                        <input v-model.trim="form.deviceName" @input="validateField('deviceName')"
                            @blur="validateField('deviceName')" type="text"
                            placeholder="Example: Front Door Surveillance" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem] outline-none transition
                 " :class="inputClass('deviceName')" />
                        <p v-if="errors.deviceName" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.deviceName }}</p>
                    </div>

                    <!-- Site Name -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Site Name <span class="text-red-500">*</span>
                        </label>
                        <input v-model.trim="form.siteName" @input="validateField('siteName')"
                            @blur="validateField('siteName')" type="text" placeholder="Enter Site" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                 " :class="inputClass('siteName')" />
                        <p v-if="errors.siteName" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.siteName }}</p>
                    </div>

                    <!-- Group Name -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Group Name <span class="text-red-500">*</span>
                        </label>
                        <input v-model.trim="form.groupName" @input="validateField('groupName')"
                            @blur="validateField('groupName')" type="text" placeholder="Enter Group" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                 " :class="inputClass('groupName')" />
                        <p v-if="errors.groupName" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.groupName }}</p>
                    </div>

                    <!-- Stream Address -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Stream Address <span class="text-red-500">*</span>
                        </label>
                        <input v-model.trim="form.streamAddress" @input="validateField('streamAddress')"
                            @blur="validateField('streamAddress')" type="text" placeholder="rtsp://example.com/stream"
                            class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                 " :class="inputClass('streamAddress')" />
                        <p v-if="errors.streamAddress" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.streamAddress }}</p>
                    </div>

                    <!-- IP Address -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            IP Address <span class="text-red-500">*</span>
                        </label>
                        <input v-model.trim="form.ipAddress" @input="validateField('ipAddress')"
                            @blur="validateField('ipAddress')" type="text" placeholder="192.168.1.100" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                 " :class="inputClass('ipAddress')" />
                        <p v-if="errors.ipAddress" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.ipAddress }}</p>
                    </div>

                    <!-- Port -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                            Port <span class="text-red-500">*</span>
                        </label>
                        <input v-model.trim="form.port" @input="validateField('port')" @blur="validateField('port')"
                            type="text" placeholder="554" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                 " :class="inputClass('port')" />
                        <p v-if="errors.port" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">{{ errors.port }}</p>
                    </div>

                    <!-- Username -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">Username</label>
                        <input v-model.trim="form.username" type="text" placeholder="Device Login Username" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                  border-gray-200" />
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">Password</label>
                        <input v-model.trim="form.password" type="password" placeholder="Device Login Password" class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem] text-[0.875rem] border px-4 text-gr[1rem] py-[0.5rem]outline-none transition
                  border-gray-200" />
                    </div>
                </div>
            </form>
        </div>
        <!-- footer -->
        <div class="pt-[0.875rem]">
            <div class="justify-center text-[#09090B] text-[0.875rem] font-['medium']">Recording Rule Settings</div>
            <label class="flex items-center gap-[0.5rem] mt-[0.875rem] cursor-pointer select-none">
                <input type="checkbox" v-model="form.isAuto"
                    class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA] ipt outline-none cursor-pointer" />
                <div class="justify-start mt-[-0.25rem]"><span class="text-[#09090B] text-[0.75rem] font-['light']">Auto-enable
                        Recording
                    </span><span class="text-[#717784] text-[0.75rem] font-['light']">(Continuous
                        Recording)</span></div>
            </label>
        </div>
        <!-- Actions -->
        <div class="flex items-center gap-[1rem] justify-end absolute bottom-[1.25rem] right-[1.25rem]">
            <button  class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] overflow-hidden hover:bg-[#f0f1f5]" @click="handlerPreviousStep">
                <div class="justify-center text-[#09090B] text-[0.875rem] font-['light']">Previous Step</div>
            </button>
            <button type="submit" form="deviceForm" class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem] border-[0.0625rem] border-[#1C64F2] bg-[#1C64F2] overflow-hidden hover:bg-[#417cf3]">
                <div class="justify-center text-[#fff] text-[0.875rem] font-['light']">Complete</div>
            </button>
        </div>

    </div>
</template>
<script setup>
import BaseSelect from "@/components/BaseSelect.vue";
import { reactive, ref ,defineEmits,inject} from "vue";
const { VideoStore } = inject('store')
const emit= defineEmits(['handlerPreviousStep','handlerComplete'])
const deviceTypes = ["IPC", "NVR", "DVR", "Doorbell", "Other"];
const brands = ["Hikvision", "Dahua", "Axis", "Reolink", "Other"];

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

const submitSuccess = ref(false);

const rules = {
    deviceType: (v) => (!!v ? "" : "Please select a device type"),
    brand: (v) => (!!v ? "" : "Please select a brand"),
    deviceName: (v) => (v ? "" : "Please enter a device name"),
    siteName: (v) => (v ? "" : "Please enter a site name"),
    groupName: (v) => (v ? "" : "Please enter a group name"),
    streamAddress: (v) => {
        if (!v) return "Please enter a stream address";
        const ok = /^rtsp:\/\/.+/i.test(v);
        return ok ? "" : "Stream address must start with rtsp://";
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

function handleSubmit() {
    handlerComplete()
    submitSuccess.value = false;
    if (!validateAll()) return;

    // 调用API
    console.log("submit payload:", { ...form });

    submitSuccess.value = true;
}

function resetForm() {
    Object.keys(form).forEach((k) => (form[k] = ""));
    Object.keys(errors).forEach((k) => (errors[k] = ""));
    submitSuccess.value = false;
}
const handlerPreviousStep = () => {
  emit("handlerPreviousStep");
}
const handlerComplete = () => {
    VideoStore.methods.setAddDeviceShow(false)
}
</script>
<style lang="scss" scoped>
.ipt[type='checkbox'] {
    outline: none;
    box-shadow: none;
}
</style>