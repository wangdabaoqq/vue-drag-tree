import {
  Table,TableColumn
} from 'element-ui';

import VueHighlightJS from 'vue-highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import  HelloWord from '../../examples/components/HelloWorld.vue'
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.component(HelloWord.name,HelloWord)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(VueHighlightJS)
}
