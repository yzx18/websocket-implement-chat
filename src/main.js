import Vue from 'vue'
import App from './App.vue'
import elemeui from 'element-ui'
import vueRoute from 'vue-router'
import index from './router'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elemeui)
Vue.use(vueRoute)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router:index
}).$mount('#app')
