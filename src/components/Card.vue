<template>
  <div :class="{ card: true, compress: this.$props.compress, isRed: this.$props.isRed, isBlack: !this.$props.isRed }">
    <p>{{ this.$props.display }}</p>
    <div class="suit"><p>{{ this.$props.suit }}</p></div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    compress: Boolean,
    isRed: Boolean,
    value: Number,
    display: String,
    suit: String
  }
}
</script>

<style>
.card {
  float: left;
  position: relative;
  display: block;
  width: 36px;
  height: 62px;
  margin: 0 5px 0 0;
  border: 2px solid black;
  border-radius: 5px;
  background: white;
}
.card p {
  text-align: center;
  font-size: 24px;
  margin: 0;
}
.suit p {
  position: absolute;
  margin: -20px 0 0 6px;
  font-size: 36px;
}
.isRed {
  color: red;
}
.isBlack {
  color: black;
}
.card.compress {
  margin: 0 -36px 0 0;
}
</style>
