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

  it('forwards BaseCheckbox attrs to the inner input and preserves root class/style', () => {
    const wrapper = mount(BaseCheckbox, {
      attrs: {
        name: 'accept',
        value: 'yes',
        form: 'profile-form',
        required: '',
        'aria-describedby': 'accept-help',
        'data-test': 'accept-checkbox',
        class: 'consumer-checkbox',
        style: 'margin-right: 4px',
      },
    })

    const label = wrapper.get('label')
    const input = wrapper.get('input')

    expect(label.classes()).toContain('consumer-checkbox')
    expect(label.attributes('style')).toContain('margin-right: 4px')
    expect(input.classes()).not.toContain('consumer-checkbox')
    expect(input.attributes()).toMatchObject({
      name: 'accept',
      value: 'yes',
      form: 'profile-form',
      'aria-describedby': 'accept-help',
      'data-test': 'accept-checkbox',
    })
    expect(input.attributes('required')).toBeDefined()
    expect(label.attributes('name')).toBeUndefined()
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

  it('forwards BaseInput attrs to the inner input and preserves root class/style', () => {
    const wrapper = mount(BaseInput, {
      attrs: {
        autocomplete: 'email',
        maxlength: '64',
        minlength: '2',
        pattern: '[A-Za-z]+',
        inputmode: 'email',
        spellcheck: 'false',
        autocapitalize: 'off',
        name: 'email',
        'aria-describedby': 'email-help',
        'data-test': 'email-input',
        class: 'consumer-input',
        style: 'margin-top: 1px',
      },
    })

    const label = wrapper.get('label')
    const input = wrapper.get('input')

    expect(label.classes()).toContain('consumer-input')
    expect(label.attributes('style')).toContain('margin-top: 1px')
    expect(input.classes()).not.toContain('consumer-input')
    expect(input.attributes()).toMatchObject({
      autocomplete: 'email',
      maxlength: '64',
      minlength: '2',
      pattern: '[A-Za-z]+',
      inputmode: 'email',
      spellcheck: 'false',
      autocapitalize: 'off',
      name: 'email',
      'aria-describedby': 'email-help',
      'data-test': 'email-input',
    })
    expect(label.attributes('autocomplete')).toBeUndefined()
    expect(label.attributes('name')).toBeUndefined()
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

  it('forwards BaseRadio attrs to the inner input and preserves root class/style', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        value: 'second',
        ariaLabel: 'Second choice',
      },
      attrs: {
        form: 'choice-form',
        required: '',
        autofocus: '',
        'aria-describedby': 'choice-help',
        'data-test': 'choice-radio',
        class: 'consumer-radio',
        style: 'margin-top: 2px',
      },
    })

    const label = wrapper.get('label')
    const input = wrapper.get('input')

    expect(label.classes()).toContain('consumer-radio')
    expect(label.attributes('style')).toContain('margin-top: 2px')
    expect(input.classes()).not.toContain('consumer-radio')
    expect(input.attributes()).toMatchObject({
      form: 'choice-form',
      'aria-describedby': 'choice-help',
      'data-test': 'choice-radio',
    })
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('autofocus')).toBeDefined()
    expect(label.attributes('form')).toBeUndefined()
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

  it('forwards BaseSelect attrs to the inner select and preserves root class/style', () => {
    const wrapper = mount(BaseSelect, {
      attrs: {
        autocomplete: 'off',
        name: 'status',
        form: 'filters-form',
        required: '',
        'aria-describedby': 'status-help',
        'data-test': 'status-select',
        class: 'consumer-select',
        style: 'margin-bottom: 2px',
      },
    })

    const label = wrapper.get('label')
    const select = wrapper.get('select')

    expect(label.classes()).toContain('consumer-select')
    expect(label.attributes('style')).toContain('margin-bottom: 2px')
    expect(select.classes()).not.toContain('consumer-select')
    expect(select.attributes()).toMatchObject({
      autocomplete: 'off',
      name: 'status',
      form: 'filters-form',
      'aria-describedby': 'status-help',
      'data-test': 'status-select',
    })
    expect(select.attributes('required')).toBeDefined()
    expect(label.attributes('name')).toBeUndefined()
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

  it('forwards BaseSlider attrs to the inner input and preserves root class/style', () => {
    const wrapper = mount(BaseSlider, {
      attrs: {
        name: 'volume',
        form: 'audio-form',
        list: 'volume-marks',
        'aria-describedby': 'volume-help',
        'data-test': 'volume-slider',
        class: 'consumer-slider',
        style: 'margin-bottom: 6px',
      },
    })

    const root = wrapper.get('span')
    const input = wrapper.get('input')

    expect(root.classes()).toContain('consumer-slider')
    expect(root.attributes('style')).toContain('margin-bottom: 6px')
    expect(input.classes()).not.toContain('consumer-slider')
    expect(input.attributes()).toMatchObject({
      name: 'volume',
      form: 'audio-form',
      list: 'volume-marks',
      'aria-describedby': 'volume-help',
      'data-test': 'volume-slider',
    })
    expect(root.attributes('name')).toBeUndefined()
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

  it('forwards BaseSwitch attrs to the inner input and preserves root class/style', () => {
    const wrapper = mount(BaseSwitch, {
      attrs: {
        name: 'power',
        value: 'on',
        form: 'settings-form',
        required: '',
        'aria-describedby': 'power-help',
        'data-test': 'power-switch',
        class: 'consumer-switch',
        style: 'margin-left: 5px',
      },
    })

    const label = wrapper.get('label')
    const input = wrapper.get('input')

    expect(label.classes()).toContain('consumer-switch')
    expect(label.attributes('style')).toContain('margin-left: 5px')
    expect(input.classes()).not.toContain('consumer-switch')
    expect(input.attributes()).toMatchObject({
      name: 'power',
      value: 'on',
      form: 'settings-form',
      'aria-describedby': 'power-help',
      'data-test': 'power-switch',
    })
    expect(input.attributes('required')).toBeDefined()
    expect(label.attributes('name')).toBeUndefined()
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

  it('forwards BaseTextarea attrs to the inner textarea and preserves root class/style', () => {
    const wrapper = mount(BaseTextarea, {
      attrs: {
        maxlength: '500',
        minlength: '10',
        spellcheck: 'false',
        autocapitalize: 'sentences',
        name: 'comment',
        'aria-describedby': 'comment-help',
        'data-test': 'comment-textarea',
        class: 'consumer-textarea',
        style: 'margin-left: 3px',
      },
    })

    const label = wrapper.get('label')
    const textarea = wrapper.get('textarea')

    expect(label.classes()).toContain('consumer-textarea')
    expect(label.attributes('style')).toContain('margin-left: 3px')
    expect(textarea.classes()).not.toContain('consumer-textarea')
    expect(textarea.attributes()).toMatchObject({
      maxlength: '500',
      minlength: '10',
      spellcheck: 'false',
      autocapitalize: 'sentences',
      name: 'comment',
      'aria-describedby': 'comment-help',
      'data-test': 'comment-textarea',
    })
    expect(label.attributes('maxlength')).toBeUndefined()
    expect(label.attributes('name')).toBeUndefined()
  })
})
