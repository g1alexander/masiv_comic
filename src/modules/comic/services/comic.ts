import { xkcdApi } from '@/api/xkcdApi'
import type { Comic, ResponseComicAdapter } from '.'
import { comicAdapter } from '../helpers/comicAdapter'

export async function comic(page: number): Promise<ResponseComicAdapter> {
  try {
    const { data } = await xkcdApi().get<Comic>(`/comic?num=${page}`)

    const response = comicAdapter(data)

    return response
  } catch (error) {
    return {
      alt: '',
      img: '',
      num: 0,
      title: '',
      transcript: '',
      stars: 0
    }
  }
}
