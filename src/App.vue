<template>
  <v-app class="main-background">
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style scoped>
  .main-background {
    color: white;
    background: #222222;
  }
</style>
