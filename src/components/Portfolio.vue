<template>
  <div class="portfolio">
    <h1>Portfolio</h1>
    <div class="project">
      <img src="../assets/tactorius.png" />
      <div class="text">
        <h3>Tactorius</h3>
        <div class="description">
          <ul>
            <li>Variant-based chess platform</li>
            <li>Campaign mode that introduces players to the game</li>
          </ul>
        </div>
        <a href="https://tactorius.herokuapp.com"><button>VIEW</button></a>
      </div>
    </div>
    <div class="project">
      <img src="../assets/connect4ius.png" />
      <div class="text">
        <h3>Connect4ius</h3>
        <div class="description">
          <ul>
            <li>Singleplayer mode featuring the minimax algorithm</li>
            <li>Multiplayer mode utilizing websockets</li>
          </ul>
        </div>
        <a href="https://connect4ius.herokuapp.com/"><button>VIEW</button></a>
      </div>
    </div>
    <div class="project">
      <img src="../assets/royalflush.png" />
      <div class="text">
        <h3>Poker</h3>
        <div class="description">
          <ul>
            <li>Online simulator of class card game</li>
            <li>Rule validation and betting engine</li>
          </ul>
        </div>
        <router-link :to="{ name: 'Poker' }"><button>VIEW</button></router-link>
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
    display: flex;
    flex-direction: row;
    width: 800px;
    height: 200px;
    margin: 0 auto 20px auto;
    border-radius: 5px;
    background: #555555;
  }
  .project img {
    height: 120px;
    width: 120px;
    margin: 40px;
    border-radius: 5px;
  }
  .project .text {
    height: 160px;
    margin: 20px 20px 20px 0;
  }
  .project .description {
    width: 560px;
    border-top: 4px solid #AAAAAA;
    border-left: 4px solid #AAAAAA;
    border-top-left-radius: 5px;
    padding: 20px 0 0 20px;
    margin-right: 20px;
  }
  .project button {
    float: right;
    height: 36px;
    width: 120px;
    margin-right: 20px;
    border-radius: 5px;
    color: white;
  }
  .project button:hover {
    cursor: pointer;
    background: #AAAAAA;
  }

</style>