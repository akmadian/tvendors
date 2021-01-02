<template>
  <div id="app">
    <Hero />
    <MainTable />
    <p id="version">v0.0.1</p>
  </div>
</template>

<script>
import Hero from './components/Hero'
import MainTable from './components/MainTable'

export default {
  name: 'App',
  components: {
    Hero,
    MainTable
  },
  metaInfo: {
    meta: [
      {property: 'og:title', content: "tvendors"},
      {property: 'og:type', content: 'website'},
      {property: 'og:image', content: 'https://mmaaggnnaa.files.wordpress.com/2009/05/the-tea-garden.jpg'},
      {property: 'og:description', content: 'Looking for a specific tea product but not sure where to get it from? Use tvendors.'}
    ]
  }
}
</script>

<style>
#app {
  width: 70%;
  margin: 0 auto;
  margin-top: 5rem;
}

#version {
  filter: opacity(.4);
  font-size: .7rem;
}
</style>
