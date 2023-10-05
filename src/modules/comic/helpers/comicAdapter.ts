import { useIndexedDB } from '@/db/indexedDB'
import type { Comic, ResponseComicAdapter } from '../services'

export async function comicAdapter(payload: Comic): Promise<ResponseComicAdapter> {
  const indexedDB = await useIndexedDB()

  const adapter = {
    alt: payload.alt,
    img: payload.img,
    num: payload.num,
    title: payload.title,
    transcript: payload.transcript,
    stars: 0
  }

  if (indexedDB) {
    const response = await indexedDB.getOrUpdateComicByNum(payload.num)

    if (!response) {
      await indexedDB.addComic(adapter)
    }

    adapter.stars = response?.stars || 0
  }

  return adapter
}
