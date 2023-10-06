import type { ResponseComicAdapter } from '../../services'

export interface State {
  isLoading: boolean
  comic: ResponseComicAdapter
  page: number
}
