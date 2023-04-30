<template>
  <div class="home">
    <Intro />
    <div class="visual" />
    <Portfolio />
    <About />
    <div class="visual" />
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

  .visual {
    height: 60px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,21,173,1) 100%);
  }

</style>