import { useIndexedDB, type IndexedDB } from '@/db/indexedDB'
import { comicData } from '@tu/mocks/data'
import { describe, beforeEach, test, expect } from 'vitest'
import fakeIndexedDB from 'fake-indexeddb'

describe('IndexedDB Functions', () => {
  let indexedDB: IndexedDB | undefined

  beforeEach(async () => {
    global.indexedDB = fakeIndexedDB
    indexedDB = await useIndexedDB()
  })

  test('should add a comic to the indexedDB', async () => {
    if (!indexedDB) return

    const response = await indexedDB.addComic(comicData)
    expect(response).toBe(200)
  })

  test('should get a comic from indexedDB by num', async () => {
    if (!indexedDB) return

    const num = 1
    const comic = await indexedDB.getOrUpdateComicByNum(num)
    expect(comic).toEqual(expect.objectContaining({ num: 1 }))
  })

  test('should update a comic in indexedDB', async () => {
    if (!indexedDB) return

    const num = 1
    const updatedComic = { ...comicData, title: 'Barrel - Part 2' }
    await indexedDB.getOrUpdateComicByNum(num, updatedComic)
    const comic = await indexedDB.getOrUpdateComicByNum(num)
    expect(comic).toEqual(expect.objectContaining({ title: 'Barrel - Part 2' }))
  })
})
