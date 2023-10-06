import { comic } from '@/modules/comic/services'
import { comicData } from '@tu/mocks/data'
import { describe, expect, test, vi } from 'vitest'

describe('service comic', () => {
  vi.mock('@/modules/comic/services/comic', () => {
    const comic = vi.fn(() => comicData)

    return { comic }
  })

  test('should return equal data with data', async () => {
    const response = await comic(1)

    expect(response).toEqual(comicData)
  })

  test('should return equal data with empty data', async () => {
    const data = {
      alt: '',
      img: '',
      num: 0,
      title: '',
      transcript: '',
      stars: 0
    }
    vi.mocked(comic).mockReturnValue(Promise.resolve(data))

    const response = await comic(2)

    expect(response).toEqual(data)
  })
})
