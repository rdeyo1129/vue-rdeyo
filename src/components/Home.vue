<template>
  <div class="home">
    <Intro />
    <!-- <div class="visual" /> -->
    <Portfolio />
    <About />
    <!-- <div class="visual" /> -->
    <Footer />
  </div>
</template>

<script>
  import Intro from '@/components/Intro'
  import Portfolio from '@/components/Portfolio'
  import About from '@/components/About'
  import Footer from '@/components/Footer'

  export default {
    name: 'app',
    components: { Intro, Portfolio, About, Footer }
  }
</script>

<style scoped>

  .home {
    color: white;
    background: #222222;
  }
  .visual {
    height: 60px;
    background: linear-gradient(#111111 0%, rgba(0,21,173,1) 100%);
  }

</style>