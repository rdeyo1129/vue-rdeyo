<template>
  <div class="gametable">
    <Hand class="player" :hand='this.$props.playerHand'></Hand>
    <Hand class="opponent" :hand='this.$props.compHand' :phase='this.$props.phase'></Hand>
    <Hand class="example" :hand='this.$props.exampleHand'></Hand>
    <Hand class="shared" :hand='this.$props.shared'></Hand>
    <Hand class="discard" :hand='this.$props.discard' :compress='true'></Hand>
  </div>
</template>

<script>
import DeckView from '@/components/DeckView'
import Hand from '@/components/Hand'

export default {
  name: 'gametable',
  components: { Hand, DeckView },
  props: {
    phase: Number,
    playerHand: Array,
    compHand: Array,
    exampleHand: Array,
    shared: Array,
    discard: Array
  }
}
</script>

<style scoped>
.gametable {
  display: block;
  width: 900px;
  height: 400px;
  padding: 10px;
  margin: 20px 0 0 20px;
  border: 30px solid black;
  border-radius: 500px;
  background-color: DarkGreen;
}
.player {
  float: left;
  position: relative;
  width: 200px;
  height: 100px;
  padding: 0;
  margin: 100px 0 0 100px;
}
.opponent {
  float: left;
  position: relative;
  width: 200px;
  height: 100px;
  padding: 0;
  margin: 0 0 0 150px;
}
.example {
  float: left;
  position: absolute;
  width: 300px;
  height: 100px;
  padding: 0;
  margin: 180px 0 0 350px;
}
.shared {
  float: left;
  position: relative;
  width: 250px;
  height: 100px;
  padding: 0;
  margin: 100px 0 0 100px;
}
</style>
