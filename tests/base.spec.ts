import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import {
  BaseButton,
  BaseCheckbox,
  BaseInput,
  BaseLink,
  BaseRadio,
  BaseSelect,
  BaseSlider,
  BaseSwitch,
  BaseTextarea,
} from '../src'

describe('base components', () => {
  it('renders BaseButton props and emits clicks unless disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'primary', size: 'lg', type: 'submit' },
      slots: { default: 'Save' },
    })

    const button = wrapper.get('button')
    expect(button.text()).toBe('Save')
    expect(button.classes()).toContain('g-base-button--primary')
    expect(button.attributes('type')).toBe('submit')

    await button.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    await wrapper.setProps({ disabled: true })
    button.element.click()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('updates BaseCheckbox and blocks its disabled state', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: { ariaLabel: 'Enabled option' },
    })
    const input = wrapper.get('input')

    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.setProps({ disabled: true })
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('renders and updates BaseInput public content', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Name',
        helperText: 'Required',
        invalid: true,
        placeholder: 'Enter name',
      },
      slots: { trailing: '<span data-test="trailing">icon</span>' },
    })
    const input = wrapper.get('input')

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Required')
    expect(wrapper.get('[data-test="trailing"]').text()).toBe('icon')
    expect(input.attributes('aria-invalid')).toBe('true')

    await input.setValue('Graphene')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Graphene'])
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.setProps({ disabled: true, readonly: true })
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('uses safe links and a non-interactive disabled BaseLink', async () => {
    const wrapper = mount(BaseLink, {
      props: { href: '/docs', target: '_blank' },
      slots: { default: 'Docs' },
    })

    const link = wrapper.get('a')
    expect(link.attributes()).toMatchObject({
      href: '/docs',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    await link.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.get('[role="link"]').attributes('aria-disabled')).toBe('true')
    await wrapper.get('[role="link"]').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('updates BaseRadio with its public value', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        modelValue: 'first',
        value: 'second',
        name: 'choice',
        ariaLabel: 'Second choice',
      },
    })
    const input = wrapper.get('input')

    expect((input.element as HTMLInputElement).checked).toBe(false)
    await input.setValue()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['second'])
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.setProps({ disabled: true })
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('selects and clears BaseSelect values', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: 'first',
        clearable: true,
        label: 'Choice',
        options: [
          { value: 'first', label: 'First' },
          { value: 'second', label: 'Second' },
        ],
      },
    })
    const select = wrapper.get('select')

    await select.setValue('second')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['second'])
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.get('button[aria-label="Clear selected value"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)

    await wrapper.setProps({ loading: true })
    expect(select.attributes('disabled')).toBeDefined()
    expect(select.attributes('aria-busy')).toBe('true')
  })

  it('updates BaseSlider as a number', async () => {
    const wrapper = mount(BaseSlider, {
      props: { min: 0, max: 10, step: 2, ariaLabel: 'Volume' },
    })
    const input = wrapper.get('input')

    await input.setValue('4')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.setProps({ disabled: true })
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('updates BaseSwitch and reflects its checked state', async () => {
    const wrapper = mount(BaseSwitch, {
      props: { ariaLabel: 'Power' },
    })
    const input = wrapper.get('input')

    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.setProps({ modelValue: true, disabled: true })
    expect(wrapper.classes()).toContain('g-base-switch--checked')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('renders and updates BaseTextarea', async () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        label: 'Comment',
        helperText: 'Optional',
        rows: 6,
        invalid: true,
      },
    })
    const textarea = wrapper.get('textarea')

    expect(textarea.attributes('rows')).toBe('6')
    expect(textarea.attributes('aria-invalid')).toBe('true')
    await textarea.setValue('Updated')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Updated'])
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)

    await wrapper.setProps({ disabled: true, readonly: true })
    expect(textarea.attributes('disabled')).toBeDefined()
    expect(textarea.attributes('readonly')).toBeDefined()
  })
})
