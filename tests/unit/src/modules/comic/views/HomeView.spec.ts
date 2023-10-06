import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeView from '@/modules/comic/views/HomeView.vue'
import { useHomeView } from '@/modules/comic/composables'
import { dataComponent } from '@tu/mocks/data'

describe('component HomeView.vue', () => {
  vi.mock('@/modules/comic/composables/useHomeView', () => {
    const useHomeView = vi.fn(() => dataComponent)

    return { useHomeView }
  })

  test('to match snapshot', () => {
    const wrapper = shallowMount(HomeView)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should show loader if loading status is true', () => {
    const wrapper = shallowMount(HomeView)
    expect(wrapper.find('img').attributes()).toEqual({
      alt: 'loading...',
      src: '/src/assets/icons/loader.svg',
      width: '180'
    })
  })

  test('should show comic if loading status is false', () => {
    const data = { ...dataComponent, comic: { getIsLoading: false } as any }

    vi.mocked(useHomeView).mockReturnValue(data)

    const wrapper = shallowMount(HomeView)

    const sectionHome = wrapper.find('.home-section')
    const homeInfo = wrapper.find('home-info-stub')
    const homeActions = wrapper.find('home-actions-stub')

    expect(sectionHome.exists()).toBeTruthy()
    expect(homeInfo.exists()).toBeTruthy()
    expect(homeActions.exists()).toBeTruthy()
  })
})
