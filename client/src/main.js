import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import VueApollo from 'vue-apollo'
import dotenv from 'dotenv'
import Buefy from 'buefy'
import ApolloClient from 'apollo-boost'
import 'buefy/dist/buefy.css'

dotenv.config()

Vue.use(Buefy)
Vue.use(Meta)
Vue.use(VueApollo)

Vue.config.productionTip = false

const apolloClient = new ApolloClient ({
	uri: 'https://tvendors.io/graphql',
    connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
