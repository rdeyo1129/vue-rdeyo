<template>
  <div class='board'>
    <div class='rank' v-for='rank in board'>
      <div
        @click="handleClick(square.file, square.rank, square.piece, square)"
        v-for='square in rank' :class="{ square: true, light: square.isLight }">
        <div :class="{ highlighted: square.highlighted }"></div>
        <a>{{ square.piece }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      board: [],
      selectedSquare: {}
    }
  },
  created () {
    for (let y = 8; y >= 1; y--) {
      const rank = []
      for (let x = 1; x <= 8; x++) {
        const square = {
          isLight: true,
          highlighted: false,
          occupied: false,
          piece: '',
          rank: y,
          file: x,
          name: String.fromCharCode(96 + x) + y.toString()
        }
        if ((y + x) % 2 === 0) {
          square.isLight = false
        }
        rank.push(square)
      }
      this.board.push(rank)
    }
    this.board[3][2].piece = 'K'
    this.board[1][5].piece = 'Q'
    this.board[4][2].piece = 'R'
    this.board[3][3].piece = 'B'
    this.board[4][1].piece = 'N'
    this.board[6][4].piece = 'P'
  },
  methods: {
    kingMoves (x, y, piece) {
      const availableSquares = []
      const occupiedSquares = []
      this.board.forEach(rank => {
        rank.map(square => {
          if (Math.abs(square.file - x) <= 1 &&
              Math.abs(square.rank - y) <= 1 &&
              !(square.file === x && square.rank === y)) {
            square.highlighted = true
            availableSquares.push(square)
          }
          if (!(square.piece === '')) {
            square.highlighted = false
            square.occupied = true
            occupiedSquares.push(square)
            availableSquares.pop(square)
          }
          // castling?
        })
      })
      return availableSquares
    },
    queenMoves (x, y, piece) {
      this.rookMoves(x, y, piece)
      this.bishopMoves(x, y, piece)
    },
    rookMoves (x, y, piece) {
      const availableSquares = []
      const occupiedSquares = []
      this.board.forEach(rank => {
        rank.map(square => {
          if ((square.file - x === 0 || square.rank - y === 0) &&
              !(square.file === x && square.rank === y)) {
            square.highlighted = true
            availableSquares.push(square)
          }
          if ((square.file - x === 0 || square.rank - y === 0) &&
              !(square.file === x && square.rank === y) && !(square.piece === '')) {
            square.highlighted = false
            square.occupied = true
            occupiedSquares.push(square)
            availableSquares.pop(square)
          }
        })
      })
      occupiedSquares.forEach(occupiedSquare => {
        availableSquares.forEach(availableSquare => {
          // how to remove availableSquare from availableSquares array
          if (Math.abs(x - availableSquare.file) > Math.abs(x - occupiedSquare.file) ||
              Math.abs(y - availableSquare.rank) > Math.abs(y - occupiedSquare.rank)) {
            if (availableSquare.file < x && occupiedSquare.file < x) {
              availableSquare.highlighted = false
              // availableSquares.splice(availableSquare.index, 1)
            }
            if (availableSquare.file > x && occupiedSquare.file > x) {
              availableSquare.highlighted = false
              // availableSquares.splice(availableSquare.index, 1)
            }
            if (availableSquare.rank < y && occupiedSquare.rank < y) {
              availableSquare.highlighted = false
              // availableSquares.splice(availableSquare.index, 1)
            }
            if (availableSquare.rank > y && occupiedSquare.rank > y) {
              availableSquare.highlighted = false
              // availableSquares.splice(availableSquare.index, 1)
            }
          }
        })
      })
      return availableSquares
    },
    bishopMoves (x, y, piece) {
      const availableSquares = []
      const occupiedSquares = []
      this.board.forEach(rank => {
        rank.map(square => {
          if (Math.abs(square.file - x) === Math.abs(square.rank - y) &&
              !(square.file === x && square.rank === y)) {
            square.highlighted = true
            availableSquares.push(square)
          }
          if (Math.abs(square.file - x) === Math.abs(square.rank - y) &&
              !(square.file === x && square.rank === y) && !(square.piece === '')) {
            square.highlighted = false
            square.occupied = true
            occupiedSquares.push(square)
            availableSquares.pop(square)
          }
        })
      })
      occupiedSquares.forEach(occupiedSquare => {
        availableSquares.forEach(availableSquare => {
          if (Math.abs(x - availableSquare.file) > Math.abs(x - occupiedSquare.file) ||
              Math.abs(y - availableSquare.rank) > Math.abs(y - occupiedSquare.rank)) {
            if (availableSquare.file > x && occupiedSquare.file > x &&
                availableSquare.rank > y && occupiedSquare.rank > y) {
              availableSquare.highlighted = false
            }
            if (availableSquare.file > x && occupiedSquare.file > x &&
                availableSquare.rank < y && occupiedSquare.rank < y) {
              availableSquare.highlighted = false
            }
            if (availableSquare.file < x && occupiedSquare.file < x &&
                availableSquare.rank > y && occupiedSquare.rank > y) {
              availableSquare.highlighted = false
            }
            if (availableSquare.file < x && occupiedSquare.file < x &&
                availableSquare.rank < y && occupiedSquare.rank < y) {
              availableSquare.highlighted = false
            }
          }
        })
      })
      return availableSquares
    },
    knightMoves (x, y, piece) {
      const availableSquares = []
      this.board.forEach(rank => {
        rank.map(square => {
          if ((Math.abs(square.file - x) === 2 && Math.abs(square.rank - y) === 1) ||
              (Math.abs(square.file - x) === 1 && Math.abs(square.rank - y) === 2)) {
            square.highlighted = true
            availableSquares.push(square)
          }
          if (!(square.piece === '')) {
            square.highlighted = false
          }
        })
      })
      return availableSquares
    },
    pawnMoves (x, y, piece) {
      const availableSquares = []
      this.board.forEach(rank => {
        rank.map(square => {
          // switch to negative for black
          if ((square.file - x === 0) && (square.rank - y === 2 || square.rank - y === 1) &&
              !(square.file === y && square.rank === x)) {
            square.highlighted = true
            availableSquares.push(square)
          }
          // attacking, (square.rank - y) === -1 for black
          if (Math.abs(square.file - x) === 1 && (square.rank - y) === 1) {
            square.highlighted = true
            availableSquares.push(square)
          }
          if (!(square.piece === '')) {
            square.highlighted = false
          }
          // en passant?
          // promotion?
        })
      })
      return availableSquares
    },
    showMoves (x, y, piece, clickedSquare) {
      this.hideMoves()
      this.selectedPiece = clickedSquare
      switch (piece) {
        case 'K':
          this.kingMoves(x, y, piece)
          break
        case 'Q':
          this.queenMoves(x, y, piece)
          break
        case 'R':
          this.rookMoves(x, y, piece)
          break
        case 'B':
          this.bishopMoves(x, y, piece)
          break
        case 'N':
          this.knightMoves(x, y, piece)
          break
        case 'P':
          this.pawnMoves(x, y, piece)
          break
      }
    },
    hideMoves () {
      this.board.forEach(rank => {
        rank.forEach(square => {
          square.highlighted = false
        })
      })
    },
    movePiece (x, y, piece, clickedSquare) {
      clickedSquare.piece = this.selectedPiece.piece
      clickedSquare = this.selectedPiece
      this.selectedPiece.piece = ''
      this.selectedPiece = {}
      this.hideMoves()
    },
    handleClick (x, y, piece, clickedSquare) {
      if (clickedSquare.highlighted) {
        this.movePiece(x, y, piece, clickedSquare)
      }
      if (!(piece === '')) {
        this.showMoves(x, y, piece, clickedSquare)
      }
      // log annotation
      // capturing
    }
  }
}
</script>

<style scoped>
.board {
  margin: 5% 0 0 30%;
}
.square {
  vertical-align: top;
  color: #fff;
  background: #333;
  display: inline-block;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.square.light {
  background: #999;
}
.highlighted {
  float: left;
  position: absolute;
  background-color: #df0;
  margin: 20px 0 0 20px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
a {
  postion: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  font-size: 50px;
}
</style>
