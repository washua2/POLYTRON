<!-- Timer.vue -->
<template>
    <div class="inline-block">
        TTR:{{ formattedTime }}
    </div>
</template>
  
<script>
import { ref, watch, onBeforeUnmount } from 'vue';

export default {
    props: {
        initialTime: {
            type: Number,
            default: 900
        }
    },
    setup(props) {
        let timer = null;
        let nowtime = new Date(); //获取当前时间
        let endtime = new Date(props.initialTime); //定义结束时间
        let lefttime = ref(endtime.getTime() - nowtime.getTime()); //距离结束时间的毫秒数s
        console.log("-----------------1212>",lefttime,props.initialTime)
        // 更新倒计时的函数
        function updateCountdown() {
            const minutes = new Date(lefttime.value).getMinutes();
            const seconds = new Date(lefttime.value).getSeconds();
            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        // 每秒更新一次倒计时
        function startTimer() {
            timer = setInterval(() => {
                lefttime.value-=1000;
                if (lefttime.value === 0) {
                    clearInterval(timer);
                }
            }, 1000);
        }

        // 格式化倒计时时间
        const formattedTime = ref(updateCountdown());

        // 监听倒计时的变化
        watch(lefttime, () => {
            formattedTime.value = updateCountdown();
        });

        // 在组件销毁前清除计时器
        onBeforeUnmount(() => {
            clearInterval(timer);
        });

        // 启动倒计时
        startTimer();

        return {
            formattedTime
        };
    }
};
</script>
  
<style scoped>
/* 样式 */
</style>
  