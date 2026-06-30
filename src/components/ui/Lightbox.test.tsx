import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Lightbox } from './Lightbox'

describe('Lightbox', () => {
  it('no renderiza nada cuando index es null', () => {
    render(<Lightbox images={[{}]} index={null} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('abre (portal) y cierra con el botón', () => {
    const onClose = vi.fn()
    render(<Lightbox images={[{}, {}]} index={0} onClose={onClose} onIndex={() => {}} />)
    expect(screen.queryByRole('dialog')).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Cerrar'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('cierra con Escape', () => {
    const onClose = vi.fn()
    render(<Lightbox images={[{}]} index={0} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
