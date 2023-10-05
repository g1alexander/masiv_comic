import type { ResponseComicAdapter } from '@/modules/comic/services'

export interface IndexedDB {
  getOrUpdateComicByNum: (
    num: number,
    payload?: ResponseComicAdapter
  ) => Promise<ResponseComicAdapter | null>
  addComic: (comic: ResponseComicAdapter) => Promise<number>
}

export async function useIndexedDB(): Promise<IndexedDB | undefined> {
  const indexedDB = window.indexedDB

  if (!indexedDB) {
    console.log('IndexedDB could not be found in this browser.')
    return
  }

  const openDB = (): Promise<IDBDatabase | null> => {
    return new Promise((resolve, reject) => {
      const dbName = `comicsDB`
      const request = indexedDB.open(dbName, 1)
      let db: IDBDatabase

      request.onupgradeneeded = (event) => {
        db = (event.target as IDBOpenDBRequest)?.result
        const comicStore = db.createObjectStore('comic', { keyPath: 'num' })

        comicStore.createIndex('title', 'title', { unique: false })
      }

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result)
      }

      request.onerror = () => {
        reject(null)
      }
    })
  }

  const db = await openDB()

  const addComic = (comic: ResponseComicAdapter): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(400)
        return
      }

      const transaction = db.transaction(['comic'], 'readwrite')
      const objectStore = transaction.objectStore('comic')
      const request = objectStore.add(comic)

      request.onsuccess = () => {
        resolve(200)
      }

      request.onerror = () => {
        reject(400)
      }
    })
  }

  const getOrUpdateComicByNum = (
    num: number,
    payload?: ResponseComicAdapter
  ): Promise<ResponseComicAdapter | null> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(null)
        return
      }
      const transaction = db.transaction(['comic'], 'readwrite')
      const objectStore = transaction.objectStore('comic')
      const request = objectStore.get(num)

      if (payload) {
        const updateComic = objectStore.put({ ...payload })

        updateComic.onsuccess = () => resolve(payload)
        updateComic.onerror = () => reject(null)

        return
      }

      request.onsuccess = (event) => {
        const comic = (event.target as IDBRequest).result as ResponseComicAdapter
        resolve(comic)
      }

      request.onerror = () => {
        reject(null)
      }
    })
  }

  return {
    getOrUpdateComicByNum,
    addComic
  }
}
