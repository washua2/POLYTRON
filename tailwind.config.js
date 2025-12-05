/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  safelist: [
    // Add classes that should not be purged
    'flowbite',
    // ... other classes
  ],
  theme: {

    extend: {
      screens: {
        // // iPad（包含横竖屏）
        // ipad: { raw: "(min-width: 768px) and (max-width: 1366px)" },
        // // 1080p 及以上
        // fhd: { raw: "(min-width: 1920px) and (min-height: 1080px)" },
        // // ✅ 新增：2K / 1440p 及以上
        // qhd: { raw: "(min-width: 2560px) and (min-height: 1440px)" },
        // // 4K 及以上
        // uhd: { raw: "(min-width: 3840px) and (min-height: 2160px)" },
      },
    },
  },
  plugins: [require('flowbite/plugin')({
    charts: true,
  })],
}

