import { onMounted, watch } from 'vue'
import { useComicStore } from '../store'

export function useComic() {
  const comic = useComicStore()

  onMounted(async () => {
    await comic.setComic()
  })

  watch(
    () => comic.getPage,
    async () => await comic.setComic()
  )

  const setStar = (star: number) => comic.setStar(star)

  const starClass = (star: number) => {
    return {
      'star-active': star <= comic.getComic.stars,
      'star-disabled': star > comic.getComic.stars
    }
  }
  return {
    comic,
    setStar,
    starClass
  }
}
