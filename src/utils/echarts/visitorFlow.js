import * as echarts from 'echarts';
import { fontSizeRem } from '../fontSizeRem';

export function renderChart(chartElementId) {
    const chartDom = document.getElementById(chartElementId);
    if (!chartDom) return;

    // ✅ 如果之前创建过实例，先销毁旧的（防止切换时不显示）
    const old = echarts.getInstanceByDom(chartDom);
    if (old) echarts.dispose(old);

    const myChart = echarts.init(chartDom);

    const colors = {
        a: '#11D7E3',    // Sector A
        b: '#1166E3',    // Sector B
        c: '#23CD94',    // Sector C
        grid: '#52525B33'
    };

    const option = {
        backgroundColor: 'transparent',
        grid: {
            top: fontSizeRem(90),
            left: fontSizeRem(10),
            right: fontSizeRem(30),
            bottom: fontSizeRem(40),
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line' },
            backgroundColor: 'rgba(27, 126, 242, 1)',
            borderColor: '#fff',
            borderWidth: 1,
            textStyle: { color: '#fff', fontSize: fontSizeRem(22), fontFamily: 'Roboto' },
            formatter(params) {
                const t = params?.[0]?.axisValueLabel || '';
                const lines = params.map(p => `${p.marker} ${p.seriesName}: ${p.value}`).join('<br/>');
                return `<div style="margin-bottom:0.375rem">${t}</div>${lines}`;
            }
        },
        legend: {
            top: fontSizeRem(-7),
            left: '0%',
            itemWidth: fontSizeRem(18),
            itemHeight: fontSizeRem(18),
            itemGap: fontSizeRem(65),
            align: 'auto',
            textStyle: {
                color: '#52525B',
                fontSize: fontSizeRem(28),
                fontFamily: 'Roboto',
                verticalAlign: 'middle',
                lineHeight: fontSizeRem(38)
            },
            data: [
                {
                    name: 'Sector A',
                    icon: 'image://data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><circle cx="9" cy="9" r="8" fill="%2300E0FF"/></svg>'
                },
                {
                    name: 'Sector B',
                    icon: 'image://data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><circle cx="9" cy="9" r="8" fill="%234F9BFF"/></svg>'
                },
                {
                    name: 'Sector C',
                    icon: 'image://data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><circle cx="9" cy="9" r="8" fill="%2300B68F"/></svg>'
                }
            ]
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['09:00', '10:00', '11:00', '12:00', '13:00'],
            axisTick: { show: false },
            axisLine: {
                show: true,
                lineStyle: { color: colors.grid, width: 1 }
            },
            axisLabel: {
                color: '#52525BCC',
                fontSize: fontSizeRem(24),
                margin: fontSizeRem(16)
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 400,
            interval: 100,
            axisLine: {
                show: false,
                lineStyle: { color: colors.grid, width: 1 }
            },
            axisTick: { show: false },
            axisLabel: {
                color: '#52525BCC',
                fontSize: fontSizeRem(24)
            },
            splitLine: {
                show: true,
                lineStyle: { color: colors.grid, width: 1 }
            }
        },
        series: [
            {
                name: 'Sector A',
                type: 'line',
                data: [200, 205, 305, 400, 220],
                symbol: 'circle',
                symbolSize: fontSizeRem(10),
                lineStyle: { width: 2, color: colors.a },
                itemStyle: {
                    color: '#fff',
                    borderColor: colors.a,
                    borderWidth: 2
                }
            },
            {
                name: 'Sector B',
                type: 'line',
                data: [205, 300, 400, 208, 255],
                symbol: 'circle',
                symbolSize: fontSizeRem(10),
                lineStyle: { width: 2, color: colors.b },
                itemStyle: {
                    color: '#fff',
                    borderColor: colors.b,
                    borderWidth: 2
                }
            },
            {
                name: 'Sector C',
                type: 'line',
                data: [130, 140, 250, 360, 170],
                symbol: 'circle',
                symbolSize: fontSizeRem(10),
                lineStyle: { width: 2, color: colors.c },
                itemStyle: {
                    color: '#fff',
                    borderColor: colors.c,
                    borderWidth: 2
                }
            },
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
