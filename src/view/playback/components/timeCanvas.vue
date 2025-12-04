<template>
  <div class="relative">
    <canvas id="canvas1" width="1920" height="70" style="border-top: solid var(--grid) 1px"></canvas>
  </div>
</template>

<script setup>
import TimeLine from "./timeline.js";
import { onMounted, reactive, ref, nextTick, watch } from "vue";
// import settingStore from '@/store/modules/setting'
// const store = settingStore()

let TimeLineDom = ref(null)
// 7328983 视频长度
const timeParts = ref([
  {
    id: 0,
    start: 1719368643000,  // 2024-06-10 05:24:03
    end: 1719368643000 + 7328983,
    style: {
      background: "#1C64F2",
    },
  },{
    id: 1,
    start: 1719386643000,  // 2024-06-26 15:24:03
    end: 1719386643000 + 7328983,
    style: {
      background: "#1C64F2",
    },
  },
])
const rangeIndex = ref(null) // 第几个视频
const props = defineProps({
  TimeFrame: { // 时间区间
    type: Array,
    default: []
  },
  multipleSpeed: { // 倍速
    type: Number,
    default: 1
  },
  playerState: { // 播放状态
    type: Boolean,
    default: true
  },
  orderPlay: { // 播放行为  上/下一个视频 快进/退
    type: String,
  },
})
const currentTime = ref(null)
watch(() => props.TimeFrame, ()=>{
  let startDay = props.TimeFrame[0]
  let endDay = props.TimeFrame[1]
  // 开始时间时间戳
  // getZeroTimeTimestamp(startDay)
  // 相隔天数
  // daysBetweenDates(startDay, endDay)
  TimeLineDom.value.setTotalRulerHours(72, getZeroTimeTimestamp(startDay));
  console.log('getZeroTimeTimestamp(startDay)',getZeroTimeTimestamp(startDay))
  // TimeLineDom.value.setStartTime(getZeroTimeTimestamp(startDay));
})
watch(() => props.orderPlay, ()=>{
  if(props.orderPlay == 'next'){
    if(rangeIndex.value == timeParts.value.length - 1){
      TimeLineDom.value.setCurrentTime(timeParts.value[timeParts.value.length - 1].start)  
      return false
    }
    TimeLineDom.value.setCurrentTime(timeParts.value[rangeIndex.value + 1].start)
    rangeIndex.value += 1
  }else if(props.orderPlay == 'pre'){
    if(rangeIndex.value == 0){
      TimeLineDom.value.setCurrentTime(timeParts.value[0].start)  
      return false
    }
    TimeLineDom.value.setCurrentTime(timeParts.value[rangeIndex.value - 1].start)
    rangeIndex.value -= 1
  }
})
watch(() => props.multipleSpeed, ()=>{
  stopMove(props.multipleSpeed)
  beginMove(props.multipleSpeed)
})
watch(() => props.playerState, ()=>{
  if(props.playerState){
    beginMove(props.multipleSpeed)
  }else{
    stopMove(props.multipleSpeed)
  }
})
nextTick(() => {
  TimeLineDom.value = new TimeLine("canvas1",
    new Date().getTime(),
    timeParts.value,
    true,
    changeCallback,
    nextCallback
  );

  resizeCanvas()
})
// 快进15s
const fastForward = () => {
  TimeLineDom.value.setCurrentTime(currentTime.value + 15 * 1000)
  currentTime.value += 15 * 1000
}
// 快退15s
const fastBackward = () => {
  TimeLineDom.value.setCurrentTime(currentTime.value - 15 * 1000)
  currentTime.value -= 15 * 1000
}
function changeCallback(time) {
  currentTime.value = time.getTime()
  timeParts.value.forEach(ele => {
    // if(ele.end <= time.getTime()) return store.setPlayInfo({seconds: Math.floor(7210000 / 1000), index: ele.id})
    // if(ele.start >= time.getTime()) return store.setPlayInfo({seconds: 0, index: ele.id})
    if(ele.end < time.getTime()) return false
    if(ele.start > time.getTime()) return false
    // console.log('time.getTime()',time.getTime(), ele.id)
    let seconds = Math.floor((time.getTime() - ele.start) / 1000)
    // console.log('seconds',seconds)
    // store.setPlayInfo({seconds, index: ele.id + 1})
    
    rangeIndex.value = ele.id
  });
}
// 下一个视频
function nextCallback(time){
  console.log('time',time)
  timeParts.value.forEach(ele => {
    if(ele.end < time.getTime()) return false
    if(ele.start > time.getTime()) return false
    rangeIndex.value = ele.id
  });
}
function SkipEnd(){
  // changeCallback(new Date(timeParts.value[rangeIndex.value].end))
  TimeLineDom.value.setCurrentTime(timeParts.value[rangeIndex.value].end - 15 * 1000);
}

function stopMove(speed) {
  TimeLineDom.value.setIsMove(false, speed);
}

function beginMove(speed) {
  TimeLineDom.value.setIsMove(true, speed);
}

function setTimeParts() {
  TimeLineDom.value.addTimeParts(timeParts2);
}

function daysBetweenDates(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  startDate.setUTCHours(0, 0, 0, 0); // 设置为UTC时间的零点
  endDate.setUTCHours(0, 0, 0, 0);
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
}
function getZeroTimeTimestamp(dateStr) {
  const dateObj = new Date(dateStr);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj.getTime();
}


// 获取画布元素
const canvas = document.getElementById('canvas1');
function resizeCanvas() {
  const containerWidth = canvas.parentElement.clientWidth;
  canvas.width = containerWidth;
}

window.addEventListener('resize', resizeCanvas);


defineExpose({
  SkipEnd,
  fastForward,
  fastBackward
})
</script>

<style scoped lang="scss">
canvas{
  width: 100%;
  touch-action: none; 
}

</style>
