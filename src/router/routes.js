// 使用懒加载的方式引入组件
const Home = () => import("@/view/index.vue");
const Cameras = () => import("@/view/cameras/index.vue");
const CamerasDetail = () => import("@/view/camerasDetail/index.vue");
const Playback = () => import("@/view/playback/index.vue");
const CameraManagement = () => import("@/view/cameraManagement/index.vue");
const Archive = () => import("@/view/archive/index.vue");
const Login = () => import("@/view/login/index.vue");
const ResetPassword = () => import("@/view/resetPassword/index.vue");

const NotFound = () => import("@/view/404.vue"); // 404 页面


export const routes = [
  {
    path: "/",
    component: Home,
    redirect: "/cameras", // 重定向
    meta: { title: "Home", isAuth: false },
    children: [
      {
        path: "cameras",
        component: Cameras,
        meta: { title: "Cameras", isAuth: false }
      },
      {
        path: "camerasDetail/:id",
        component: CamerasDetail,
        meta: { title: "CamerasDetail", isAuth: false }
      },
      {
        path: "cameraManagement",
        component: CameraManagement,
        meta: { title: "CameraManagement", isAuth: false }
      },
      {
        path: "archive",
        component: Archive,
        meta: { title: "Archive", isAuth: false }
      },
    ]
  },
  {
    path: "/playback/:id",
    component: Playback,
    meta: { title: "Playback", isAuth: false }
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "Login", isAuth: false }
  },
  {
    path: "/resetPassword",
    component: ResetPassword,
    meta: { title: "ResetPassword", isAuth: false }
  },
  // 404 页面
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: { title: "404 Not Found", isAuth: false },
  },
];

export const anyRoutes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "404",
      isAuth: false,
    },
  },
];
