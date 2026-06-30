import { describe, expect, it } from 'vitest'
import { projectKind } from './kind'
import type { GadgetDefinition } from '../types'

const make = (id: string, isPanel: boolean): GadgetDefinition => ({
  meta: {
    id,
    category: isPanel ? 'analisis' : 'oferta',
    name: id,
    description: '',
    fitsBusiness: 'all',
    tier: isPanel ? 'panel' : 'base',
    isPanel,
  },
  Component: () => null,
  defaultContent: () => ({}),
})

describe('projectKind', () => {
  it('solo componentes de web', () => {
    expect(projectKind([make('a', false), make('b', false)])).toBe('web')
  })
  it('solo componentes de panel', () => {
    expect(projectKind([make('a', true)])).toBe('panel')
  })
  it('web + panel = mixto', () => {
    expect(projectKind([make('a', false), make('b', true)])).toBe('mixto')
  })
  it('sin componentes cae en web', () => {
    expect(projectKind([])).toBe('web')
  })
})
