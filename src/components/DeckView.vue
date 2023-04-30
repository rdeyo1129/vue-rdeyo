<template>
  <div class="deckview">
    <Card v-for="card in this.$props.deck" :compress='true' :isRed='card.isRed' :value='card.value'></Card>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'deckview',
  components: { Card },
  props: {
    deck: Array
  }
}
</script>

<style scoped>
.deckview {
  float: left;
  position: absolute;
  display: block;
  width: auto;
  height: auto;
  margin: 188px 0 0 60px;
  padding: 0;
}
</style>
