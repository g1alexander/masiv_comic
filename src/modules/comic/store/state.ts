import type { State } from './interfaces'
import { defineStore } from 'pinia'

export const useState = defineStore('comic.state', {
  state: (): State => ({
    isLoading: false
  })
})
