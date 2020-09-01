import './styles/main.css'

import Vue from 'vue'
import Settings from './views/settings/Index.vue'

Vue.config.productionTip = false

// TODO: replace with per-app config
Vue.prototype.$apiHost = 'http://localhost:4005'

new Vue({
  render: (h) => h(Settings)
}).$mount('#app')
