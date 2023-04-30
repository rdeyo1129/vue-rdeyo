<template>
  <div id="app">
    <div class="background">
      <Hello></Hello>
      <Portfolio></Portfolio>
    </div>
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import Portfolio from '@/components/Portfolio'

export default {
  name: 'app',
  components: { Hello, Portfolio }
}
</script>

<style scoped>
.background {
  position: relative;
  background-attachment: fixed;
  height: 100vh;
  background-size: 300% 300%;
  background-image: url("../assets/spiral.jpg");
  background-position: center;
}
</style>
