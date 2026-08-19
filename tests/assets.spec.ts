import { describe, expect, it } from 'vitest'

import mainIconUrl from '@graphene/core/icons/search.svg?url'
import reserveIconUrl from '@graphene/core/icons/others/arrow-down.svg?url'

describe('public icon assets', () => {
  it('resolves main and reserve SVG files as URLs', () => {
    expect(mainIconUrl).toEqual(expect.any(String))
    expect(reserveIconUrl).toEqual(expect.any(String))
    expect(mainIconUrl).not.toBe(reserveIconUrl)
  })
})
