import { defineStore } from 'pinia'
import { useState } from './state'
import { comic } from '../services'
import { useIndexedDB } from '@/db/indexedDB'

export const useActions = defineStore('comic.actions', () => {
  const state = useState()

  const setComic = async (): Promise<void> => {
    state.isLoading = true

    const response = await comic(state.page)

    state.comic = { ...state.comic, ...response }

    state.isLoading = false
  }

  const setPage = (payload: number) => {
    if (payload < 1) {
      state.page = 1

      return
    }
    localStorage.setItem('page', JSON.stringify(payload))
    state.page = payload
  }

  const setStar = async (payload: number) => {
    state.comic = { ...state.comic, stars: payload }

    const indexedDB = await useIndexedDB()

    if (indexedDB) {
      await indexedDB.getOrUpdateComicByNum(state.comic.num, state.comic)
    }
  }

  // Note you are free to define as many internal functions as you want.
  // You only expose the functions that are returned.
  return { setComic, setPage, setStar }
})
