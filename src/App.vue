<template>
  <div id="app">
    <Hero />
    <MainTable />
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
  }
}
</script>

<style>
#app {
  width: 70%;
  margin: 0 auto;
  margin-top: 5rem;
}
</style>
