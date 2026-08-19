import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'

import { BaseDialog, ConfirmDialog, FormDialog } from '../src'

function getButton(label: string) {
  const button = [...document.body.querySelectorAll('button')]
    .find((candidate) => candidate.textContent?.trim() === label)

  if (!button) {
    throw new Error(`Button "${label}" was not found`)
  }

  return button as HTMLButtonElement
}

describe('feedback components', () => {
  it('opens and closes BaseDialog through its public events', async () => {
    const wrapper = mount(BaseDialog, {
      props: { modelValue: false, title: 'Details' },
      slots: {
        default: '<p>Dialog body</p>',
        footer: '<button type="button">Footer action</button>',
      },
    })

    expect(document.body.querySelector('[role="dialog"]')).toBeNull()

    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const dialog = document.body.querySelector('[role="dialog"]')
    const closeButton = document.body.querySelector<HTMLButtonElement>(
      'button[aria-label="Close dialog"]',
    )

    expect(dialog?.textContent).toContain('Details')
    expect(dialog?.textContent).toContain('Dialog body')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.activeElement).toBe(closeButton)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('close')?.[0]).toEqual(['escape'])

    closeButton?.click()
    expect(wrapper.emitted('close')?.[1]).toEqual(['close-button'])
    expect(wrapper.emitted('update:modelValue')).toEqual([[false], [false]])

    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    expect(document.body.style.overflow).toBe('')

    wrapper.unmount()
  })

  it('emits confirm and cancel from ConfirmDialog', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        modelValue: true,
        title: 'Delete item',
        description: 'This cannot be undone',
      },
    })
    await nextTick()

    expect(document.body.textContent).toContain('This cannot be undone')

    getButton('Confirm').click()
    getButton('Cancel').click()
    await nextTick()

    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false], [false]])

    await wrapper.setProps({ confirmDisabled: true, cancelDisabled: true })
    expect(getButton('Confirm').disabled).toBe(true)
    expect(getButton('Cancel').disabled).toBe(true)

    wrapper.unmount()
  })

  it('submits and cancels FormDialog while respecting submitting state', async () => {
    const wrapper = mount(FormDialog, {
      props: {
        modelValue: true,
        title: 'Edit item',
        description: 'Change the fields',
        formId: 'edit-item-form',
      },
      slots: { default: '<input name="name" value="Graphene">' },
    })
    await nextTick()

    const form = document.body.querySelector<HTMLFormElement>('#edit-item-form')
    expect(form).not.toBeNull()
    expect(getButton('Save').getAttribute('form')).toBe('edit-item-form')

    form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }))
    await nextTick()
    expect(wrapper.emitted('submit')).toHaveLength(1)

    getButton('Cancel').click()
    await nextTick()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

    await wrapper.setProps({ submitting: true })
    expect(form?.getAttribute('aria-busy')).toBe('true')
    expect(getButton('Save').disabled).toBe(true)
    expect(getButton('Cancel').disabled).toBe(true)

    wrapper.unmount()
  })
})
