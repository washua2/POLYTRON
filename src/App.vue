<script setup>
import { provide } from 'vue';
import * as store from './store';


provide("store", store);

</script>

<template>

  <router-view></router-view>
</template>

<style>
html{
    min-width: 112.5rem;
    min-height: 56.25rem;
    overflow: auto;
    /* overflow: hidden; */
}
input{
    box-shadow: none !important;
}
.datepicker{
    z-index: 99999999 !important;
}
/* 背景图容器 */
.bg-cover-center {
  background-image: url("@/assets/images/login-bg.png"); /* 换成你的图 */
  background-size: cover;       /* 铺满容器，保持比例 */
  background-position: center;  /* 居中 */
  background-repeat: no-repeat; /* 不重复 */
  background-attachment: fixed; /* 可选：滚动时固定背景 */
}

/* 针对webkit内核浏览器的自定义样式 */
.scroll::-webkit-scrollbar {
    width: 0.375rem;
    height: 2.0625rem;
}

.scroll::-webkit-scrollbar-track {
    background: #E4E4E7;
    /* 滚动条轨道的颜色 */
}

.scroll::-webkit-scrollbar-thumb {
    background-color: #1C64F2;
    /* 滚动条的颜色 */
    border-radius: 0.625rem;
    /* 滚动条圆角 */
}

.scroll::-webkit-scrollbar-thumb:hover {
    background: #1C64F2;
    /* 滚动条hover颜色 */
    cursor: pointer;
}
.scroll {
  -webkit-overflow-scrolling: touch; /* iOS 顺滑惯性滚动 */
}

</style>
