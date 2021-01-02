import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(Meta)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')