import { comicAdapter } from '@/modules/comic/helpers/comicAdapter'
import { comicAPIData, comicData } from '@tu/mocks/data'
import { describe, expect, test, vi } from 'vitest'

describe('service comic', () => {
  vi.mock('@/db/indexedDB')

  test('Should Fetch Comic Data from IndexedDB', async () => {
    const mock = {
      getOrUpdateComicByNum: vi.fn().mockReturnValue(Promise.resolve(comicData)),
      addComic: vi.fn()
    }
    const indexedDB = await import('@/db/indexedDB')
    indexedDB.useIndexedDB = vi.fn().mockReturnValue(Promise.resolve(mock))

    const adapterResult = await comicAdapter(comicAPIData)

    expect(mock.getOrUpdateComicByNum).toBeCalledWith(1)
    expect(mock.addComic).not.toBeCalled()
    expect(adapterResult).toEqual(comicData)
  })

  test('Should Add Comic Data to IndexedDB with Default Stars"', async () => {
    const mock = {
      getOrUpdateComicByNum: vi.fn().mockReturnValue(Promise.resolve(null)),
      addComic: vi.fn()
    }
    const indexedDB = await import('@/db/indexedDB')
    indexedDB.useIndexedDB = vi.fn().mockReturnValue(Promise.resolve(mock))

    const adapterResult = await comicAdapter(comicAPIData)

    expect(mock.addComic).toHaveBeenCalledWith({ ...comicData, stars: 0 })
    expect(adapterResult).toEqual({ ...comicData, stars: 0 })
  })
})
