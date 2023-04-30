<template>
<div class='game'>
  <div class='controls'>
    <v-btn @click="start()">START</v-btn>
    <v-btn @click="chooseToken()">SWITCH</v-btn>
    <v-btn @click="reset()">RESET</v-btn>
    <span>PLAY AS {{ this.human.token }}</span>
  </div>
  <div class="board">
    <div class="row" v-for="row in board" >
      <div v-for="square in row" :class="square" @click="moveHuman(board, square)">
        <h2>{{ square.token }}</h2>
      </div>
    </div>
  </div>
  <h1 :show="this.gameOver">{{ this.result }}</h1>
</div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      board: [],
      count: 0,
      gameOver: true,
      victory: false,
      draw: false,
      result: '',
      human: {},
      cpu: {},
      cross: {
        turn: true,
        cross: true,
        token: 'X'
      },
      naught: {
        turn: false,
        naught: true,
        token: 'O'
      }
    }
  },
  methods: {
    chooseToken () {
      if (!this.gameOver || this.victory || this.draw) {
        return event.preventDefault
      } else {
        if (this.human.token === 'X') {
          this.human = this.naught
          this.cpu = this.cross
        } else if (this.human.token === 'O') {
          this.human = this.cross
          this.cpu = this.naught
        }
      }
    },
    start () {
      if (this.victory || this.draw) {
        return event.preventDefault
      } else {
        this.gameOver = false
        if (this.cpu.turn) {
          this.moveCPU(this.board, this.cpu)
        }
      }
    },
    reset () {
      for (let row of this.board) {
        for (let square of row) {
          square.token = ''
          square.occupied = false
          square.cross = false
          square.naught = false
        }
      }
      this.cross.turn = true
      this.naught.turn = false
      this.count = 0
      this.gameOver = true
      this.victory = false
      this.draw = false
      this.result = ''
    },
    nextTurn () {
      this.cpu.turn = !this.cpu.turn
      this.human.turn = !this.human.turn
      if (this.cpu.turn) {
        this.moveCPU(this.board, this.cpu)
      }
    },
    placeToken (board, square, player) {
      this.count++
      square.occupied = true
      square.token = player.token
      square.cross = player.cross
      square.naught = player.naught
      this.gameOverCheck(board, square, player)
      if (!this.gameOver) {
        this.nextTurn()
      }
    },
    moveHuman (board, square) {
      if (!square.occupied && !this.gameOver && this.human.turn) {
        this.placeToken(board, square, this.human)
      }
    },
    victoryMap () {
      const winMap = []
      const winConditions = [
        // rows
        [
          [0, 0], [1, 0], [2, 0]
        ],
        [
          [0, 1], [1, 1], [2, 1]
        ],
        [
          [0, 2], [1, 2], [2, 2]
        ],
        // columns
        [
          [0, 0], [0, 1], [0, 2]
        ],
        [
          [1, 0], [1, 1], [1, 2]
        ],
        [
          [2, 0], [2, 1], [2, 2]
        ],
        // diagonals
        [
          [0, 0], [1, 1], [2, 2]
        ],
        [
          [2, 0], [1, 1], [0, 2]
        ]
      ]

      winConditions.forEach((condition) => {
        const group = condition.map((coordinate) => {
          return this.board[coordinate[0]][coordinate[1]]
        })
        winMap.push(group)
      })
      return winMap
    },
    boardAnalysis (player, opponent) {
      const processedGroup = []
      const winGroup = this.victoryMap()

      winGroup.forEach((winGroup) => {
        let movesFromWin = 3
        let openCenter = true
        winGroup.forEach((square) => {
          if (square.token === player.token) {
            movesFromWin--
          }
          if (square.token === opponent.token) {
            movesFromWin = -100
          }
          if (square.center && square.occupied) {
            openCenter = false
          }
        })
        processedGroup.push({
          winGroup: winGroup,
          movesFromWin: movesFromWin,
          openCenter: openCenter
        })
      })
      return processedGroup
    },
    moveCPU (board, cpu) {
      let moveChoice
      let unoccupiedSquares = []
      const compAnalysis = this.boardAnalysis(this.cpu, this.human)
      const humanAnalysis = this.boardAnalysis(this.human, this.cpu)

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const square = board[i][j]
          if (!square.occupied) {
            unoccupiedSquares.push(square)
          }
        }
      }
      compAnalysis.forEach((compInfo) => {
        // random move
        if (compInfo.movesFromWin > 1) {
          moveChoice = unoccupiedSquares[this.getRandom(unoccupiedSquares.length)]
        }
        // blocking move
        humanAnalysis.forEach((humanInfo) => {
          if (humanInfo.movesFromWin === 1 && compInfo.movesFromWin > 1) {
            moveChoice = humanInfo.winGroup.find(square => !square.occupied)
          }
        })
        // winning move
        if (compInfo.movesFromWin === 1) {
          moveChoice = compInfo.winGroup.find(square => !square.occupied)
        }
      })
      this.placeToken(board, moveChoice, cpu)
    },
    gameOverCheck (board, square, player) {
      const compAnalysis = this.boardAnalysis(this.cpu, this.human)
      const humanAnalysis = this.boardAnalysis(this.human, this.cpu)
      // check for human win
      compAnalysis.forEach((groupInfo) => {
        if (groupInfo.movesFromWin === 0) {
          this.victoryDisplay(square, player, 'COMPUTER')
        }
      })
      // check for computer win
      humanAnalysis.forEach((groupInfo) => {
        if (groupInfo.movesFromWin === 0) {
          this.victoryDisplay(square, player, 'HUMAN')
        }
      })
      // check draw
      if (this.count === 9 && !this.victory) {
        this.gameOver = true
        this.draw = true
        this.result = "CAT'S GAME"
      }
    },
    victoryDisplay (square, player, message) {
      this.gameOver = true
      this.victory = true
      this.result = message + ' WINS'
    },
    tagSquare (square, x, y) {
      if (x === y) {
        if (x === 1) {
          square.center = true
        }
        if (x === 2 || x === 0) {
          square.corner = true
        }
      } else if (Math.abs(x - y) === 2) {
        square.corner = true
      } else {
        square.side = true
      }
    },
    getRandom (num) {
      return Math.floor(Math.random() * Math.floor(num))
    }
  },
  created () {
    this.human = this.cross
    this.cpu = this.naught
    for (let i = 0; i < 3; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        const square = {
          x: i,
          y: j,
          square: true,
          occupied: false,
          token: '',
          cross: false,
          naught: false
        }
        this.tagSquare(square, square.x, square.y)
        row.push(square)
      }
      this.board.push(row)
    }
  }
}
</script>

<style scoped>
body, main {
  position: relative;
  overflow: hidden;
}
span {
  display: block;
  position: relative;
  margin-left: 125px;
}
h1 {
  display: block;
  position: relative;
  font-size: 30px;
}
h2 {
  color: gray;
  text-align: center;
  font-size: 90px;
  margin-top: -10px;
}
.game {
  margin: 40px 0 0 40px;
}
.board {
  align: center;
  margin-left: 17px;
}
.row {
  height: 105px;
  max-width: 320px;
}
.square {
  display: block;
  position: relative;
  vertical-align: top;
  width: 100px;
  height: 100px;
  border: 8px solid black;
  border-radius: 5px;
  margin: 3px;
  color: black;
  cursor: pointer;
  user-select: none;
}
.square.occupied {
  cursor: default;
}
</style>
