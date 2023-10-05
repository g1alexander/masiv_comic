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

      request.onupgradeneeded = function (event) {
        db = (event.target as IDBOpenDBRequest)?.result
        const comicStore = db.createObjectStore('comic', { keyPath: 'num' })

        comicStore.createIndex('title', 'title', { unique: false })
      }

      request.onsuccess = function (event) {
        resolve((event.target as IDBOpenDBRequest).result)
      }

      request.onerror = function () {
        reject(null)
      }
    })
  }

  const db = await openDB()

  function addComic(comic: ResponseComicAdapter): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(400)
        return
      }

      const transaction = db.transaction(['comic'], 'readwrite')
      const objectStore = transaction.objectStore('comic')
      const request = objectStore.add(comic)

      request.onsuccess = function () {
        resolve(200)
      }

      request.onerror = function () {
        reject(400)
      }
    })
  }

  function getOrUpdateComicByNum(
    num: number,
    payload?: ResponseComicAdapter
  ): Promise<ResponseComicAdapter | null> {
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

      request.onsuccess = function (event) {
        const comic = (event.target as IDBRequest).result as ResponseComicAdapter
        resolve(comic)
      }

      request.onerror = function () {
        reject(null)
      }
    })
  }

  return {
    getOrUpdateComicByNum,
    addComic
  }
}
