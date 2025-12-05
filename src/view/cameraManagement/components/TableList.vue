<template>
    <div class="w-full">
        <!-- Header -->
        <div class="flex items-center justify-between px-[1.25rem] mb-[1.25rem]">
            <div class="text-[#09090B] text-[1rem] font-['light']">
                All Cameras
            </div>

            <div class="flex items-center gap-[1.25rem]">
                <div class="w-[6rem] h-[2.5rem] rounded-[0.5rem] border-[0.0625rem] boder-[#1C64F2] bg-[#1C64F2] flex items-center justify-center cursor-pointer" v-show="selectedIds.length">
                    <div class="justify-start text-white text-[0.875rem] font-['light']">Delete</div>
                </div>
                <BaseSelect v-model="filters.site" :options="siteOptions" placeholder="All Sites"
                    class="w-[8.625rem] h-[2.5rem]" />
                <BaseSelect v-model="filters.group" :options="groupOptions" placeholder="All Groups" class="w-[8rem] h-[2.5rem]" />
                <BaseSelect v-model="filters.status" :options="statusOptions" placeholder="All Statuses"
                    class="w-[8.625rem] h-[2.5rem]" />
            </div>
        </div>
        <!-- Table Container -->
        <div class="px-[1.25rem]">
            <div class="w-full rounded-[0.5rem] border border-[#F0F1F4] bg-white shadow-sm overflow-hidden">
                <!-- Table Header Row -->
                <div class="grid items-center px-[1rem] py-[0.625rem] bg-[#F7F8FA] text-[#717784] text-[0.875rem] font-['light']"
                    :style="gridStyle">
                    <div class="flex items-center gap-2">
                        <input type="checkbox"
                            class="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[#E1E4EA] ipt outline-none cursor-pointer"
                            :checked="isAllSelected" :indeterminate.prop="isIndeterminate" @change="toggleSelectAll" />
                    </div>
                    <div>Device Name</div>
                    <div>Brand &amp; Model</div>
                    <div>Site Name</div>
                    <div>Group Name</div>
                    <div>IP Address</div>
                    <div>Recording Status</div>
                    <div>Device Status</div>
                    <div class="flex items-center gap-[0.25rem]">
                        Add Time
                        <div class="flex flex-col gap-[0] mt-[-0.125rem]">
                            <SvgIcon width="0.75rem" height="0.375rem" color="#24292E" icon="top" class="cursor-pointer" />
                            <SvgIcon width="0.75rem" height="0.375rem" color="#818898" icon="bottom" class="cursor-pointer"/>
                        </div>
                    </div>
                    <div class="text-center">More</div>
                </div>

                <!-- Table Body -->
                <div
                    class="min-h-[32rem] ipad:min-h-[56.25rem] fhd:min-h-[42.5rem] qhd:min-h-[42.5rem] uhd:min-h-[42.5rem] overflow-y-auto overflow-x-hidden scroll">
                    <div v-for="row in filteredList" :key="row.id" class="grid items-center px-[1rem] py-[0.75rem] text-[0.875rem] text-[#09090B]
                 border-t border-[#F0F1F5] hover:bg-[#FAFBFC] transition" :style="gridStyle">
                        <!-- checkbox -->
                        <div>
                            <input type="checkbox"
                                class="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[#E1E4EA] ipt outline-none cursor-pointer"
                                v-model="selectedIds" :value="row.id" />
                        </div>

                        <!-- device name + thumb -->
                        <div class="flex items-center gap-[0.625rem] min-w-0">
                            <img :src="row.thumb"
                                class="w-[2.25rem] h-[2.25rem] rounded-[0.375rem] object-cover border border-[#EAECEF]"
                                alt="" />
                            <div class="min-w-0">
                                <div class="truncate text-[#09090B] text-[0.875rem] font-['light']">
                                    {{ row.deviceName }}
                                </div>
                                <div class="text-[#717784] text-[0.6875rem] font-['light']">
                                    {{ row.deviceType }}
                                </div>
                            </div>
                        </div>

                        <!-- brand model -->
                        <div class="text-[0.875rem] font-['light'] text-[#09090B] truncate">
                            {{ row.brandModel }}
                        </div>

                        <!-- site -->
                        <div class="text-[0.875rem] font-['light'] truncate">
                            {{ row.siteName }}
                        </div>

                        <!-- group -->
                        <div class="text-[0.875rem] font-['light'] truncate">
                            {{ row.groupName }}
                        </div>

                        <!-- ip -->
                        <div class="text-[0.875rem] font-['light']">
                            {{ row.ipAddress }}
                        </div>

                        <!-- recording status -->
                        <div class="flex items-center gap-2 text-[0.875rem] font-['light']">
                            <span class="inline-block w-[0.625rem] h-[0.625rem] rounded-full"
                                :class="recordDotClass(row.recordingStatus)"></span>
                            <span :class="recordTextClass(row.recordingStatus)">
                                {{ row.recordingStatus }}
                            </span>
                        </div>
                        <!-- device status -->
                        <div class="flex items-center gap-2 text-[0.875rem] font-['light']">
                            <span class="inline-flex items-center justify-center w-[1.125rem] h-[1.125rem] rounded-full"
                                >
                                <SvgIcon  width="1.125rem" height="1.125rem"
                                    :icon="row.deviceStatus === 'Online' ? 'device-tick' : 'device-exclaim'" color="#fff" />
                            </span>
                            <span :class="deviceTextClass(row.deviceStatus)">
                                {{ row.deviceStatus }}
                            </span>
                        </div>

                        <!-- add time -->
                        <div class="text-[0.875rem] text-[#09090B] font-['light'] whitespace-nowrap">
                            {{ row.addTime }}
                        </div>

                        <!-- more -->
                        <div :id="'more'+row.id" class="flex items-center justify-center text-[0.875rem] text-[#717784] cursor-pointer select-none relative" @click="handleMore(row)">
                           <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16" fill="none">
                            <path d="M8.66732 7.99967C8.66732 8.36786 8.36884 8.66634 8.00065 8.66634C7.63246 8.66634 7.33398 8.36786 7.33398 7.99967C7.33398 7.63148 7.63246 7.33301 8.00065 7.33301C8.36884 7.33301 8.66732 7.63148 8.66732 7.99967Z" stroke="#818898" stroke-width="1.33333"/>
                            <path d="M4.66732 7.99967C4.66732 8.36786 4.36884 8.66634 4.00065 8.66634C3.63246 8.66634 3.33398 8.36786 3.33398 7.99967C3.33398 7.63148 3.63246 7.33301 4.00065 7.33301C4.36884 7.33301 4.66732 7.63148 4.66732 7.99967Z" stroke="#818898" stroke-width="1.33333"/>
                            <path d="M12.6673 7.99967C12.6673 8.36786 12.3688 8.66634 12.0007 8.66634C11.6325 8.66634 11.334 8.36786 11.334 7.99967C11.334 7.63148 11.6325 7.33301 12.0007 7.33301C12.3688 7.33301 12.6673 7.63148 12.6673 7.99967Z" stroke="#818898" stroke-width="1.33333"/>
                            </svg>
                            
                            <div  class="flex flex-col justify-center items-center  absolute top-[1.875rem] left-0 w-[6.375rem] h-[4.3125rem] z-[10]
                            rounded-[0.375rem] boder-[0.0625rem] border-[#E1E4EA] bg-white" style="box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.09);" v-show="row.isMore">
                                <div class="w-full h-[2rem] flex items-center justify-center text-[#09090B] text-[0.75rem] font-['light'] capitalize hover:bg-[#f7f8fa]" @click="handlerEdit(row)">Edit</div>
                                <div class="w-full h-[2rem] flex items-center justify-center text-[#09090B] text-[0.75rem] font-['light'] capitalize hover:bg-[#f7f8fa]" @click="handlerDelete(row)">Delete</div>
                            </div>
                        </div>
                    </div>

                    <!-- empty -->
                    <div v-if="!filteredList.length"
                        class="py-[2rem] text-center text-[#717784] text-[0.875rem] font-['light']">
                        No cameras
                    </div>
                </div>
            </div>
        </div>
        <!-- page -->
        <div
            class="w-[115rem] h-[4rem] px-[1.25rem] border-t-[0.0625rem] border-[#E1E4EA] bg-white z-[10] flex items-center justify-between fixed bottom-0 bg-white">
            <div>
                <div class="justify-start"><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']">Showing</span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> </span><span
                        class="text-black text-[1rem] font-normal font-['Roboto'] uppercase"> 1-10 </span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> </span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> of </span><span
                        class="text-[#52525B] text-[0.875rem] font-normal font-['Roboto']"> </span><span
                        class="text-black text-[1rem] font-normal font-['Roboto'] uppercase"> 1000</span></div>
            </div>
            <Page :totalPages="totalPages" @currentToPage="currentToPage" v-model="currentPage" />
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref ,onMounted,defineEmits,onBeforeUnmount} from "vue";
import BaseSelect from "./BaseSelect.vue";
const emit= defineEmits(['handlerEdit','handlerDelete'])
//
const gridStyle = `
  grid-template-columns:
    2.25rem     /* checkbox */
    18.75rem    /* Device Name */
    8.5rem      /* Brand & Model */
    12.25rem    /* Site Name */
    13.0625rem  /* Group Name */
    12.625rem   /* IP Address */
    14.375rem   /* Recording Status */
    10.5625rem  /* Device Status */
    11.875rem   /* Add Time */
    6.4375rem;  /* More */
`;
const currentMoreId = ref(null);

// ===== Mock data=====
const cameraList = ref([
    {
        id: "c1",
        deviceName: "Front Door Surveillance",
        deviceType: "360 Camera",
        brandModel: "POLYTRON",
        siteName: "Circuit Road",
        groupName: "Office Area",
        ipAddress: "192.168.1.101",
        recordingStatus: "Recording", // Recording / Scheduled Recording / Not Recording
        deviceStatus: "Online", // Online / Offline
        addTime: "3:28 PM | 26.6.2024",
        thumb: "https://picsum.photos/80/80?1",
        isMore: false,
    },
    {
        id: "c2",
        deviceName: "Parking Lot Surveillance",
        deviceType: "PTZ",
        brandModel: "Hikvision",
        siteName: "Circuit Road",
        groupName: "Office Area",
        ipAddress: "192.168.1.102",
        recordingStatus: "Scheduled Recording",
        deviceStatus: "Online",
        addTime: "3:28 PM | 26.6.2024",
        thumb: "https://picsum.photos/80/80?2",
        isMore: false,
    },
    {
        id: "c3",
        deviceName: "Back Door Surveillance",
        deviceType: "360 Camera",
        brandModel: "Dahua",
        siteName: "Circuit Road",
        groupName: "Office Area",
        ipAddress: "192.168.1.103",
        recordingStatus: "Not Recording",
        deviceStatus: "Online",
        addTime: "3:28 PM | 26.6.2024",
        thumb: "https://picsum.photos/80/80?3",
        isMore: false,
    },
    {
        id: "c4",
        deviceName: "Elevator Surveillance",
        deviceType: "PTZ",
        brandModel: "Xiaomi",
        siteName: "Circuit Road",
        groupName: "Office Area",
        ipAddress: "192.168.1.104",
        recordingStatus: "Recording",
        deviceStatus: "Offline",
        addTime: "3:28 PM | 26.6.2024",
        thumb: "https://picsum.photos/80/80?4",
        isMore: false,
    },
    
]);
const totalPages=ref(100)
const currentPage=ref(1)
// ===== Filters =====
const filters = reactive({
    site: "",
    group: "",
    status: "",
});

const siteOptions = computed(() => {
    const sites = Array.from(new Set(cameraList.value.map(i => i.siteName)));
    return [{ label: "All Sites", value: "" }, ...sites.map(s => ({ label: s, value: s }))];
});

const groupOptions = computed(() => {
    const groups = Array.from(new Set(cameraList.value.map(i => i.groupName)));
    return [{ label: "All Groups", value: "" }, ...groups.map(g => ({ label: g, value: g }))];
});

const statusOptions = [
    { label: "All Statuses", value: "" },
    { label: "Recording", value: "Recording" },
    { label: "Scheduled Recording", value: "Scheduled Recording" },
    { label: "Not Recording", value: "Not Recording" },
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
];

// 过滤后的列表
const filteredList = computed(() => {
    return cameraList.value.filter(row => {
        const siteOk = !filters.site || row.siteName === filters.site;
        const groupOk = !filters.group || row.groupName === filters.group;

        // status 可以过滤 recordingStatus 或 deviceStatus
        const statusOk =
            !filters.status ||
            row.recordingStatus === filters.status ||
            row.deviceStatus === filters.status;

        return siteOk && groupOk && statusOk;
    });
});

// ===== Selection =====
const selectedIds = ref([]);

const isAllSelected = computed(() => {
    if (!filteredList.value.length) return false;
    return filteredList.value.every(r => selectedIds.value.includes(r.id));
});

const isIndeterminate = computed(() => {
    const sel = selectedIds.value.filter(id => filteredList.value.some(r => r.id === id));
    return sel.length > 0 && sel.length < filteredList.value.length;
});

function toggleSelectAll(e) {
    if (e.target.checked) {
        const ids = filteredList.value.map(r => r.id);
        selectedIds.value = Array.from(new Set([...selectedIds.value, ...ids]));
    } else {
        const ids = new Set(filteredList.value.map(r => r.id));
        selectedIds.value = selectedIds.value.filter(id => !ids.has(id));
    }
}

// ===== Status styles =====
function recordDotClass(status) {
    switch (status) {
        case "Recording": return "bg-[#22C55E]";
        case "Scheduled Recording": return "bg-[#F59E0B]";
        case "Not Recording": return "bg-[#6B7280]";
        default: return "bg-[#6B7280]";
    }
}

function recordTextClass(status) {
    switch (status) {
        case "Recording": return "text-[#22C55E]";
        case "Scheduled Recording": return "text-[#F59E0B]";
        case "Not Recording": return "text-[#6B7280]";
        default: return "text-[#6B7280]";
    }
}

function deviceTextClass(status) {
    return status === "Online" ? "text-[#22C55E]" : "text-[#EF4444]";
}
const handleMore = (row) => {
  cameraList.value.forEach((item) => {
    if (item.id === row.id) {
      item.isMore = !item.isMore;
      currentMoreId.value = item.isMore ? item.id : null;
    } else {
      item.isMore = false;
    }
  });
};
const handlerDelete = (row) => {
    emit('handlerDelete', row.id)
}
const handlerEdit = (row) => {
    emit('handlerEdit', row.id)
}
const onDocClick = (event) => {
  if (!currentMoreId.value) return;

  const dropdownMore = document.getElementById("more" + currentMoreId.value);
  if (!dropdownMore) return;

  // 点到 dropdown 外面
  if (!dropdownMore.contains(event.target)) {
    cameraList.value.forEach((item) => (item.isMore = false));
    currentMoreId.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
});

</script>

<style lang="scss" scoped>
.ipt[type='checkbox'] {
    outline: none;
    box-shadow: none;
}

/* 你项目里之前有 scroll 类的话就继续用 */
.scroll::-webkit-scrollbar {
    width: 6px;
}

.scroll::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 999px;
}

.scroll::-webkit-scrollbar-track {
    background: transparent;
}
</style>
