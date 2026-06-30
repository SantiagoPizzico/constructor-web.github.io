import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { gadgets } from '../../registry'
import { BUSINESSES } from '../../data/business'

afterEach(cleanup)

// Smoke test: cada gadget debe renderizar con el contenido demo de cada rubro
// sin lanzar excepciones (cubre el riesgo "un componente nuevo rompe otro").
describe('los gadgets renderizan sin romperse', () => {
  for (const g of gadgets) {
    for (const b of BUSINESSES) {
      it(`${g.meta.id} @ ${b.id}`, () => {
        const { container } = render(<g.Component business={b.id} content={g.defaultContent(b.id)} />)
        expect(container).toBeTruthy()
      })
    }
  }
})
