import { defineStore } from 'pinia'
import { useState } from './state'
import { comic } from '../services'

export const useActions = defineStore('comic.actions', () => {
  const state = useState()

  const setComic = async (page: number): Promise<void> => {
    state.isLoading = true

    const response = await comic(page)

    state.comic = { ...state.comic, ...response }

    state.isLoading = false
  }

  // Note you are free to define as many internal functions as you want.
  // You only expose the functions that are returned.
  return { setComic }
})
