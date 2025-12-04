import { createRouter, createWebHashHistory } from 'vue-router';
import { routes, anyRoutes } from './routes';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 初始化路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...anyRoutes],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

router.beforeEach(async (to, from, next) => {
  // 开启顶部进度条，提示页面正在加载
  NProgress.start()
  
    next() // 放行
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router;
