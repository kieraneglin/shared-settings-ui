import './styles/main.css'

import Vue from 'vue'
import Settings from './views/settings/Index.vue'

interface CustomWindow extends Window {
  sharedSettingsApiBase: string
}

declare const window: CustomWindow

Vue.config.productionTip = false
Vue.prototype.$apiBase = window.sharedSettingsApiBase || ''

new Vue({
  render: (h) => h(Settings)
}).$mount('#app')
