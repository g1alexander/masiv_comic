import { defineAsyncComponent, onMounted } from 'vue'
import { useComicStore } from '../store'
import loader from '@/assets/icons/loader.svg'

export function useHomeView() {
  const comic = useComicStore()

  onMounted(async () => {
    await comic.setComic()
  })

  return {
    loader,
    comic,
    HomeInfo: defineAsyncComponent(() => import('../components/HomeInfo.vue')),
    HomeActions: defineAsyncComponent(() => import('../components/HomeActions.vue'))
  }
}
