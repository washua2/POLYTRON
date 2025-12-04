<template>
    <div>
        <AllSitesNode
            v-for="item in data"
            :key="item.id"
            :node="item"
            :level="0"
            :indent="16"
            :selectedId="selectedId"           
            @node-click="handleNodeClick"
        />
    </div>
</template>

<script setup>
import { ref ,defineEmits} from "vue";
const emit= defineEmits(['handleNodeClick']);
import AllSitesNode from "./AllSitesNode.vue";

const props = defineProps({
    data: { type: Array, required: true }
});

// ⭐ 全局只有一个 selectedId
const selectedId = ref(null);

// 点击任意一个节点
const handleNodeClick = (node) => {
    selectedId.value = node.id;     // 切换选中节点
    emit('handleNodeClick',node);
  
};
</script>
