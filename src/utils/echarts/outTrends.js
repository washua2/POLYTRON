import * as echarts from 'echarts';
import { fontSizeRem } from '../fontSizeRem';

export function renderOutChart(chartElementId) {
  const chartDom = document.getElementById(chartElementId);
  if (!chartDom) return;

  const old = echarts.getInstanceByDom(chartDom);
  if (old) echarts.dispose(old);

  const myChart = echarts.init(chartDom);

  // ===== mock 时间轴 + 单柱数据 =====
  function buildData() {
    const start = new Date('2025-12-23T00:00:00');
    const points = 96; // 每 30 分钟一个点
    const x = [];
    const y = [];

    for (let i = 0; i < points; i++) {
      const t = new Date(start.getTime() + i * 30 * 60 * 1000);
      const label =
        `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()} ` +
        `${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}`;
      x.push(label);

      const r = Math.random();
      if (r > 0.965) y.push(Math.round(5 + Math.random() * 30));
      else if (r > 0.94) y.push(Math.round(Math.random() * 10));
      else y.push(0);
    }
    return { x, y };
  }

  const { x, y } = buildData();

  const colors = {
    bar: '#1C64F2',
    grid: '#52525B33',
    label: '#52525BCC'
  };

  // 你给的 SVG（内联到 tooltip）
  const ICON_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M0.493494 22.0222L0.675495 20.2802C0.714495 18.4862 2.00149 17.4202 5.83649 15.5352C7.11049 14.9112 7.21449 14.8072 7.22749 14.5732C7.21449 14.5082 7.1495 14.3652 7.0455 14.1962C6.9545 14.0662 6.86349 13.9362 6.79849 13.8712C6.26549 13.3122 5.90149 12.5322 5.66749 11.5312C5.55049 10.9852 5.45949 10.4262 5.4205 9.88018C5.3945 9.56818 5.38149 9.26918 5.38149 9.04818V8.80118C5.38149 6.46118 6.35649 4.73218 8.1375 3.77018C8.70949 3.47118 9.30749 3.26318 9.94449 3.14618C10.2305 3.09418 10.5295 3.05518 10.8155 3.05518H11.0885C11.3355 3.05518 11.6345 3.09418 11.9725 3.14618C12.6095 3.25018 13.2205 3.47118 13.7925 3.77018C15.5735 4.73218 16.5485 6.46118 16.5485 8.78818V9.04818C16.5485 9.26918 16.5355 9.55518 16.5095 9.88018C16.4705 10.4652 16.3925 11.0242 16.2625 11.5312C16.0285 12.5322 15.6775 13.3252 15.1315 13.8712C15.0665 13.9362 14.9755 14.0532 14.8845 14.1962C14.7675 14.3652 14.7155 14.5082 14.7025 14.5732C14.7025 14.8072 14.8195 14.8982 16.0935 15.5352C19.9545 17.4332 21.2415 18.5122 21.2545 20.3322L21.3715 22.0742C21.4235 22.7762 20.8905 23.3872 20.2015 23.4262C19.8375 23.4522 1.91049 23.4522 1.59849 23.4262C0.909494 23.3482 0.415493 22.7242 0.493494 22.0222ZM2.63849 21.7752C4.45849 21.7882 17.4065 21.7882 19.2395 21.7752L19.1355 20.3582C19.1355 19.3702 18.2385 18.6162 15.1185 17.0692C13.4805 16.2632 13.0645 15.4182 13.0645 14.4822C13.0645 14.4302 13.0645 14.3652 13.0775 14.3132C13.1165 14.0142 13.2595 13.6892 13.4675 13.3772C13.5845 13.1952 13.7145 13.0392 13.8575 12.8832C14.1565 12.5712 14.3905 12.0642 14.5465 11.3492C14.6375 10.9072 14.7025 10.4652 14.7415 10.0232C14.7545 9.80218 14.7675 9.58118 14.7675 9.36018V9.11318C14.7675 7.44918 14.1305 6.31818 12.9345 5.66818C12.5315 5.46018 12.1025 5.30418 11.6605 5.22618C11.4265 5.18718 11.2185 5.16118 11.0885 5.16118H10.8415C10.7115 5.16118 10.5165 5.18718 10.2825 5.22618C9.82749 5.31718 9.39849 5.46018 9.00849 5.66818C7.81249 6.31818 7.1755 7.44918 7.1755 9.11318V9.36018C7.1755 9.52918 7.18849 9.76318 7.20149 10.0232C7.24049 10.5042 7.30549 10.9462 7.39649 11.3492C7.56549 12.0642 7.78649 12.5712 8.08549 12.8832C8.22849 13.0392 8.35849 13.2082 8.47549 13.3772C8.68349 13.7022 8.82649 14.0142 8.86549 14.3132C8.87849 14.3652 8.87849 14.4302 8.87849 14.4822C8.87849 15.4182 8.44949 16.2632 6.82449 17.0692C3.70449 18.6032 2.80749 19.3572 2.80749 20.3062H2.61249L2.80749 20.3322L2.63849 21.7752Z" fill="#09090B"/>
    <path d="M16.4041 4.10822C16.8201 4.18622 17.2361 4.32922 17.6131 4.52422C18.7441 5.13522 19.3421 6.20122 19.3421 7.77422V8.00822C19.3421 8.21622 19.3291 8.42422 19.3161 8.64522C19.2901 9.07422 19.2251 9.49022 19.1341 9.91922C18.9781 10.5952 18.7571 11.0632 18.4841 11.3492C18.3411 11.5052 18.2111 11.6612 18.0941 11.8432C17.8861 12.1682 17.7431 12.4802 17.7041 12.7792C17.6911 12.8312 17.6911 12.8962 17.6911 12.9482C17.6911 13.8972 18.1201 14.2872 19.7321 15.0802C22.7091 16.5492 23.5671 17.2642 23.5671 18.1222V18.1742L23.6581 19.4612C24.0091 20.0722 23.6321 20.9562 23.6321 20.9562H24.3861C25.0491 20.9042 25.5561 20.3192 25.5041 19.6562L25.4001 18.1092C25.3871 16.4322 24.2171 15.4702 20.7331 13.7542C20.0571 13.4292 19.7191 13.2212 19.5761 13.0912C19.5241 13.0522 19.5371 13.0652 19.5371 12.9742C19.5501 12.9222 19.6021 12.8052 19.6931 12.6752C19.7711 12.5582 19.8491 12.4542 19.9011 12.4022C20.3951 11.8952 20.7201 11.1802 20.9281 10.2702C21.0321 9.80222 21.1101 9.30822 21.1491 8.77522C21.1751 8.48922 21.1751 8.22922 21.1751 8.03422V7.80022C21.1751 5.69422 20.2911 4.10822 18.6531 3.23722C18.1461 2.96422 17.5871 2.76922 17.0021 2.66522C16.7421 2.61322 16.4691 2.58722 16.1961 2.57422H15.9491C15.9491 2.57422 16.4951 3.28922 16.4041 4.08222" fill="#09090B"/>
  </svg>`;

  function pad2(n) { return String(n).padStart(2, '0'); }

  // 解析 "M/D/YYYY H:mm" 为 Date（确保和 buildData 输出一致）
  function parseLabelToDate(label) {
    const [mdy, hm] = label.split(' ');
    const [m, d, y4] = mdy.split('/').map(Number);
    const [h, min] = hm.split(':').map(Number);
    return new Date(y4, m - 1, d, h, min, 0);
  }

  function formatTooltipRange(d1, d2) {
    // 示例输出：3/21/2023 10:45 PM - 11:00 PM PDT
    const m = d1.getMonth() + 1;
    const d = d1.getDate();
    const y = d1.getFullYear();

    const h12 = (h) => {
      const ap = h >= 12 ? 'PM' : 'AM';
      const hh = h % 12 === 0 ? 12 : h % 12;
      return { hh, ap };
    };

    const a = h12(d1.getHours());
    const b = h12(d2.getHours());

    const left = `${m}/${d}/${y} ${a.hh}:${pad2(d1.getMinutes())} ${a.ap}`;
    const right = `${b.hh}:${pad2(d2.getMinutes())} ${b.ap}`;

    // 时区缩写（浏览器不一定能给出 PDT，给个兜底）
    const tz = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(d1)
      .find(p => p.type === 'timeZoneName')?.value || '';

    return `${left} - ${right} ${tz}`.trim();
  }

  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: fontSizeRem(20),
      left: fontSizeRem(10),
      right: fontSizeRem(20),
      bottom: fontSizeRem(65),
      containLabel: true
    },

    // ✅ 自定义卡片 tooltip：白底、无默认 marker、按 item 触发
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,1)',
      borderWidth: 0,
      extraCssText: `
        box-shadow: 0px 8px 24px rgba(0,0,0,0.12);
        border-radius: 12px;
        padding: 12px 14px;
      `,
      formatter: (p) => {
        const idx = p.dataIndex ?? 0;
        const start = parseLabelToDate(x[idx]);
        // 结束时间取下一点；如果没有下一点，默认 +30min
        const end = idx < x.length - 1
          ? parseLabelToDate(x[idx + 1])
          : new Date(start.getTime() + 30 * 60 * 1000);

        const rangeText = formatTooltipRange(start, end);
        const value = p.value ?? 0;

        return `
          <div style="display:flex;flex-direction:column;gap:8px;min-width:220px;">
            <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
              <div style="width:26px;height:26px;display:flex;align-items:center;justify-content:center;">
                ${ICON_SVG}
              </div>
              <div style="font-family:Roboto;font-weight:600;font-size:16px;line-height:20px;color:#09090B;">
                ${value}
              </div>
            </div>
            <div style="font-family:Roboto;font-size:14px;line-height:18px;color:#71717A;">
              ${rangeText}
            </div>
          </div>
        `;
      }
    },

    xAxis: {
      type: 'category',
      data: x,
      boundaryGap: true,
      axisTick: { show: false },
      axisLine: { show: true, lineStyle: { color: colors.grid, width: 1 } },
      axisLabel: {
        color: colors.label,
        fontSize: fontSizeRem(22),
        margin: fontSizeRem(16),
        hideOverlap: true,
        formatter(value) {
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

    // dataZoom: [
    //   { type: 'inside', xAxisIndex: 0, start: 0, end: 35 },
    //   {
    //     type: 'slider',
    //     xAxisIndex: 0,
    //     height: fontSizeRem(18),
    //     bottom: fontSizeRem(15),
    //     start: 0,
    //     end: 35,
    //     borderColor: 'transparent',
    //     backgroundColor: 'rgba(82,82,91,0.08)',
    //     fillerColor: 'rgba(82,82,91,0.18)',
    //     handleSize: '120%',
    //     handleStyle: { borderColor: 'rgba(82,82,91,0.25)' },
    //     showDetail: false
    //   }
    // ],
dataZoom: [
  {
    type: 'inside',
    xAxisIndex: 0,
    start: 0,
    end: 35,
    zoomOnMouseWheel: true,   // 滚轮缩放（默认 true）
    moveOnMouseMove: true,    // 按住拖拽平移（默认 true）
    moveOnMouseWheel: true    // 滚轮平移（可选，想禁用就改 false）
  }
],

    series: [
      {
        name: 'Count',
        type: 'bar',
        data: y,
        barWidth: fontSizeRem(24),
        itemStyle: {
          color: colors.bar,
          borderRadius: [fontSizeRem(3), fontSizeRem(3), 0, 0]
        }
      }
    ]
  };

  myChart.setOption(option);

  const onResize = () => myChart.resize();
  window.addEventListener('resize', onResize);
}
