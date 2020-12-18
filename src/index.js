// import FileHandle from '../packages/file-handle/index'
// import TestModule from '../packages/test-module/index'
import vueDragTree from '../packages/vueDragTree/index'

// import { version } from '../package.json'
const components = [vueDragTree]
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) {
    return
  }
  components.forEach((component) => {
    Vue.component(component.name, component)
    Vue.use(component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default vueDragTree
