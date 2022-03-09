import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueLazyLoad from "vue-lazyload"
import FastClick from "fastclick"

import toast from "@/components/common/toast/index"

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('@/assets/img/common/loading.png')
})

Vue.use(toast)

FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
