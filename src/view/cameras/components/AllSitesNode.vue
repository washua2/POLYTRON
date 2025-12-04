<template>
    <div>
        <!-- 当前行 -->
        <div 
            class="flex items-center py-[0.625rem] cursor-pointer select-none hover:bg-gray-100"
            :style="{ paddingLeft: level * indent + 'px' }"
            @click="handleClick"
        >
            <!-- 展开箭头 -->
            <span v-if="hasChildren" class="w-4 mr-1 text-xs">
                <SvgIcon 
                    width="1rem" 
                    height="0.375rem" 
                    color="#717784" 
                    icon="arrow-down-black"
                    class="transition-all duration-300 ease-in-out"
                    :class="expanded ? 'rotate-[0deg]' : 'rotate-[-90deg]'"
                />
            </span>
            <span v-else class="w-4 mr-1"></span>

            <!-- label -->
            <div
                :class="[
                    defaultLabelClass,
                    labelClass,
                    
                    // ⭐ 只有子节点(level >= 1)才允许高亮
                    (isChild && isSelected) ? activeClass : ''
                ]"
            >
                {{ node?.label || '' }}
            </div>
        </div>

        <!-- 子节点 -->
        <div v-if="hasChildren && expanded">
            <TreeNode
                v-for="child in node.children"
                :key="child.id"
                :node="child"
                :level="level + 1"
                :indent="indent"
                :labelClass="childLabelClass"
                :selectedId="selectedId"
                :activeClass="activeClass"
                @node-click="bubbleClick"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// props
const props = defineProps({
    node: { type: Object, required: true },
    level: { type: Number, default: 0 },
    indent: { type: Number, default: 16 },

    labelClass: { type: String, default: "text-[1.125rem] font-['medium'] leading-[160%] h-[1.6875rem]" },
    childLabelClass: { type: String, default: "text-[#52525B] font-['medium'] text-[0.875rem]" },

    selectedId: { type: [String, Number, null], default: null },
    activeClass: { type: String, default: "text-blue-600 font-['bold']" }
});

// emits
const emit = defineEmits(["node-click"]);

// 顶级节点的默认颜色
const defaultLabelClass = computed(() =>
    props.level === 0 ? "text-[#09090B]" : ""
);

// 展开状态
const expanded = ref(false);

// 是否有 children
const hasChildren = computed(() => {
    return Array.isArray(props.node?.children) && props.node.children.length > 0;
});

// ⭐ 是否是子节点 (level >= 1)
const isChild = computed(() => props.level >= 1);

// ⭐ 是否选中此节点
const isSelected = computed(() => props.selectedId === props.node.id);

// 点击
const handleClick = () => {
    emit("node-click", props.node);
    if (!hasChildren.value) return;
    expanded.value = !expanded.value;
};

// 透传事件
const bubbleClick = (node) => {
    emit("node-click", node);
};
</script>

<script>
export default {
    name: "TreeNode"
};
</script>
