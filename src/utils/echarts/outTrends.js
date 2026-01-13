import * as echarts from 'echarts';
import { fontSizeRem } from '../fontSizeRem';

export function renderOutChart(chartElementId) {
  const chartDom = document.getElementById(chartElementId);
  if (!chartDom) return;

  const old = echarts.getInstanceByDom(chartDom);
  if (old) echarts.dispose(old);

  const myChart = echarts.init(chartDom);

  // ===== mock 时间轴 + 三组柱数据（同一时间点三个柱）=====
  function buildData() {
    const start = new Date('2025-12-23T00:00:00');
    const points = 96; // 每 30 分钟一个点
    const x = [];
    const a = [];
    const b = [];
    const c = [];

    for (let i = 0; i < points; i++) {
      const t = new Date(start.getTime() + i * 30 * 60 * 1000);
      const label =
        `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()} ` +
        `${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}`;
      x.push(label);

      // 大部分为 0，少量时间点出现三根柱（可按你真实逻辑替换）
      const r = Math.random();
      if (r > 0.965) {
        a.push(Math.round(5 + Math.random() * 30));
        b.push(Math.round(5 + Math.random() * 30));
        c.push(Math.round(5 + Math.random() * 30));
      } else if (r > 0.94) {
        a.push(Math.round(Math.random() * 10));
        b.push(0);
        c.push(Math.round(Math.random() * 8));
      } else {
        a.push(0); b.push(0); c.push(0);
      }
    }

    return { x, a, b, c };
  }

  const { x, a, b, c } = buildData();

  const colors = {
    a: '#A3C2FF',
    b: '#A3C2FF',
    c: '#A3C2FF',
    grid: '#52525B33',
    label: '#52525BCC'
  };

  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: fontSizeRem(20),
      left: fontSizeRem(10),
      right: fontSizeRem(20),
      bottom: fontSizeRem(65),
      containLabel: true
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }, // ✅ 柱状推荐 shadow
      backgroundColor: 'rgba(27, 126, 242, 1)',
      borderColor: '#fff',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: fontSizeRem(22), fontFamily: 'Roboto' },
      formatter(params) {
        const t = params?.[0]?.axisValueLabel || '';
        const lines = params
          .map(p => `${p.marker} ${p.seriesName}: ${p.value}`)
          .join('<br/>');
        return `<div style="margin-bottom:0.375rem">${t}</div>${lines}`;
      }
    },

  xAxis: {
  type: 'category',
  data: x,
  boundaryGap: true,
  axisTick: { show: false },
  axisLine: {
    show: true,
    lineStyle: { color: colors.grid, width: 1 }
  },
  axisLabel: {
    color: colors.label,
    fontSize: fontSizeRem(22),
    margin: fontSizeRem(16),
    hideOverlap: true,
    formatter(value) {
      // value: "12/23/2025 05:00"
      const [date, time] = value.split(' ');
      return `${date}\n${time}`;
    }
  }
},

    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },

    // ✅ x 滚动条
    dataZoom: [
      { type: 'inside', xAxisIndex: 0, start: 0, end: 35 },
      {
        type: 'slider',
        xAxisIndex: 0,
        height: fontSizeRem(18),
        bottom: fontSizeRem(15),
        start: 0,
        end: 35,
        borderColor: 'transparent',
        backgroundColor: 'rgba(82,82,91,0.08)',
        fillerColor: 'rgba(82,82,91,0.18)',
        handleSize: '120%',
        handleStyle: { borderColor: 'rgba(82,82,91,0.25)' },
        showDetail: false
      }
    ],

    series: [
      {
        name: 'Sector A',
        type: 'bar',
        data: a,
        barWidth: fontSizeRem(18),
        barGap: '20%',          // ✅ 同组柱子间距
        barCategoryGap: '50%',  // ✅ 同时间点整体宽度
        itemStyle: { color: colors.a, borderRadius: [fontSizeRem(3), fontSizeRem(3), 0, 0] }
      },
      {
        name: 'Sector B',
        type: 'bar',
        data: b,
        barWidth: fontSizeRem(18),
        itemStyle: { color: colors.b, borderRadius: [fontSizeRem(3), fontSizeRem(3), 0, 0] }
      },
      {
        name: 'Sector C',
        type: 'bar',
        data: c,
        barWidth: fontSizeRem(18),
        itemStyle: { color: colors.c, borderRadius: [fontSizeRem(3), fontSizeRem(3), 0, 0] }
      }
    ]
  };

  myChart.setOption(option);

  const onResize = () => myChart.resize();
  window.addEventListener('resize', onResize);
}
