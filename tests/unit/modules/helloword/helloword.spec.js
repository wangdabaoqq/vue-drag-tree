// jest api https://jestjs.io/docs/zh-Hans/expect#expectvalue

import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@e/components/HelloWorld.vue'

describe('test: HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const message = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { message }
    })
    // 正则匹配toMatch
    expect(wrapper.text()).toMatch(message)
  })
})

describe('HelloWorld is a Vue instance', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(HelloWorld)
    // toBeTruthy 只判断是否为boolean true
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
