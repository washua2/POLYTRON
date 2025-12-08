<template>
  <div>
    <div class="my-[1.25rem] justify-center text-[#09090B] text-[0.875rem] font-['medium']">
      Device Information Filling
    </div>

    <div class="h-[22rem]  fhd:h-[25.375rem] qhd:h-[25.375rem] uhd:h-[25.375rem] overflow-y-auto overflow-hidden scroll">
      <div class="w-[46.125rem] h-[22.75rem] ">
        <form class="w-[44.5rem]" id="deviceForm" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[0.875rem] gap-y-[1rem]">
            <!-- Device Type -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Device Type <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <BaseSelect
                  v-model="form.deviceType"
                  :options="deviceTypes.map(t => ({ label: t, value: t }))"
                  placeholder="Please Select Device Type"
                  :error="errors.deviceType"
                  @blur="validateField('deviceType')"
                />
              </div>
              <p v-if="errors.deviceType" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.deviceType }}
              </p>
            </div>

            <!-- Brand -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Brand <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <BaseSelect
                  v-model="form.brand"
                  :options="brands.map(t => ({ label: t, value: t }))"
                  placeholder="Please select the brand"
                  :error="errors.brand"
                  @blur="validateField('brand')"
                />
              </div>
              <p v-if="errors.brand" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.brand }}
              </p>
            </div>

            <!-- Device Name -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Device Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="form.deviceName"
                @input="validateField('deviceName')"
                @blur="validateField('deviceName')"
                type="text"
                placeholder="Example: Front Door Surveillance"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                :class="inputClass('deviceName')"
              />
              <p v-if="errors.deviceName" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.deviceName }}
              </p>
            </div>

            <!-- Site Name -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Site Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="form.siteName"
                @input="validateField('siteName')"
                @blur="validateField('siteName')"
                type="text"
                placeholder="Enter Site"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                :class="inputClass('siteName')"
              />
              <p v-if="errors.siteName" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.siteName }}
              </p>
            </div>

            <!-- Group Name -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Group Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="form.groupName"
                @input="validateField('groupName')"
                @blur="validateField('groupName')"
                type="text"
                placeholder="Enter Group"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                :class="inputClass('groupName')"
              />
              <p v-if="errors.groupName" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.groupName }}
              </p>
            </div>

            <!-- Stream Address -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Stream Address <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="form.streamAddress"
                @input="validateField('streamAddress')"
                @blur="validateField('streamAddress')"
                type="text"
                placeholder="rtsp://example.com/stream"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                :class="inputClass('streamAddress')"
              />
              <p v-if="errors.streamAddress" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.streamAddress }}
              </p>
            </div>

            <!-- IP Address -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                IP Address <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="form.ipAddress"
                @input="validateField('ipAddress')"
                @blur="validateField('ipAddress')"
                type="text"
                placeholder="192.168.1.100"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                :class="inputClass('ipAddress')"
              />
              <p v-if="errors.ipAddress" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.ipAddress }}
              </p>
            </div>

            <!-- Port -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
                Port <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="form.port"
                @input="validateField('port')"
                @blur="validateField('port')"
                type="text"
                placeholder="554"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition"
                :class="inputClass('port')"
              />
              <p v-if="errors.port" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                {{ errors.port }}
              </p>
            </div>

            <!-- Username -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">Username</label>
              <input
                v-model.trim="form.username"
                type="text"
                placeholder="Device Login Username"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition border-gray-200"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">Password</label>
              <input
                v-model.trim="form.password"
                type="password"
                placeholder="Device Login Password"
                class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                       text-[0.875rem] border px-4 py-[0.5rem] outline-none transition border-gray-200"
              />
            </div>
          </div>

          <!-- Recording Rule Settings（补全） -->
          <div class="mt-[1.5rem]">
            <div class="text-[#09090B] text-[0.875rem] font-['medium']">Recording Rule Settings</div>

            <!-- 总开关 -->
            <label class="flex items-center gap-[0.5rem] mt-[0.875rem] cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="form.isAuto"
                class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA]
                       ipt outline-none cursor-pointer accent-[#1C64F2]"
              />
              <div class="flex items-center h-[1rem]">
                <span class="text-[#09090B] text-[0.75rem] font-['light']">Auto-enable Recording</span>
                <span class="text-[#717784] text-[0.75rem] font-['light']">
                  &nbsp;(Continuous Recording)
                </span>
              </div>
            </label>

            <!-- 子选项（radio） -->
            <div class="mt-[0.75rem] ml-[1.5rem] space-y-[0.5rem]">
              <label class="flex items-center gap-[0.5rem] cursor-pointer select-none">
                <input
                  type="radio"
                  value="24_7"
                  v-model="form.recordMode"
                  :disabled="!form.isAuto"
                  class="w-[1rem] h-[1rem] rounded-full border border-[#E1E4EA]
                         cursor-pointer accent-[#1C64F2]"
                />
                <span
                  class="text-[0.75rem] font-['light']"
                  :class="form.isAuto ? 'text-[#09090B]' : 'text-[#A1A1AA]'"
                >
                  24/7 Continuous Recording
                </span>
              </label>

              <label class="flex items-center gap-[0.5rem] cursor-pointer select-none">
                <input
                  type="radio"
                  value="custom"
                  v-model="form.recordMode"
                  :disabled="!form.isAuto"
                  class="w-[1rem] h-[1rem] rounded-full border border-[#E1E4EA]
                         cursor-pointer accent-[#1C64F2]"
                />
                <span
                  class="text-[0.75rem] font-['light']"
                  :class="form.isAuto ? 'text-[#09090B]' : 'text-[#A1A1AA]'"
                >
                  Custom Recording Time Period
                </span>
              </label>
            </div>

            <!-- Custom 模式配置 -->
            <div
              v-show="form.isAuto && form.recordMode === 'custom'"
              class="mt-[0.875rem] pt-[0.875rem] border-t border-[#EAECEF]"
            >
              <div class="flex items-center gap-x-[1rem] gap-y-[0.75rem]">
                <div>
                  <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.25rem]">
                    Start Time
                  </div>
                  <CustomTimeSecondPicker v-model="form.customStart" />
                </div>

                <div>
                  <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.25rem]">
                    End Time
                  </div>
                  <CustomTimeSecondPicker v-model="form.customEnd" />
                </div>
              </div>

              <!-- Repeat -->
              <div class="mt-[0.875rem]">
                <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.5rem]">
                  Repeat
                </div>
                <div class="flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem]">
                  <label
                    v-for="d in weekDays"
                    :key="d.value"
                    class="flex items-center gap-[0.5rem] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      :value="d.value"
                      v-model="form.repeatDays"
                      class="w-[0.875rem] h-[0.875rem] rounded-[0.125rem]
                             border border-[#E1E4EA] accent-[#1C64F2]"
                    />
                    <span class="text-[#09090B] text-[0.75rem] font-['light']">
                      {{ d.label }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Storage Policy -->
            <div class="mt-[1.25rem] w-[21.5rem] pb-[2rem]">
              <div class="text-[#717784] text-[0.75rem] font-['light'] mb-[0.25rem]">
                Storage Policy
              </div>
              <BaseSelect
                v-model="form.storagePolicy"
                :options="storagePolicies"
                placeholder="Select storage policy"
                class="h-[2.3125rem]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Actions -->
    <div
      class="w-full py-[1.25rem] pr-[1.25rem] flex items-center gap-[1rem] justify-end absolute bottom-0 right-0"
      style="box-shadow: 0 -0.0625rem 0.625rem 0 rgba(0, 0, 0, 0.15);"
    >
      <button
        class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem]
               border-[0.0625rem] border-[#E1E4EA] overflow-hidden hover:bg-[#f0f1f5]"
        @click="handlerPreviousStep"
      >
        <div class="justify-center text-[#09090B] text-[0.875rem] font-['light']">
          Previous Step
        </div>
      </button>

      <button
        type="submit"
        form="deviceForm"
        class="w-[9.375rem] h-[2.5rem] py-[0.5rem] px-[0.75rem] rounded-[0.5rem]
               border-[0.0625rem] border-[#1C64F2] bg-[#1C64F2] overflow-hidden hover:bg-[#417cf3]"
      >
        <div class="justify-center text-[#fff] text-[0.875rem] font-['light']">
          Complete
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import BaseSelect from "@/components/BaseSelect.vue";
import CustomTimeSecondPicker from "@/components/CustomTimeSecondPicker.vue";
import { reactive, ref, defineEmits, inject } from "vue";

const { VideoStore } = inject("store");
const emit = defineEmits(["handlerPreviousStep", "handlerComplete"]);

const deviceTypes = ["IPC", "NVR", "DVR", "Doorbell", "Other"];
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

  // Recording Rule Settings
  isAuto: false,
  recordMode: "24_7",        // "24_7" | "custom"
  customStart: "00:00:00",
  customEnd: "00:00:00",
  repeatDays: [],
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
  submitSuccess.value = false;
  if (!validateAll()) return;

  const payload = {
    ...form,
    recording: form.isAuto
      ? {
          mode: form.recordMode,
          start: form.recordMode === "custom" ? form.customStart : null,
          end: form.recordMode === "custom" ? form.customEnd : null,
          repeat: form.recordMode === "custom" ? form.repeatDays : [],
        }
      : { mode: null, start: null, end: null, repeat: [] },
  };

  console.log("submit payload:", payload);

  // 关闭弹窗 or 进入下一步
  handlerComplete();
  submitSuccess.value = true;
}

const handlerPreviousStep = () => {
  emit("handlerPreviousStep");
};

const handlerComplete = () => {
  emit("handlerComplete", { ...form });
  VideoStore.methods.setAddDeviceShow(false);
};
</script>

<style lang="scss" scoped>
.ipt[type="checkbox"] {
  outline: none;
  box-shadow: none;
}
</style>
