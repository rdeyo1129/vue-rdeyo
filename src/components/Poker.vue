<template>
  <div id="app">
    <div class="compCredits"><span>CREDITS {{ this.compCredits }}</span></div>
    <div class="pot"><span>POT {{ this.pot }}</span></div>
    <div class="credits"><span>CREDITS {{ this.credits }}</span></div>
    <div class="button player" v-if="button === 'player'"></div>
    <div class="button comp1" v-if="button === 'comp1'"></div>
    <div class="message">{{ this.message }}</div>
    <GameTable
      :phase='this.phase'
      :playerHand='this.playerHand'
      :compHand='this.compHand'
      :shared='this.shared'>
    </GameTable>
    <!-- <v-btn @click="getHandStrength(exampleHand)">EVAL</v-btn> -->
    <div class="options">
      <div v-if="phase === 0">
        <v-btn @click="dealHand()">DEAL</v-btn>
      </div>
      <!-- PRE-FLOP BETTING round 1 -->
      <div v-else-if="phase === 1">
        <div v-if="checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(3, 'check', 0)">CHECK</v-btn>
          <v-btn @click="handleTurn(3, 'bet', bet)">BET</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(5, 'all in', 0)">ALL IN</v-btn>
        </div>
        <div v-if="!checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(3, 'call', compBet)">CALL {{ this.compBet }}</v-btn>
          <v-btn @click="handleTurn(3, 'raise', bet)">RAISE</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(5, 'all in', 0)">ALL IN</v-btn>
        </div>
      </div>
      <!-- FLOP BETTING round 2 -->
      <div v-else-if="phase === 2">
        <div v-if="checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(1, 'check', 0)">CHECK</v-btn>
          <v-btn @click="handleTurn(1, 'bet', bet)">BET</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(2, 'all in', 0)">ALL IN</v-btn>
        </div>
        <div v-if="!checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(1, 'call', compBet)">CALL {{ this.compBet }}</v-btn>
          <v-btn @click="handleTurn(1, 'raise', bet)">RAISE</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(2, 'all in', 0)">ALL IN</v-btn>
        </div>
      </div>
      <!-- TURN BETTING round 3 -->
      <div v-else-if="phase === 3">
        <div v-if="checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(1, 'check', 0)">CHECK</v-btn>
          <v-btn @click="handleTurn(1, 'bet', bet)">BET</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(1, 'all in', 0)">ALL IN</v-btn>
        </div>
        <div v-if="!checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(1, 'call', compBet)">CALL {{ this.compBet }}</v-btn>
          <v-btn @click="handleTurn(1, 'raise', bet)">RAISE</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(1, 'all in', 0)">ALL IN</v-btn>
        </div>
      </div>
      <!-- RIVER BETTING final round -->
      <div v-else-if="phase === 4">
        <div v-if="checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(0, 'check', 0)">CHECK</v-btn>
          <v-btn @click="handleTurn(0, 'bet', bet)">BET</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(0, 'all in', 0)">ALL IN</v-btn>
        </div>
        <div v-if="!checkBet">
          <v-btn @click="fold()">FOLD</v-btn>
          <v-btn @click="handleTurn(0, 'call', compBet)">CALL {{ this.compBet }}</v-btn>
          <v-btn @click="handleTurn(0, 'raise', bet)">RAISE</v-btn>
          <vue-numeric-input v-model="bet" :min="0" :max="maxBet" :step="10"></vue-numeric-input>
          <v-btn @click="handleTurn(0, 'all in', 0)">ALL IN</v-btn>
        </div>
      </div>
      <!-- SHOWDOWN + PAYOUT + NEXT HAND -->
      <div v-else-if="phase === 5">
        <v-btn @click="handleRound()">NEXT ROUND</v-btn>
      </div>
      <!-- GAMEOVER + BUY IN -->
      <div v-else-if="phase === 6">
        <v-btn @click="restart()">NEW GAME</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import DeckView from '@/components/DeckView'
import GameTable from '@/components/GameTable'

export default {
  name: 'app',
  components: { DeckView, GameTable },
  data () {
    return {
      deck: [],
      playerHand: [],
      playerEval: [],
      compHand: [],
      compEval: [],
      shared: [],
      discard: [],
      phase: 0,
      button: 'player',
      credits: 1000,
      compCredits: 1000,
      bet: 0,
      compBet: 0,
      maxBet: 0,
      pot: 0,
      compTurn: true,
      checkBet: false,
      winner: '',
      gameOver: false,
      message: 'Welcome to poker. Bankrupt the computer.',
      rankMessage: '',
      exampleHand: [
        {
          isRed: false,
          suit: '♥',
          value: 5,
          display: '5'
        },
        {
          isRed: false,
          suit: '♠',
          value: 7,
          display: '7'
        },
        {
          isRed: false,
          suit: '♠',
          value: 9,
          display: '9'
        },
        {
          isRed: false,
          suit: '♠',
          value: 5,
          display: '5'
        },
        {
          isRed: true,
          suit: '♥',
          value: 7,
          display: '7'
        },
        {
          isRed: false,
          suit: '♠',
          value: 9,
          display: '9'
        },
        {
          isRed: false,
          suit: '♠',
          value: 10,
          display: '10'
        }
      ]
    }
  },
  methods: {
    initilizeSuit (suit, isRed) {
      for (let i = 2; i <= 14; i++) {
        const card = {
          isRed: isRed,
          suit: suit,
          value: i,
          display: '' + i
        }
        switch (i) {
          case 11: card.display = 'J'; break
          case 12: card.display = 'Q'; break
          case 13: card.display = 'K'; break
          case 14: card.display = 'A'; break
        }
        this.deck.push(card)
      }
    },
    initilizeDeck () {
      this.initilizeSuit('♠', false)
      this.initilizeSuit('♣', false)
      this.initilizeSuit('♥', true)
      this.initilizeSuit('♦', true)
      this.shuffle(this.deck)
    },
    shuffle (deck) {
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
      }
    },
    handleCredits () {
      if (this.winner === 'player') {
        this.credits += this.pot
      }
      if (this.winner === 'computer') {
        this.compCredits += this.pot
      }
      if (this.winner === 'tie') {
        this.credits += this.pot / 2
        this.compCredits += this.pot / 2
      }
      this.pot = 0
      if (this.credits <= 0) {
        this.gameOver = true
        this.message = 'Game over, you lose'
        this.phase = 6
      }
      if (this.compCredits <= 0) {
        this.gameOver = true
        this.message = 'You win!'
        this.phase = 6
      }
    },
    restart () {
      this.credits = 1000
      this.compCredits = 1000
      this.gameOver = false
      this.winner = ''
      this.message = ''
      this.phase = 0
    },
    handleRound () {
      // HANDLE CARDS
      this.playerEval = []
      this.compEval = []
      for (let i = 0; i < 2; i++) {
        this.deck.push(this.playerHand.pop())
        this.deck.push(this.compHand.pop())
      }
      for (let i = this.shared.length; i > 0; i--) {
        this.deck.push(this.shared.pop())
      }
      for (let i = this.discard.length; i > 0; i--) {
        this.deck.push(this.discard.pop())
      }
      this.shuffle(this.deck)
      // HANDLE PAYOUT
      this.handleCredits()
      // HANDLE OTHER STUFF
      if (this.phase < 6) {
        this.winner = ''
        this.message = ''
        this.phase = 0
        // loop and reset button for players.length
        if (this.button === 'player') {
          this.button = 'comp1'
          this.compTurn = false
          this.checkBet = true
        } else {
          this.button = 'player'
          this.compTurn = true
          this.checkBet = false
        }
      }
    },
    handleTurn (cards, move, wager) {
      this.maxBet = Math.min(this.credits, this.compCredits)
      if (this.compTurn) {
        if (this.phase < 4) {
          this.compDecision(cards)
          this.checkBet = false
          this.compTurn = false
        } else {
          this.phase++
          this.showDown()
        }
      }
      if (!this.compTurn) {
        if (move === 'check') {
          this.checkBet = false
          this.compTurn = true
          this.compDecision(cards, move)
        }
        if (move === 'all in') {
          console.log('test')
          this.bet = this.maxBet
          this.pot += this.maxBet
          this.credits -= this.bet
          this.compTurn = true
          this.compDecision(cards, move)
        }
        if (wager > 0 && wager <= this.maxBet) {
          if (wager === this.maxBet) {
            console.log('test')
            this.bet = this.maxBet
            this.pot += this.maxBet
            this.credits -= this.bet
            this.compTurn = true
            this.compDecision(cards, move)
          } else {
            if (move === 'bet') {
              this.credits -= wager
              this.pot += wager
              this.compTurn = true
              this.compDecision(cards, move)
            }
            if (move === 'raise') {
              this.credits -= this.compBet + wager
              this.pot += this.compBet + wager
              this.bet = this.compBet + wager
              this.compTurn = true
              this.compDecision(cards, move)
            }
            if (move === 'call') {
              this.credits -= wager
              this.pot += wager
              if (this.phase < 4) {
                this.dealSharedCards(cards)
                this.phase++
                if (this.button === 'player') {
                  this.compTurn = true
                  this.compDecision(cards, move)
                }
                if (this.button === 'comp1') {
                  this.checkBet = true
                }
              } else {
                this.phase++
                this.showDown()
              }
            }
          }
        }
      }
    },
    updateMaxBet () {
      if (this.credits > this.compCredits) {
        this.maxBet = this.compCredits
      } else {
        this.maxBet = this.credits
      }
    },
    compDecision (cards, playerMove) {
      // run poker mind function through this function
      if (playerMove === 'bet') {
        this.compCredits -= this.bet
        this.updateMaxBet()
        this.pot += this.bet
        this.message = 'Computer calls ' + this.bet
        this.bet = 0
        this.phase++
        if (this.phase < 4) {
          this.dealSharedCards(cards)
          this.compTurn = false
        } else {
          this.showDown()
        }
      }
      if (playerMove === 'raise') {
        this.compCredits -= this.bet
        this.pot += this.bet
        this.message = 'Computer calls ' + this.bet
        this.bet = 0
        if (this.phase < 4) {
          this.dealSharedCards(cards)
          this.phase++
          if (this.button === 'player') {
            console.log(this.maxBet)
            this.compBet = Math.floor(10 + this.pot / 2)
            this.compCredits -= this.compBet
            this.pot += this.compBet
            this.message += ' Computer bets ' + this.compBet
            this.compTurn = false
            this.checkBet = false
          }
          if (this.button === 'comp1') {
            this.compTurn = false
            this.checkBet = true
          }
        } else {
          this.phase++
          this.compTurn = false
          this.showDown()
        }
      }
      if (playerMove === 'all in') {
        this.message = 'Computer calls ' + this.bet
        this.compCredits -= this.bet
        this.pot += this.bet
        this.bet = 0
        this.dealSharedCards(cards)
        this.phase = 5
        this.compTurn = false
        this.showDown()
      }
      if (this.compTurn && !this.checkBet) {
        // BET
        this.compBet = Math.floor(10 + this.pot / 2)
        this.compCredits -= this.compBet
        this.pot += this.compBet
        this.message = 'Computer bets ' + this.compBet
        this.compTurn = false
        this.checkBet = false
      }
    },
    dealHand () {
      for (let i = 0; i < 2; i++) {
        this.playerHand.push(this.deck.pop())
        this.playerEval.push(this.playerHand[i])
        this.compHand.push(this.deck.pop())
        this.compEval.push(this.compHand[i])
      }
      this.message = ''
      this.phase++
      this.handleTurn()
    },
    dealSharedCards (x) {
      // burn before flop, turn and river
      this.discard.push(this.deck.pop())
      for (let i = 0; i < x; i++) {
        this.shared.push(this.deck.pop())
        if (this.phase === 1) {
          this.playerEval.push(this.shared[i])
          this.compEval.push(this.shared[i])
        }
        if (this.phase > 1) {
          this.playerEval.push(this.shared[this.phase + 1])
          this.compEval.push(this.shared[this.phase + 1])
        }
      }
    },
    fold () {
      this.winner = 'computer'
      this.handleRound()
    },
    tidyHand (hand) {
      const handEval = []

      hand.forEach(card => {
        handEval.push(card.value)
      })
      // HIGHEST CARD AT INDEX 0
      handEval.sort((a, b) => b - a)
      // handEval.splice(5, 2)
      // console.log(handEval)
      return handEval
    },
    compareCards (hand) {
      const comparisons = []

      hand.forEach(constant => {
        for (let i = hand.indexOf(constant) + 1; i < hand.length; i++) {
          comparisons.push([constant, hand[i]])
        }
      })
      return comparisons
    },
    matchFinder (hand) {
      const info = {strength: 0, message: '', matches: [], pairEval: []}
      const comparisons = this.compareCards(hand)

      comparisons.forEach((comparison) => {
        if (comparison[0].value === comparison[1].value) {
          info.matches.push(comparison[0])
        }
      })
      // reduce triple pair to top two pair
      if (info.matches.length === 3 && info.matches[0] !== info.matches[1]) {
        const matchValues = []

        info.matches.forEach(constant => {
          matchValues.push(constant.value)
        })
        info.matches.forEach(constant => {
          if (constant.value === Math.min(...matchValues)) {
            info.matches.splice(info.matches.indexOf(constant), 1)
          }
        })
      }
      console.log(info.matches)
      switch (info.matches.length) {
        case 1:
          info.strength = 1
          info.message = 'one pair: ' + info.matches[0].display
          break
        case 2:
          info.strength = 2
          info.message = 'two pair: ' + info.matches[0].display + ' ' + info.matches[1].display
          break
        case 3:
          info.strength = 3
          info.message = 'trips: ' + info.matches[0].display
          break
        case 4:
          info.strength = 6
          info.message = 'full house: ' + this.fullHouse(info.matches, 'high') + 's over ' + this.fullHouse(info.matches, 'low') + 's'
          break
        case 6:
          info.strength = 7
          info.message = 'quads: ' + info.matches[0].display
          break
      }
      return info
    },
    fullHouse (matches, freq) {
      let counts = {}

      for (let i = 0; i < matches.length; i++) {
        let num = matches[i].display
        counts[num] = counts[num] ? counts[num] + 1 : 1
      }
      if (freq === 'low') {
        if (Object.keys(counts)[0] > Object.keys(counts)[1]) {
          return Object.keys(counts)[0]
        } else {
          return Object.keys(counts)[1]
        }
      }
      if (freq === 'high') {
        if (Object.keys(counts)[0] < Object.keys(counts)[1]) {
          return Object.keys(counts)[0]
        } else {
          return Object.keys(counts)[1]
        }
      }
    },
    straightFinder (hand) {
      const info = {strength: 0, message: '', count: 0, royal: false, handEval: []}
      const possibleStraights = [
        [10, 11, 12, 13, 14],
        [9, 10, 11, 12, 13],
        [8, 9, 10, 11, 12],
        [7, 8, 9, 10, 11],
        [6, 7, 8, 9, 10],
        [5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8],
        [3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5]
      ]

      hand.forEach(card => {
        info.handEval.push(card)
        if (card.value === 14) {
          info.handEval.push({value: 1, suit: card.suit, display: 'A'})
        }
      })
      info.handEval.sort((a, b) => (a.value > b.value) ? 1 : -1)
      info.handEval.forEach(card => {
        if (info.handEval.indexOf(card) < info.handEval.length - 1 &&
            (info.handEval[info.handEval.indexOf(card) + 1].value - card.value > 1)) {
          if (info.handEval.indexOf(card) === 0) {
            info.handEval.splice(0, 1)
          }
          if (info.handEval.indexOf(card) === 1) {
            info.handEval.splice(0, 2)
          }
          if (info.handEval.indexOf(card) === 2) {
            info.handEval.splice(0, 3)
          }
          // if (info.handEval.indexOf(card) === 3) {
          //   info.handEval.splice(0, 4)
          // }
          // if ((info.handEval.indexOf(card) + 1) === 4) {
          //   info.handEval.splice(4, 4)
          // }
          if ((info.handEval.indexOf(card) + 1) === 5) {
            info.handEval.splice(5, 3)
          }
          if ((info.handEval.indexOf(card) + 1) === 6) {
            info.handEval.splice(6, 2)
          }
          if ((info.handEval.indexOf(card) + 1) === 7) {
            info.handEval.splice(7, 1)
          }
        }
        if (info.handEval.indexOf(card) > 0 &&
            (card.value - info.handEval[info.handEval.indexOf(card).value - 1] > 1)) {
          if (info.handEval.indexOf(card) - 1 === 0) {
            info.handEval.splice(0, 1)
          }
          if (info.handEval.indexOf(card) - 1 === 1) {
            info.handEval.splice(0, 2)
          }
          if (info.handEval.indexOf(card) - 1 === 2) {
            info.handEval.splice(0, 3)
          }
          // if (info.handEval.indexOf(card) - 1 === 3) {
          //   info.handEval.splice(0, 4)
          // }
          // if (info.handEval.indexOf(card) === 4) {
          //   info.handEval.splice(4, 4)
          // }
          if (info.handEval.indexOf(card) === 5) {
            info.handEval.splice(5, 3)
          }
          if (info.handEval.indexOf(card) === 6) {
            info.handEval.splice(6, 2)
          }
          if (info.handEval.indexOf(card) === 7) {
            info.handEval.splice(7, 1)
          }
        }
        if (info.handEval.indexOf(card) < info.handEval.length - 1 &&
            (card.value === info.handEval[info.handEval.indexOf(card) + 1].value)) {
          info.handEval.splice(info.handEval.indexOf(card), 1)
        }
        console.log(card.value)
      })
      // clean 6 or 7 card straight
      if (info.handEval.length === 6) {
        info.handEval.splice(0, 1)
      }
      if (info.handEval.length === 7) {
        info.handEval.splice(0, 2)
      }
      // compare with templates
      for (let i = 0; i < info.handEval.length; i++) {
        for (let j = 0; j < possibleStraights.length; j++) {
          for (let k = 0; k < possibleStraights[j].length; k++) {
            if (info.handEval[k] === possibleStraights[j][k] && info.handEval.length === 5) {
              info.count++
              if (info.count === 5) {
                if (j === 0) {
                  info.royal = true
                }
                info.strength = 4
                info.message = 'straight: ' + info.handEval
                // console.log(info.handEval)
                // console.log('straight')
                return info
              }
            } else {
              info.count = 0
              continue
            }
          }
        }
      }
      return info
    },
    flushFinder (hand) {
      const royalStraight = this.straightFinder(hand)
      const info = {handEval: [], strength: 0, message: '', spades: 0, clubs: 0, diamonds: 0, hearts: 0}

      hand.forEach(card => {
        switch (card.suit) {
          case '♠':
            info.spades++
            if (info.spades === 5) {
              console.log(info.handEval)
              info.handEval = hand.filter(card => card.suit === '♠')
              if (royalStraight.count === 5) {
                if (royalStraight.royal) {
                  info.strength = 9
                  info.message = 'ROYAL FLUSH'
                } else {
                  info.strength = 8
                  info.message = 'straight flush'
                }
              } else {
                info.strength = 5
                info.message = 'spade flush'
              }
            }
            break
          case '♣':
            info.clubs++
            if (info.clubs === 5) {
              info.handEval = hand.filter(card => card.suit === '♣')
              if (royalStraight.count === 5) {
                if (royalStraight.royal) {
                  info.strength = 9
                  info.message = 'ROYAL FLUSH'
                } else {
                  info.strength = 8
                  info.message = 'straight flush'
                }
              } else {
                info.strength = 5
                info.message = 'club flush'
              }
            }
            break
          case '♦':
            info.diamonds++
            if (info.diamonds === 5) {
              info.handEval = hand.filter(card => card.suit === '♦')
              if (royalStraight.count === 5) {
                if (royalStraight.royal) {
                  info.strength = 9
                  info.message = 'ROYAL FLUSH'
                } else {
                  info.strength = 8
                  info.message = 'straight flush'
                }
              } else {
                info.strength = 5
                info.message = 'diamond flush'
              }
            }
            break
          case '♥':
            info.hearts++
            if (info.hearts === 5) {
              info.handEval = hand.filter(card => card.suit === '♥')
              if (royalStraight.count === 5) {
                if (royalStraight.royal) {
                  info.strength = 9
                  info.message = 'ROYAL FLUSH'
                } else {
                  info.strength = 8
                  info.message = 'straight flush'
                }
              } else {
                info.strength = 5
                info.message = 'heart flush'
              }
            }
            break
        }
      })
      // info.handEval.forEach(card => {
      //   info.handEval.push(card.value)
      // })
      // HIGHEST CARD AT INDEX 0
      info.handEval.sort((a, b) => b - a)
      console.log(info.handEval)
      return info
    },
    getHandStrength (hand) {
      const matches = this.matchFinder(hand)
      const straights = this.straightFinder(hand)
      const flushes = this.flushFinder(hand)

      // straights will have ranks 8 and 9
      if (matches.strength > flushes.strength) {
        if (matches.strength > straights.strength) {
          return matches
        } else {
          return straights
        }
      } else if (flushes.strength > matches.strength) {
        return flushes
      } else {
        return matches
      }
    },
    showDown () {
      const playerStrength = this.getHandStrength(this.playerEval)
      const computerStrength = this.getHandStrength(this.compEval)

      console.log(playerStrength.strength)
      console.log(computerStrength.strength)

      // HANDLE SAME RANKS
      if (playerStrength.strength === computerStrength.strength) {
        this.tieBreakers(this.playerEval, this.compEval, playerStrength.strength)
      }
      // HANDLE DIFFERENT RANKS
      if (playerStrength.strength > computerStrength.strength) {
        this.winner = 'player'
        this.message = 'Player wins with ' + playerStrength.message
      }
      if (computerStrength.strength > playerStrength.strength) {
        this.winner = 'computer'
        this.message = 'Computer wins with ' + computerStrength.message
      }
    },
    tieBreakers (playerHand, compHand, rank) {
      const playerEval0 = this.tidyHand(playerHand)
      const compEval0 = this.tidyHand(compHand)
      const playerEval123 = this.matchFinder(playerHand).matches
      const compEval123 = this.matchFinder(compHand).matches

      if (rank === 0) {
        for (let i = 0; i < 5; i++) {
          if (playerEval0[i] === compEval0[i]) {
            continue
          }
          if (playerEval0[i] > compEval0[i]) {
            this.winner = 'player'
            this.message = 'Player wins with high card: ' + playerEval0[i]
            break
          }
          if (compEval0[i] > playerEval0[i]) {
            this.winner = 'computer'
            this.message = 'Computer wins with high card: ' + compEval0[i]
            break
          }
        }
      }
      if (rank === 1) {
        if (playerEval123[0].value === compEval123[0].value) {
          for (let i = 0; i < 3; i++) {
            if (playerEval0[i] === compEval0[i]) {
              if (i === 2) {
                this.winner = 'tie'
                this.message = 'Tie game with one pair and kicker'
              } else {
                continue
              }
            }
            if (playerEval0[i] > compEval0[i]) {
              this.winner = 'player'
              this.message = 'Player wins one pair with high kicker: ' + playerEval0[i]
              break
            }
            if (compEval0[i] > playerEval0[i]) {
              this.winner = 'computer'
              this.message = 'Computer wins one pair with high kicker: ' + compEval0[i]
              break
            }
          }
        } else if (playerEval123[0].value > compEval123[0].value) {
          this.winner = 'player'
          this.message = 'Player wins with ' + this.matchFinder(playerHand).message
        } else {
          this.winner = 'computer'
          this.message = 'Computer wins with ' + this.matchFinder(compHand).message
        }
      }
      if (rank === 2) {
        for (let i = 0; i < playerEval123.length; i++) {
          if (playerEval123[i].value === compEval123[i].value) {
            if (playerEval0[i] === compEval0[i]) {
              this.winner = 'tie'
              this.message = 'Tie game with two pair and kicker'
              break
            }
            if (playerEval0[i] > compEval0[i]) {
              this.winner = 'player'
              this.message = 'Player wins two pair with high kicker: ' + playerEval0[i]
              break
            }
            if (compEval0[i] > playerEval0[i]) {
              this.winner = 'computer'
              this.message = 'Computer wins two pair with high kicker: ' + compEval0[i]
              break
            }
          } else if (playerEval123[i].value > compEval123[i].value) {
            this.winner = 'player'
            this.message = 'Player wins with ' + this.matchFinder(playerHand).message
            break
          } else {
            this.winner = 'computer'
            this.message = 'Computer wins with ' + this.matchFinder(compHand).message
            break
          }
        }
      }
      if (rank === 3) {
        if (playerEval123[0].value === compEval123[0].value) {
          for (let i = 0; i < 2; i++) {
            if (playerEval0[i] === compEval0[i]) {
              if (i === 1) {
                this.winner = 'tie'
                this.message = 'Tie game with trips and kicker'
              } else {
                continue
              }
            }
            if (playerEval0[i] > compEval0[i]) {
              this.winner = 'player'
              this.message = 'Player wins trips with high kicker: ' + playerEval0[i]
              break
            }
            if (compEval0[i] > playerEval0[i]) {
              this.winner = 'computer'
              this.message = 'Computer wins trips with high kicker: ' + compEval0[i]
              break
            }
          }
        } else if (playerEval123[0].value > compEval123[0].value) {
          this.winner = 'player'
          this.message = 'Player wins with ' + this.matchFinder(playerHand).message
        } else {
          this.winner = 'computer'
          this.message = 'Computer wins with ' + this.matchFinder(compHand).message
        }
      }
      if (rank === 4) {
        console.log('straight tie')
        this.winner = 'tie'
        this.message = 'Tie game with straights (beta mode)'
      }
      if (rank === 5) {
        console.log('flush tie')
        const playerEval5 = this.flushFinder(playerHand)
        const compEval5 = this.flushFinder(compHand)
        const playerEval6 = this.tidyHand(playerEval5.handEval)
        const compEval6 = this.tidyHand(compEval5.handEval)

        for (let i = 0; i < 5; i++) {
          if (playerEval6[i] === compEval6[i]) {
            continue
          }
          if (playerEval6[i] > compEval6[i]) {
            this.winner = 'player'
            this.message = 'Player wins with high card: ' + playerEval0[i]
            break
          }
          if (compEval6[i] > playerEval6[i]) {
            this.winner = 'computer'
            this.message = 'Computer wins with high card: ' + compEval0[i]
            break
          }
        }
      }
    }
  },
  created () {
    this.initilizeDeck()
  }
}
</script>

<style scoped>
body {
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.options {
  display: inline-block;
  postion: absolute;
  margin: 20px 0 0 5px;
}
.message {
  float: left;
  position: absolute;
  height: 50px;
  width: 150px;
  background: white;
  border: 5px solid black;
  border-radius: 10px;
  padding: 3px 5px 0 5px;
  margin: 170px 0 0 5px;
  font-size: 12px;
  color: black;
}
.pot {
  float: left;
  position: absolute;
  margin: 220px 0 0 170px;
}
.credits {
  float: left;
  position: absolute;
  margin: 290px 0 0 250px;
}
.compCredits {
  float: left;
  position: absolute;
  margin: 80px 0 0 270px;
}
.button {
  float: left;
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid black;
  border-radius: 50px;
  background-color: white;
}
.player {
  margin: 290px 0 0 130px;
}
.comp1 {
  margin: 80px 0 0 150px;
}
</style>
