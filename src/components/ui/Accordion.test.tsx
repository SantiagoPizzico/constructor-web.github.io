import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('abre/cierra y mantiene uno solo abierto', () => {
    const { getByText } = render(
      <Accordion
        items={[
          { title: 'Pregunta 1', content: 'Respuesta 1' },
          { title: 'Pregunta 2', content: 'Respuesta 2' },
        ]}
      />,
    )
    const b1 = getByText('Pregunta 1').closest('button') as HTMLButtonElement
    const b2 = getByText('Pregunta 2').closest('button') as HTMLButtonElement

    // defaultOpen = 0 → la primera abierta
    expect(b1.getAttribute('aria-expanded')).toBe('true')
    expect(b2.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(b2)
    expect(b2.getAttribute('aria-expanded')).toBe('true')
    expect(b1.getAttribute('aria-expanded')).toBe('false') // single: la otra se cierra

    fireEvent.click(b2)
    expect(b2.getAttribute('aria-expanded')).toBe('false') // se puede cerrar
  })
})
