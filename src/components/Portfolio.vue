<template>
  <div class="portfolio">
    <h1>Portfolio</h1>
    <div class="project">
      <img src="../assets/tejeduras.png" />
      <div class="text">
        <h3>Tejeduras</h3>
        <div class="description">
          <ul>
            <li>Chat GPT API Experiment</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <a href="https://github.com/rdeyo1129/tejeduras">
          <button>VIEW</button>
        </a>
      </div>
    </div>
    <div class="project">
      <img src="../assets/slate.png" />
      <div class="text">
        <h3>Engineering Slate</h3>
        <div class="description">
          <ul>
            <li>Hands-on learning with Kaggle, Project Euler, and Amazon SageMaker.</li>
            <li>Notes on programming machine learning concepts, algorithms, and techniques with Python and R.</li>
            <li>Notes on applied mathematics for data science including probability, statistics, calculus, and linear algebra.</li>
          </ul>
        </div>
        <a href="https://github.com/rdeyo1129/engineering-slate">
          <button>VIEW</button>
        </a>
      </div>
    </div>
    <div class="project">
      <img src="../assets/tact.png" />
      <div class="text">
        <h3>Tactorius</h3>
        <div class="description">
          <ul>
            <li>Progressive web app (MERN, Vite, Socket.io) of a variant-based chess platform.</li>
            <li>Competitve league mode where users earn a ranking by solving chess puzzles</li>
            <li>Story-driven mode where users progress through scenarios and learn the game.</li>
            <li>Basic artificially intelligent engine built using minimax alogorithm.</li>
            <li>Users create custom variant templates that are used in versus mode.</li>
          </ul>
        </div>
        <!-- <a href="https://tactorius.herokuapp.com">
          <button>VIEW</button>
        </a> -->
        <span>CONTACT FOR DEMO</span>
      </div>
    </div>
    <div class="project">
      <img src="../assets/tadium.png" />
      <div class="text">
        <h3>Stacktadium</h3>
        <div class="description">
          <ul>
            <li>Progressive web app - MEVN, Vite, Socket.io</li>
            <li>New RTS concept that mixes skill, strategy, and probability</li>
            <li>Users compete against the machine and one another to place on the leaderboard.</li>
          </ul>
        </div>
        <!-- <a href="https://tactorius.herokuapp.com">
          <button>VIEW</button>
        </a> -->
        <span>CONTACT FOR DEMO</span>
      </div>
    </div>
    <div class="project">
      <img src="../assets/poker.png" />
      <div class="text">
        <h3>Poker</h3>
        <div class="description">
          <ul>
            <li>Online simulator of classic card game</li>
            <li>Validation that measures hand strengths to determine winner</li>
            <li>Betting engine</li>
          </ul>
        </div>
        <router-link :to="{ name: 'Poker' }">
          <button>VIEW</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>

  ul {
    margin: 0;
  }
  
  .portfolio h1 {
    text-align: center;
    margin: 40px auto 40px auto;
  }
  .project {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 800px;
    height: 300px;
    margin: 0 auto 20px auto;
    border-radius: 10px;
    background: #333333;
  }
  .project img {
    height: 120px;
    width: 120px;
    margin: 40px;
    border-radius: 5px;
  }
  .project .text {
    height: 220px;
    margin: 20px 20px 20px 0;
  }
  .project .description {
    width: 560px;
    border-top: 4px solid #555555;
    border-left: 4px solid #555555;
    border-top-left-radius: 5px;
    padding: 20px 0 0 20px;
    margin-right: 20px;
  }
  .project button {
    position: absolute;
    height: 36px;
    width: 120px;
    margin-right: 20px;
    border-radius: 5px;
    color: white;
    right: 20px;
    bottom: 40px;
  }
  .project button:hover {
    cursor: pointer;
    background: #AAAAAA;
  }
  .project span {
    position: absolute;
    height: 36px;
    margin-right: 20px;
    right: 20px;
    bottom: 20px;
  }

</style>