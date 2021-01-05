import vueDragTree from './src/tree.vue'
import '../style/index.styl'
// import '../../lib/theme/drag-module.css'
export function install(Vue) {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component(vueDragTree.name, vueDragTree)
}

vueDragTree.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueDragTree)
}
export default vueDragTree
