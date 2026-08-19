import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'

import {
  DataGrid,
  DataList,
  DataTable,
  PropertyList,
  type DataTableCellSlotProps,
  type DataTableColumn,
  type DataTableHeaderSlotProps,
} from '../src'

const columns: DataTableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'count', label: 'Count', align: 'right' },
]

describe('data components', () => {
  it('renders every DataList item field', () => {
    const wrapper = mount(DataList, {
      props: {
        items: [
          {
            key: 'alpha',
            title: 'Alpha',
            supportingText: 'Supporting',
            meta: 'Online',
            trailing: 'Now',
          },
          { title: 'Beta' },
        ],
      },
    })

    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.text()).toContain('Supporting')
    expect(wrapper.text()).toContain('Online')
    expect(wrapper.text()).toContain('Now')
  })

  it('renders PropertyList as label-value pairs', () => {
    const wrapper = mount(PropertyList, {
      props: {
        items: [
          { label: 'Status', value: 'Ready' },
          { label: 'Owner', value: 'Team' },
        ],
      },
    })

    expect(wrapper.findAll('dt').map((item) => item.text())).toEqual(['Status', 'Owner'])
    expect(wrapper.findAll('dd').map((item) => item.text())).toEqual(['Ready', 'Team'])
  })

  it('renders DataTable row kinds and public slots', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns,
        rows: [
          { key: 'section', kind: 'section', label: 'Group A' },
          { key: 'alpha', name: 'Alpha', count: 2 },
          { key: 'total', kind: 'total', name: 'Total', count: 2 },
        ],
      },
      slots: {
        'header-name': ({ column }: DataTableHeaderSlotProps) =>
          h('strong', `Custom ${column.label}`),
        'cell-name': ({ text }: DataTableCellSlotProps) =>
          h('span', `Value ${text}`),
        section: ({ label }: { label: string }) =>
          h('span', `Section ${label}`),
      },
    })

    expect(wrapper.get('thead').text()).toContain('Custom Name')
    expect(wrapper.get('tbody').text()).toContain('Section Group A')
    expect(wrapper.get('tbody').text()).toContain('Value Alpha')
    expect(wrapper.find('.g-data-table__row--total').exists()).toBe(true)
    expect(wrapper.find('.g-data-table__cell--right').exists()).toBe(true)
  })

  it('sorts, filters, hides, and resizes DataGrid columns', async () => {
    const wrapper = mount(DataGrid, {
      props: {
        columns: [
          {
            key: 'name',
            label: 'Name',
            sortable: true,
            filterable: true,
          },
          {
            key: 'count',
            label: 'Count',
            width: '120px',
            minWidth: '80px',
            hideable: true,
            resizable: true,
          },
        ],
        rows: [
          { key: 'beta', name: 'Beta', count: 1 },
          { key: 'alpha', name: 'Alpha', count: 2 },
        ],
      },
    })

    const bodyRows = () => wrapper.findAll('tbody tr').map((row) => row.text())

    expect(bodyRows()).toEqual(['Beta1', 'Alpha2'])

    await wrapper.get('button[aria-label="Сменить сортировку по колонке Name"]').trigger('click')
    expect(wrapper.emitted('update:sort')?.[0]).toEqual([{ key: 'name', direction: 'asc' }])
    expect(bodyRows()).toEqual(['Alpha2', 'Beta1'])

    await wrapper.get('[role="separator"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:columnWidths')?.[0]).toEqual([{ count: '136px' }])

    await wrapper.get('.g-data-grid__filters input').setValue('alp')
    expect(wrapper.emitted('update:filters')?.at(-1)).toEqual([{ name: 'alp' }])
    expect(bodyRows()).toEqual(['Alpha2'])

    await wrapper
      .get('input[aria-label="Показать колонку Count"]')
      .setValue(false)
    expect(wrapper.emitted('update:hiddenColumnKeys')?.[0]).toEqual([['count']])
    expect(wrapper.findAll('thead th')).toHaveLength(1)
  })
})
