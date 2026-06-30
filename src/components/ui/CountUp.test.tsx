import { describe, expect, it } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { CountUp } from './CountUp'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false
    },
  })) as unknown as typeof window.matchMedia
}

describe('CountUp', () => {
  it('con reduced-motion muestra el valor final formateado', async () => {
    mockMatchMedia(true)
    const { container } = render(<CountUp value={4.9} decimals={1} suffix="★" />)
    await waitFor(() => expect(container.textContent).toBe('4.9★'))
  })

  it('respeta prefijo y decimales', async () => {
    mockMatchMedia(true)
    const { container } = render(<CountUp value={500} prefix="+" />)
    await waitFor(() => expect(container.textContent).toBe('+500'))
  })
})
