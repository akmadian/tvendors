import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import VueApollo from 'vue-apollo'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(Meta)
Vue.use(VueApollo)

Vue.config.productionTip = false

import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient ({
    uri: 'http://localhost:4000'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')