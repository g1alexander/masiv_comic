import { useComicStore } from '@/modules/comic/store'
import { createTestingPinia } from '@pinia/testing'
import { comicData } from '@tu/mocks/data'
import { beforeEach, describe, expect, test, vi } from 'vitest'

beforeEach(() => {
  createTestingPinia({ stubActions: false, createSpy: vi.fn })
})

describe('tests store', async () => {
  vi.mock('@/db/indexedDB')
  vi.mock('@/modules/comic/services/comic', () => {
    const comic = vi.fn(() => comicData)

    return { comic }
  })
  test('actions - setComic', async () => {
    const comic = useComicStore()

    await comic.setComic()

    expect(comic.getComic).toEqual(comicData)
    expect(comic.getIsLoading).toBeFalsy()
  })
  test('actions - setPage', async () => {
    const comic = useComicStore()

    comic.setPage(2)

    expect(comic.getPage).toEqual(2)
  })

  test('actions - setStar', async () => {
    const mock = {
      getOrUpdateComicByNum: vi.fn().mockReturnValue(Promise.resolve(comicData)),
      addComic: vi.fn()
    }
    const indexedDB = await import('@/db/indexedDB')
    indexedDB.useIndexedDB = vi.fn().mockReturnValue(Promise.resolve(mock))

    const comic = useComicStore()

    await comic.setComic()

    await comic.setStar(4)

    expect(mock.getOrUpdateComicByNum).toBeCalledWith(
      1,
      expect.objectContaining({ ...comicData, stars: 4 })
    )
    expect(comic.getComic).toEqual({ ...comicData, stars: 4 })
  })

  test('state - init', () => {
    const comic = useComicStore()

    expect(comic.comic).toEqual({ alt: '', img: '', num: 0, stars: 0, title: '', transcript: '' })
    expect(comic.isLoading).toBeFalsy()
    expect(comic.page).toBe(1)
  })
})
