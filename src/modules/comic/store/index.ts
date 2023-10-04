import { defineStore } from 'pinia'
import { getExtractStore } from '@/shared/helpers/getExtractStore'
import { useState } from './state'
import { useGetters } from './getters'
import { useActions } from './actions'

export const useComicStore = defineStore('comic', () => ({
  ...getExtractStore(useState()),
  ...getExtractStore(useGetters()),
  ...getExtractStore(useActions())
}))
