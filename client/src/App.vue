<template>
  <div id="app">
    <Hero />
    <div id="content">
      <MainTable />
    </div>
    <br><br>
    <DBPanel/>
    <AddVendor/>
    <span id="footer">
      <div>
        v0.0.3 | 
        Designed and built by <a href="https://arimadian.info">Ari Madian</a> (bandsaw bandit in CommuniTEA) | 
        tvendors is <a href="https://github.com/akmadian/tvendors">open source</a> under <a href="https://github.com/akmadian/tvendors/blob/main/LICENSE">the GNU GPL-3.0 license</a>
      </div>
      <div>
        Privacy: tvendors does not hold on to any information that you do not explicitly give it to hold on to (this only ever happens if you leave a review). If you want all of your information deleted from tvendors, please contact me and I'll see to it.
      </div>
    </span>
    <br><br>
  </div>
</template>

<script>
import Hero from './components/Hero'
import MainTable from './components/MainTable'
import DBPanel from './components/DBPanel'
import AddVendor from './components/AddVendor'

export default {
  name: 'App',
  components: {
    Hero,
    MainTable,
    DBPanel,
    AddVendor
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
  filter: opacity(1);
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
