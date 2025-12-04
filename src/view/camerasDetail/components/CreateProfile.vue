<template>
  <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
  <div
    class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.70)] flex items-center justify-center z-[999999] overflow-hidden"
  >
    <div
      class="w-[32.8125rem] h-[41.75rem] rounded-[0.5rem] bg-white px-[1.25rem]"
      style="box-shadow: 0 0.625rem 1.625rem 0 rgba(0, 7, 22, 0.25)"
    >
      <!-- header -->
      <div class="flex items-center justify-between pt-[1.25rem]">
        <div class="text-[#09090B] text-[1.375rem] font-['medium']">
          Create Profile
        </div>
        <SvgIcon width="1.5rem" height="1.5rem" color="#52525B" icon="search-close" class="cursor-pointer" @click="handlerClose" />
      </div>

      <!-- avatar -->
      <div
        class="w-[16.0625rem] h-[16.0625rem] mx-auto mt-[1.875rem] rounded-[0.625rem] bg-[#F4F5F6] overflow-hidden"
      >
        <img src="@/assets/images/test1.png" class="w-full h-full object-cover" />
      </div>

      <!-- form -->
      <div class="mt-[1.75rem]">
        <!-- name -->
        <div class="text-[#717784] text-[0.875rem] font-normal font-['Roboto'] mb-[0.625rem]">
          Profile name
        </div>
        <div class="w-full h-[3.375rem] border border-[#CCCFD4] rounded-[0.375rem] mb-[1rem] pr-[0.75rem] flex items-center">
        <input
          type="text"
          class="outline-none w-[27.0625rem]
                 text-[0.9375rem] text-[#09090B] " style="box-shadow: none;border:none;"
          placeholder="Enter profile name"
          v-model="form.name"
        />
</div>
        <!-- person of interest -->
        <label class="flex items-center gap-[0.5rem] mb-[1.625rem] mt-[1.75rem] cursor-pointer select-none">
          <input type="checkbox" v-model="form.isPerson" class="w-[1rem] h-[1rem] rounded-[0.25rem] border-[0.0625rem] border-[#E1E4EA] ipt outline-none cursor-pointer"
            />
          <span class="text-[#09090B] text-[0.875rem] font-['Roboto']">Mark as person of interest</span>
        </label>

        <!-- tags -->
        <div class="mb-[2rem]">
          <!-- add tag -->
          <div class="w-[6.5rem] h-[2.875rem] rounded-[1.625rem] border-[0.0625rem] border-[#E1E4EA] bg-white 
          text-[#09090B] font-['light'] text-[0.875rem] flex items-center justify-center gap-[0.375rem] cursor-pointer" @click="addTag">
            <span class="text-[1rem] font-['light']">+</span> Add Tags
          </div>

          <div class="flex gap-[0.5rem] flex-wrap mb-[0.75rem]">
            <!-- existing tags -->
            <div
              v-for="(tag, index) in form.tags"
              :key="index"
              class="px-[0.75rem] h-[2rem] bg-[#F4F5F6] rounded-full flex items-center gap-[0.5rem] cursor-default"
            >
              <span class="text-[0.75rem] text-[#09090B]">{{ tag }}</span>
              <SvgIcon
                icon="search-close"
                width="0.75rem"
                height="0.75rem"
                color="#52525B"
                class="cursor-pointer"
                @click="removeTag(index)"
              />
            </div>
          </div>
        </div>
        <!-- footer buttons -->
        <div class="flex justify-end gap-[1rem] ">
          <button
            class="w-[6.3125rem] h-[2.5rem] border border-[#CCCFD4] rounded-[0.375rem]
                   text-[#09090B] text-[0.875rem]"
            @click="close"
          >
            Cancel
          </button>
          <button
            class="w-[6.25rem] h-[2.75rem] bg-[#1C64F2] rounded-[0.375rem] text-white text-[0.875rem]"
            @click="createProfile"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref ,inject} from "vue";
const { VideoStore } = inject('store')
const imgUrl = "@/assets/images/test1.png"; // 你的头像

// 表单数据
const form = ref({
  name: "",
  isPerson: false,
  tags: []
});

// 添加 tag
const addTag = () => {
  const value = prompt("Enter tag:");
  if (value && value.trim()) {
    form.value.tags.push(value.trim());
  }
};

// 删除 tag
const removeTag = (index) => {
  form.value.tags.splice(index, 1);
};

// 创建
const createProfile = () => {
  if (!form.value.name) {
    console.log("Please enter profile name.");
    return;
  }
  console.log("提交数据:", form.value);
  handlerClose();
};

// 关闭
const handlerClose = () => {
  console.log("关闭弹窗");
  VideoStore.methods.setCreateProfile(false);
};
</script>
<style lang="scss" scoped>
.ipt[type='checkbox'] {
  outline: none;
  box-shadow: none;
}
</style>
