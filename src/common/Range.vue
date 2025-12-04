<template>
<div class="range-wrap">
  <div class="range-bar">
    <div class="range-fill"></div>
  </div>
  <input id="rng" type="range" min="0" max="100" value="35">
</div>
</template>
<script setup>
import { onMounted } from "vue";




function syncFill(el){
  const min = Number(el.min || 0);
  const max = Number(el.max || 100);
  const val = Number(el.value);
  const pct = ((val - min) / (max - min)) * 100;
  fill.style.width = pct + '%';     // 只改“已滑动颜色”宽度；未滑动区域自然透明
}
onMounted(() => {
    const rng  = document.getElementById('rng');
const fill = document.querySelector('.range-fill');
    rng.addEventListener('input', () => syncFill(rng));
window.addEventListener('DOMContentLoaded', () => syncFill(rng));
})


</script>
<style>
.range-wrap{
  position: relative;
  width: 320px;
  height: 24px;             /* 容器高度只为放下拇指 */
}

/* 背景条（透明），里面的 .range-fill 才是已滑动颜色 */
.range-bar{
  position: absolute; inset: 0 0 0 0;
  display: flex; align-items: center;
  pointer-events: none;     /* 不挡住滑动操作 */
}
.range-bar::before{
  content:"";
  width: 100%; height: 8px;
  background: transparent;  /* 整条轨道背景透明 */
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); /* 可选：给轨道加细边 */
  position: absolute;
}
.range-fill{
  height: 8px; width: 0%;
  background: #0d6efd;      /* 已滑动颜色 */
  border-radius: 999px;
  position: relative; z-index: 1;
}

/* 让原生 range 的轨道透明，仅保留 thumb */
.range-wrap input[type="range"]{
  -webkit-appearance: none; appearance: none;
  position: relative; z-index: 2;
  width: 100%; height: 24px;
  background: transparent; outline: none; margin: 0;
}

/* WebKit 轨道透明 */
.range-wrap input[type="range"]::-webkit-slider-runnable-track{
  height: 8px; background: transparent; border: none;
}
/* WebKit 拇指（你可以按需改样式，也可以保持简单） */
.range-wrap input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance: none;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff; border: 2px solid #0d6efd;
  margin-top: -4px; cursor: pointer;
}

/* Firefox 轨道透明 */
.range-wrap input[type="range"]::-moz-range-track{ height: 8px; background: transparent; border: none; }
.range-wrap input[type="range"]::-moz-range-progress{ background: transparent; } /* 不用 FF 自带进度色 */

/* 适配 Windows High-Contrast 可再加 outline/对比度样式（可选） */
</style>