<template>
  <div id="app">
    <Hero />
    <ReviewsModal vendor="vendor2"/>
    <div id="content">
      <MainTable />
    </div>
    <p id="version">v0.0.2</p>
  </div>
</template>

<script>
import Hero from './components/Hero'
import MainTable from './components/MainTable'
import ReviewsModal from './components/ReviewsModal'

export default {
  name: 'App',
  components: {
    Hero,
    MainTable,
    ReviewsModal
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
  width: 85%;
  margin: 0 auto;
}

#content {
  width: 95%;
  margin: 0 auto;
}

#version {
  filter: opacity(.4);
  font-size: .7rem;
}
</style>
