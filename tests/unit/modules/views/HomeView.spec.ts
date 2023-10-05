import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeView from '@/modules/comic/views/HomeView.vue'

describe('component ExtraFormView.vue', () => {
  const wrapper = shallowMount(HomeView)

  test('to match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
