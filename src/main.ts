// Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com
// See license file.
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const gql_url = import.meta.env.DEV ? 'http://localhost:8080/query' : 'http://localhost:8080/query' //TODO: CHANGE THIS

// Apollo Setup
const httpLink = createHttpLink({
  uri: gql_url
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
