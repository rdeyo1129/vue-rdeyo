<template>
  <div class="portfolio">
    <title>
      <h2>Portfolio</h2>
      <p>A collection of prototypes built with Vue.JS</p>
    </title>
    <div class="projects">
      <div class="project poker">
        <img src="../assets/poker-image.gif" />
        <div class="text">
          <h3>Poker</h3>
          <router-link :to="{ name: 'Poker' }"><v-btn>Project</v-btn></router-link>
          <v-btn href="https://bitbucket.org/rdeyo1129/vue-poker/src/master/">Repository</v-btn>
        </div>
      </div>
      <div class="project">
        <img src="../assets/chess-image.gif" />
        <div class="text">
          <h3>Chess</h3>
          <router-link :to="{ name: 'Chess' }"><v-btn>Project</v-btn></router-link>
          <v-btn href="https://bitbucket.org/rdeyo1129/vue-chess-board/src/master/">Repository</v-btn>
        </div>
      </div>
      <div class="project">
        <img src="../assets/tictactoe-image.gif" />
        <div class="text">
          <h3>Tic-Tac-Toe</h3>
          <router-link :to="{ name: 'TicTacToe' }"><v-btn>Project</v-btn></router-link>
          <v-btn href="https://bitbucket.org/rdeyo1129/tic-tac-toe/src/master/">Repository</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h3 {
  color: white;
}
p {
  color: white;
}
.portfolio {
  display: inline-block;
  text-align: center;
  position: absolute;
  height: auto;
  width: 100%;
  top: 80%;
  background-color: #2a2a2a;
}
title {
  display: block;
  position: relative;
  text-align: left;
  color: white;
  margin: 3% 0 0 6%;
}
h2, p {
  display: inline;
  margin: 0 10px 0 10px;
}
.projects {
  display: inline-block;
  align: center;
  height: 100%;
  width: 100%;
}
.project {
  display: inline-block;
  position: relative;
  align: center;
  text-align: center;
  width: 25%;
  margin: 3% 3% 3% 3%;
  padding: 2%;
  border: solid #4c4c4c 5px;
  border-radius: 20px;
}
.text {
  display: block;
  margin: 10px 10px 10px 10px
}
.portfolio img {
  height: 200px;
  width: 200px;
  position: relative;
  float: center;
  margin: 0 auto 0 auto;
  border: solid #4c4c4c 10px;
  border-radius: 100%;
}
</style>
