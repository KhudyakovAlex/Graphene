import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Panel, Surface } from '../src'

describe('layout components', () => {
  it('renders Surface with its requested semantic element and slot', () => {
    const wrapper = mount(Surface, {
      props: { as: 'article' },
      slots: { default: 'Surface content' },
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('g-surface')
    expect(wrapper.text()).toBe('Surface content')
  })

  it('keeps Panel as a deprecated alias of Surface', () => {
    const wrapper = mount(Panel, {
      props: { as: 'aside' },
      attrs: { class: 'legacy-panel' },
      slots: { default: 'Legacy panel content' },
    })

    expect(wrapper.element.tagName).toBe('ASIDE')
    expect(wrapper.classes()).toContain('g-surface')
    expect(wrapper.classes()).toContain('legacy-panel')
    expect(wrapper.text()).toBe('Legacy panel content')
  })
})
