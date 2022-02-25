<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.deshowFooter"></Footer>
  </div>

</template>

<script>
import Header from './components/Header'
import Footer from "./components/Footer";


export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style>