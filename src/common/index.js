import SvgIcon from './SvgIcon.vue' // svg图标
import Page from './Page.vue' // 分页

const allGloablComponent = {SvgIcon,Page}

export default {
  install(app) {
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
  },
}