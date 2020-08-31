import './styles/main.css'

import Vue from 'vue'
import Settings from './views/settings/Index.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Settings)
}).$mount('#app')
