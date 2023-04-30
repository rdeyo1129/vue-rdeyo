<template>
  <div class="hand">
    <div v-if="this.$props.phase < 5">
      <Card v-for="card in this.$props.hand"></Card>
    </div>
    <div v-else>
      <Card v-for="card in this.$props.hand"
            :isRed='card.isRed'
            :value='card.value'
            :display='card.display'
            :suit='card.suit'
            :compress='card.compress'>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'hand',
  components: { Card },
  props: {
    hand: Array,
    phase: Number,
    compress: Boolean
  }
}
</script>

<style scoped>
.player {
  float: left;
  position: relative;
  width: 300px;
  height: 100px;
  padding: 0;
  margin: 250px 0 0 100px;
}
.opponent {
  float: left;
  position: absolute;
  width: 200px;
  height: 100px;
  padding: 0;
  margin: 0 0 0 120px;
}
.shared {
  float: left;
  position: absolute;
  margin: 110px 0 0 110px;
}
</style>
