import { useHomeView } from '@/modules/comic/composables'
import { comicData } from '@tu/mocks/data'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from 'vue-composable-tester'
import { createTestingPinia } from '@pinia/testing'

beforeEach(() => {
  createTestingPinia({ stubActions: false, createSpy: vi.fn })
})

describe('tests composable useHomeView', async () => {
  vi.mock('@/db/indexedDB')
  vi.mock('@/modules/comic/services/comic', () => {
    const comic = vi.fn(() => comicData)

    return { comic }
  })

  test('should returns VueComponentInstances and PiniaStore', () => {
    const expectedObject = {
      loader: '/src/assets/icons/loader.svg',
      comic: expect.any(Object),
      HomeInfo: expect.any(Object),
      HomeActions: expect.any(Object)
    }

    const composable = mount(() => useHomeView())

    expect(composable.result).toEqual(expectedObject)
  })
})
