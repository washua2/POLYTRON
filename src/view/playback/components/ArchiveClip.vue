<template>
    <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
  <div class="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center">
    <div class="w-[28.875rem] rounded-[1rem] bg-white overflow-hidden shadow-lg">

      <!-- header -->
      <div class="flex items-center justify-between px-[1.5rem] py-[1.25rem]">
        <div class="text-[#09090B] text-[1rem] font-['medium']">Archive Clip</div>
        <button
          class="text-[#717784] hover:text-[#09090B] transition text-[1.25rem] leading-none"
          @click="handlerClose"
        >✕</button>
      </div>

      <!-- body -->
      <div class="px-[1.5rem] pb-[1.25rem]">
        <!-- time range -->
        <div class="flex items-center justify-between gap-[1rem]">
          <!-- start -->
          <div class="flex-1 border border-[#EAECEF] rounded-[0.5rem] px-[1rem] py-[0.875rem] text-center">
            <div class="text-[#09090B] text-[1rem] font-['medium']">
              {{ startTime }}
            </div>
            <div class="text-[#717784] text-[0.75rem] font-['light'] mt-[0.25rem]">
              {{ startDate }}
            </div>
          </div>

          <!-- arrow -->
          <div class="text-[#717784] text-[1.25rem] select-none">→</div>

          <!-- end -->
          <div class="flex-1 border border-[#EAECEF] rounded-[0.5rem] px-[1rem] py-[0.875rem] text-center">
            <div class="text-[#09090B] text-[1rem] font-['medium']">
              {{ endTime }}
            </div>
            <div class="text-[#717784] text-[0.75rem] font-['light'] mt-[0.25rem]">
              {{ endDate }}
            </div>
          </div>
        </div>

        <!-- Note -->
        <div class="mt-[1.25rem]">
          <label class="block text-[0.75rem] font-['light'] text-[#717784] mb-[0.25rem]">
            Note
          </label>
          <textarea
            v-model.trim="form.note"
            rows="2"
            placeholder=""
            class="w-full h-[3rem] font-['light'] rounded-[0.5rem] border border-gray-200
                   px-4 py-2 text-[0.875rem] outline-none transition
                    resize-none"
          ></textarea>
        </div>

        <!-- person of interest -->
        <label class="flex items-center gap-[0.5rem] mt-[1rem] cursor-pointer select-none">
          <input
            type="checkbox"
            v-model="form.isPOI"
            class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA]
                   ipt outline-none cursor-pointer"
          />
          <span class="text-[#09090B] text-[0.75rem] font-['light']">
            Mark as person of interest
          </span>
        </label>

        <!-- tags -->
        <div class="mt-[1rem]">
          <!-- tags list -->
          <div v-if="form.tags.length" class="flex flex-wrap gap-[0.5rem] mb-[0.75rem]">
            <div
              v-for="(t, i) in form.tags"
              :key="t + i"
              class="flex items-center gap-1 px-2 py-1 rounded-full bg-[#F0F6FF] text-[#1C64F2]
                     text-[0.75rem] font-['light']"
            >
              <span>{{ t }}</span>
              <button class="text-[#1C64F2] hover:text-[#0f4ed8]" @click="removeTag(i)">×</button>
            </div>
          </div>

          <!-- add tags button -->
          <button
            type="button"
            class="inline-flex items-center gap-2 px-[0.875rem] h-[2.25rem]
                   rounded-full border border-[#E1E4EA] hover:bg-[#F7F8FA] transition
                   text-[#09090B] text-[0.75rem] font-['light']"
            @click="showTagInput = !showTagInput"
          >
            <span class="text-[1rem] leading-none">+</span>
            <span>Add Tags</span>
          </button>

          <!-- tag input -->
          <div v-show="showTagInput" class="mt-[0.5rem]">
            <input
              v-model.trim="tagInput"
              @keydown.enter.prevent="addTag"
              type="text"
              placeholder="Type tag and press Enter"
              class="w-full h-[2.3125rem] font-['light'] flex items-center rounded-[0.5rem]
                     text-[0.875rem] border px-4 py-[0.5rem] outline-none transition
                      border-gray-200"
            />
          </div>
        </div>
      </div>

      <!-- footer bar -->
      <div class="bg-[#F7F8FA] border-t border-[#EAECEF] px-[1.5rem] py-[1rem] flex items-center justify-between">
        <div class="text-[#717784] text-[0.8125rem] font-['light'] space-y-1">
          <div>Duration: {{ durationText }}</div>
          <div>Size: {{ sizeText }}</div>
        </div>

        <button
          class="w-[9.375rem] h-[2.5rem] rounded-[0.5rem]
                 bg-[#1C64F2] text-white text-[0.875rem] font-['light']
                 hover:bg-[#417cf3] transition"
          @click="handleCreate"
        >
          Create Archive
        </button>
      </div>

    </div>
  </div>
  </transition>
</template>

<script setup>
import { computed, reactive, ref ,defineEmits} from "vue";
const emit = defineEmits(['handlerClose'])
const showTagInput = ref(false);
const tagInput = ref("");

const form = reactive({
  note: "",
  isPOI: false,
  tags: [],
});

// ===== mocked time values  =====
const start = ref(new Date("2025-02-27T14:07:10"));
const end = ref(new Date("2025-02-27T14:08:10"));
const sizeBytes = ref(26.5 * 1024 * 1024);

const startTime = computed(() =>
  start.value.toTimeString().slice(0, 8)
);
const endTime = computed(() =>
  end.value.toTimeString().slice(0, 8)
);
const startDate = computed(() =>
  start.value.toDateString().replace(/^(\w+)/, "$1") // Thu Feb 27 2025
);
const endDate = computed(() =>
  end.value.toDateString().replace(/^(\w+)/, "$1")
);

// duration / size
const durationSec = computed(() => Math.max(0, (end.value - start.value) / 1000));
const durationText = computed(() => {
  const s = durationSec.value;
  if (s < 60) return `${Math.round(s)} sec`;
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return r ? `${m} min ${r} sec` : `${m} min`;
});
const sizeText = computed(() => `${(sizeBytes.value / (1024 * 1024)).toFixed(1)} MB`);

function addTag() {
  const v = tagInput.value.trim();
  if (!v) return;
  if (!form.tags.includes(v)) form.tags.push(v);
  tagInput.value = "";
}

function removeTag(i) {
  form.tags.splice(i, 1);
}

function handleCreate() {
  const payload = {
    start: start.value.toISOString(),
    end: end.value.toISOString(),
    durationSec: durationSec.value,
    sizeMB: Number((sizeBytes.value / (1024 * 1024)).toFixed(1)),
    note: form.note,
    isPOI: form.isPOI,
    tags: [...form.tags],
  };
  console.log("create archive payload:", payload);
  // 调用 create archive API
}

function handlerClose() {
  console.log("close modal");
  emit("handlerClose")
}
</script>

<style lang="scss" scoped>
.ipt[type='checkbox'] {
  outline: none;
  box-shadow: none;
}
</style>
