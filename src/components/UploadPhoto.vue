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
        <div
            class="w-[48.5rem] max-h-[44rem] min-h-[24rem] rounded-[0.5rem] bg-white shadow-[0_10px_26px_0_rgba(0,7,22,0.25)] flex flex-col overflow-hidden">
            <!-- header -->
            <div class="px-[1.25rem] pt-[1.25rem] pb-[1rem] w-full flex items-center justify-between">
                <div class="h-[2.0625rem] justify-start text-[#09090B] text-[1.375rem] font-['medium']">
                    Search with a photo
                </div>
                <div class="w-[1.5rem] h-[1.5rem] flex items-center justify-center cursor-pointer" @click="handlerClose">
                    <SvgIcon width="0.75rem" height="0.75rem" color="#52525B" icon="video-close" />
                </div>
            </div>

            <!-- main：中间区域，跟内容一起长，上限 704px -->
            <div class="px-[1.25rem] mb-[1rem] flex-1 flex flex-col gap-4 overflow-hidden pb-[0.5rem]">
                <!-- 上传区域：固定 288px 高 -->
                <div class="w-full h-[18rem] rounded-[1rem] border-[0.125rem] border-dashed border-[#CCCFD4] bg-[#F4F5F6] flex flex-col items-center justify-center cursor-pointer"
                    @click="triggerFileDialog" @dragover.prevent @drop.prevent="handleDrop">
                    <SvgIcon width="2.75rem" height="2.875rem"  icon="upload" />
                    <div class="justify-start mt-[1rem] mb-[0.5rem]">
                        <span class="text-[#09090B] text-[1rem] font-medium font-['Roboto']">Drop photo here or
                        </span>
                        <span class="text-[#1C64F2] text-[1rem] font-medium font-['Roboto']">choose a photo</span>
                        <span class="text-[#09090B] text-[1rem] font-medium font-['Roboto']">
                            to upload</span>
                    </div>
                    <div class="justify-start text-[#52525B] text-[0.75rem] font-normal font-['Roboto'] tracking-tight">
                        (JPG or PNG up to 15MB)
                    </div>

                    <!-- 隐藏的文件选择 -->
                    <input ref="fileInputRef" type="file" class="hidden" multiple accept=".jpg,.jpeg,.png"
                        @change="handleFileChange" />
                </div>

                <!-- 上传列表 -->
                <div v-if="files.length" class="w-full flex-1 flex flex-col">
                    <div class="text-[0.75rem] text-[#52525B] mb-2 font-['Roboto']">
                        Uploaded Files
                    </div>

                    <!-- 列表：超过 2 条时加 max-h 出滚动条，至少两条高度 -->
                    <div class="flex-1 overflow-y-auto pr-1 min-h-[6rem] scroll"
                        :class="files.length > 2 ? 'max-h-[8.5rem]' : ''">
                        <div v-for="file in files" :key="file.id"
                            class="w-full mb-2 rounded-[0.5rem] border border-[#E4E5E7] bg-white px-3 py-2 flex items-center gap-3">
                            <!-- 预览缩略图 -->
                            <div
                                class="w-[3rem] h-[3rem] flex-shrink-0 rounded-[0.25rem] bg-[#F4F5F6] overflow-hidden flex items-center justify-center">
                                <img v-if="file.previewUrl" :src="file.previewUrl" class="w-full h-full object-cover"
                                    alt="preview" />
                                <SvgIcon v-else width="1.5rem" height="1.5rem" color="#99A0AE" icon="image" />
                            </div>

                            <!-- 文件信息 + 进度/失败 -->
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <div class="mb-1">
                                        <div class="truncate text-[0.875rem] text-[#09090B] font-['Roboto']">
                                            {{ file.name }}
                                        </div>
                                        <div class=" text-[0.75rem] text-[#717784] font-['Roboto']"
                                            v-if="file.status !== 'error'">
                                            {{ file.sizeText }}
                                        </div>
                                        <div v-else class="text-[0.75rem] text-[#DC2626] mt-1 font-['Roboto']">
                                            Upload failed
                                        </div>
                                    </div>
                                    <!-- 操作：重新上传 + 删除 -->
                                    <div class="w-[3.125rem] flex items-end gap-[0.9375rem]">
                                        <SvgIcon width="0.625rem" height="0.75rem" color="#CCCFD4" icon="deleted" class=" cursor-pointer"
                                            @click.stop="removeFile(file.id)" />
                                        <SvgIcon width="0.75rem" height="0.75rem" color="#CCCFD4" icon="refresh" class=" cursor-pointer"
                                            @click.stop="retryFile(file)" />
                                    </div>
                                </div>
                                <div v-if="file.status !== 'error'">
                                    <div class="h-[0.375rem] w-full rounded-full bg-[#E4E5E7] overflow-hidden">
                                        <div class="h-full bg-[#1C64F2] transition-all duration-300 ease-in-out"
                                            :style="{ width: file.progress + '%' }"></div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <!-- footer-->
            <div class="w-full pr-[1.25rem] pb-[1.375rem] flex items-center justify-end gap-[2.125rem]">
                <div class="cancel cursor-pointer" @click="handlerClose">Cancel</div>
                <div class="upload cursor-pointer" @click="handlerUpload">Upload</div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script setup>
import { ref, onBeforeUnmount ,inject} from "vue";
const { VideoStore } = inject('store')
const fileInputRef = ref(null);

// files: {id,name,sizeText,status,progress,previewUrl,raw}
const files = ref([]);

// 打开文件选择
const triggerFileDialog = () => {
    fileInputRef.value && fileInputRef.value.click();
};

// input 选择
const handleFileChange = (e) => {
    const list = Array.from(e.target.files || []);
    addFiles(list);
    e.target.value = "";
};

// 拖拽上传
const handleDrop = (e) => {
    const list = Array.from(e.dataTransfer.files || []);
    addFiles(list);
};

// 添加文件并创建预览
const addFiles = (fileList) => {
    fileList.forEach((file) => {
        const id = `${Date.now()}-${Math.random()}`;
        const sizeText = formatSize(file.size);
        const previewUrl = URL.createObjectURL(file);

        const item = {
            id,
            name: file.name,
            sizeText,
            status: "uploading", // uploading | success | error
            progress: 0,
            previewUrl,
            raw: file,
        };

        files.value.push(item);
        simulateUpload(item); // 这里先用模拟上传，后面可替换成真实接口
    });
};

const removeFile = (id) => {
    const idx = files.value.findIndex((f) => f.id === id);
    if (idx !== -1) {
        const file = files.value[idx];
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
        files.value.splice(idx, 1);
    }
};

// 重新上传（重新走一遍进度）
const retryFile = (file) => {
    file.status = "uploading";
    file.progress = 0;
    simulateUpload(file);
};

const formatSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
        const kb = bytes / 1024;
        return `${kb.toFixed(0)}KB`;
    }
    return `${mb.toFixed(0)}MB`;
};

// 模拟上传进度
const simulateUpload = (file) => {
    file.progress = 0;
    const timer = setInterval(() => {
        if (file.progress >= 100) {
            clearInterval(timer);
            if (Math.random() < 0.8) {
                file.status = "success";
            } else {
                file.status = "error";
            }
            return;
        }
        file.progress += 20;
    }, 300);
};
const handlerClose=()=>{
    VideoStore.methods.setUpload(false)
}
// 模拟接口上传成功
const handlerUpload=()=>{
    VideoStore.methods.setUpload(false)
    VideoStore.methods.setUploadImage(true)
}

// 组件卸载时释放预览 URL
onBeforeUnmount(() => {
    files.value.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
});
</script>

<style lang="scss" scoped>
.cancel {
    display: flex;
    width: 6.3125rem;
    padding: 0.625rem 1.875rem 0.625rem 1.75rem;
    justify-content: center;
    align-items: center;
    gap: 0;
    border-radius: 0.375rem;
    border: 0.0625rem solid #CCCFD4;
    color: #09090B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
}

.upload {
    display: flex;
    width: 6.3125rem;
    padding: 0.625rem 1.8125rem 0.625rem 1.75rem;
    justify-content: center;
    align-items: center;
    gap: 0;
    border-radius: 0.375rem;
    background: #1C64F2;
    color: #fff;
    font-family: Roboto;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
}
</style>
