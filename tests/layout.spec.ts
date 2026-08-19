import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Panel } from '../src'

describe('layout components', () => {
  it('renders Panel with its requested semantic element and slot', () => {
    const wrapper = mount(Panel, {
      props: { as: 'article' },
      slots: { default: 'Panel content' },
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('g-panel')
    expect(wrapper.text()).toBe('Panel content')
  })
})
