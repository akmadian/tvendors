<template>
  <div id="app">
    <Hero />
    <ReviewsModal vendor="vendor2"/>
    <div id="content">
      <MainTable />
    </div>
    <span id="footer">
      <div>
        v0.0.2 | 
        Designed and built by <a href="https://arimadian.info">Ari Madian</a> (bandsaw bandit in CommuniTEA) | 
        tvendors is <a href="https://github.com/akmadian/tvendors">open source</a> under <a href="https://github.com/akmadian/tvendors/blob/main/LICENSE">the GNU GPL-3.0 license</a>
      </div>
      <div>
        Privacy: tvendors does not hold on to any information that you do not explicitly give it to hold on to (this only ever happens if you leave a review). If you want all of your information deleted from tvendors, please contact me and I'll see to it.
      </div>
    </span>
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

#footer {
  filter: opacity(.4);
  font-size: .7rem;
}

#footer a {
  font-weight: 600;
  color: rgb(50, 50, 50);
  text-decoration: underline dotted;
}

#footer a:hover {
  filter: opacity(1);
  color: black;
  text-decoration: underline solid;
}
</style>
