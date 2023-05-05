import { defineStore } from 'pinia'
import actions from './actions'

export const useuserStore = defineStore('users', {
  state: () => ({
    users: [],
    user: {}
  }),
  actions
})