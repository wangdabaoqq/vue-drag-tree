
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FileHandle from '@/index'
Vue.use(FileHandle)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
