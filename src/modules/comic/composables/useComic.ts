import { onMounted, watch } from 'vue'
import { useComicStore } from '../store'
import loader from '@/assets/icons/loader.svg'

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
      active: star <= comic.getComic.stars,
      disabled: star > comic.getComic.stars
    }
  }
  return {
    loader,
    comic,
    setStar,
    starClass
  }
}
