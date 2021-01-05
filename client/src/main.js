import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import dotenv from 'dotenv'
import Buefy from 'buefy'
import ApolloClient from 'apollo-boost'
import 'buefy/dist/buefy.css'

dotenv.config()

Vue.use(Buefy)
Vue.use(VueApollo)

Vue.config.productionTip = false

const apolloClient = new ApolloClient ({
  uri: process.env.NODE_ENV === "production" ?
  "https://tvendors.io/graphql" :
  "http://localhost:5000/graphql"
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
