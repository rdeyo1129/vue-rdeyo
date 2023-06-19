<template>
  <div class="portfolio">
    <h1>Portfolio</h1>
    <div class="project">
      <img src="../assets/tact.png" />
      <div class="text">
        <h3>Tactorius</h3>
        <div class="description">
          <ul>
            <li>Progressive web app (MERN, Vite, Socket.io), variant-based chess platform.</li>
            <li>League - users compete to earn a ranking by solving chess puzzles.</li>
            <li>Story - users progress through by fighting the machine and learning the game.</li>
            <li>Create - craft custom variant templates that are used in versus mode.</li>
            <li>Artificially intelligent engine built using minimax alogorithm.</li>
          </ul>
        </div>
        <div class="button-wrapper">
          <a href="https://tactorius.herokuapp.com">
            <button>VIEW</button>
          </a>
        </div>
        <!-- <div class="button-wrapper">
          <span>CONTACT FOR DEMO</span>
        </div> -->
      </div>
    </div>
    <div class="project">
      <img src="../assets/tadium.png" />
      <div class="text">
        <h3>Stacktadium</h3>
        <div class="description">
          <ul>
            <li>Progressive web app - MEVN, Vite, Socket.io</li>
            <li>New RTS concept that mixes skill, strategy, and probability.</li>
            <li>Users compete against the machine and one another to place on the leaderboard.</li>
          </ul>
        </div>
        <!-- <a href="https://tactorius.herokuapp.com">
          <button>VIEW</button>
        </a> -->
        <div class="button-wrapper">
          <span>CONTACT FOR DEMO</span>
        </div>
      </div>
    </div>
    <div class="project">
      <img src="../assets/experiment.png" />
      <div class="text">
        <h3>Software Engineering Team Performance</h3>
        <div class="description">
          <ul>
            <li>Data science experiement coducted from scratch up through data collection, exploration, cleaning, model building, and deployment with SageMaker.</li>
            <li>Model predicts the behavior of student software engineering teams and the grade they receive at the end of a number of semesters.</li>
            <li>Learned about extracting actionable insight from problems.</li>
          </ul>
        </div>
        <div class="button-wrapper">
          <a href="https://github.com/rdeyo1129/se_team_performance">
            <button>VIEW</button>
          </a>
        </div>
      </div>
    </div>
    <div class="project">
      <img src="../assets/tejeduras.png" />
      <div class="text">
        <h3>Tejeduras</h3>
        <div class="description">
          <ul>
            <li>Experimental learning platform built in Flask / Python enviroment.</li>
            <li>Leverages OpenAI GPT model to provide users with a personalized learning experience.</li>
            <li>Custom prompts suggest what the user might want to learn and how to interact with the machine.</li>
          </ul>
        </div>
        <div class="button-wrapper">
          <a href="https://tejeduras.herokuapp.com/">
            <button>VIEW</button>
          </a>
        </div>
      </div>
    </div>
    <div class="project">
      <img src="../assets/slate.png" />
      <div class="text">
        <h3>Engineering Slate</h3>
        <div class="description">
          <ul>
            <li>Learning, and problem solving with Kaggle and Project Euler.</li>
            <li>Notes on programming machine learning concepts, algorithms, and techniques with Python and R.</li>
            <li>Notes on applied mathematics for data science including probability, statistics, calculus, and linear algebra.</li>
          </ul>
        </div>
        <div class="button-wrapper">
          <a href="https://github.com/rdeyo1129/engineering-slate">
            <button>VIEW</button>
          </a>
        </div>
      </div>
    </div>
    <div class="project">
      <img src="../assets/poker.png" />
      <div class="text">
        <h3>Poker</h3>
        <div class="description">
          <ul>
            <li>Online simulator of classic card game.</li>
            <li>Validation that measures hand strengths to determine winner.</li>
            <li>Betting engine.</li>
          </ul>
        </div>
        <div class="button-wrapper">
          <router-link :to="{ name: 'Poker' }">
            <button>VIEW</button>
          </router-link>
        </div>
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
    /* position: relative; */
    display: flex;
    flex-direction: row;
    width: 840px;
    height: auto;
    margin: 0 auto 20px auto;
    border-radius: 10px;
    background: #333333;
  }
  .project img {
    display: flex;
    align-self: center;
    height: 120px;
    width: 120px;
    margin: 40px;
    border-radius: 5px;
  }
  .project .text {
    margin: 40px 40px 40px 0;
  }
  .project .description {
    width: 600px;
    border-top: 4px solid #555555;
    border-left: 4px solid #555555;
    border-top-left-radius: 5px;
    padding: 20px 20px 0 20px;
    margin: 0 0 20px 0;
  }
  .project .button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 36px;
    width: 600px;
  }
  .project button {
    height: 36px;
    width: 150px;
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
    display: flex;
    align-items: center;
    width: 150px;
    height: 36px;
  }

</style>