import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MainSite from '@/components/MainSite'
import Chess from '@/components/Chess'
import Poker from '@/components/Poker'
import TicTacToe from '@/components/TicTacToe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/old',
      name: 'MainSite',
      component: MainSite
    },
    {
      path: '/chess',
      name: 'Chess',
      component: Chess
    },
    {
      path: '/poker',
      name: 'Poker',
      component: Poker
    },
    {
      path: '/tictactoe',
      name: 'TicTacToe',
      component: TicTacToe
    }
  ]
})
