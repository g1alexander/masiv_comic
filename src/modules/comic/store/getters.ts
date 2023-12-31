import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useState } from './state'

export const useGetters = defineStore('comic.getters', () => {
  const state = useState()

  const getIsLoading = computed(() => state.isLoading)

  const getComic = computed(() => state.comic)

  const getPage = computed(() => state.page)

  return {
    getIsLoading,
    getComic,
    getPage
  }
})
