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

  // Los consumidores pasan flechas inline (ver Gallery), así que el modal recibe
  // callbacks con identidad nueva en cada render del padre. Eso no debe reiniciar
  // el efecto ni moverle el foco al usuario.
  it('un re-render del padre no le roba el foco al usuario', () => {
    const imgs = [{}, {}, {}]
    const { rerender } = render(
      <Lightbox images={imgs} index={1} onClose={() => {}} onIndex={() => {}} />,
    )
    expect(document.activeElement).toBe(screen.getByLabelText('Cerrar'))

    const siguiente = screen.getByLabelText('Siguiente')
    siguiente.focus()

    rerender(<Lightbox images={imgs} index={1} onClose={() => {}} onIndex={() => {}} />)
    expect(document.activeElement).toBe(screen.getByLabelText('Siguiente'))
  })

  it('al cerrar devuelve el foco a quien lo abrió', () => {
    const disparador = document.createElement('button')
    document.body.appendChild(disparador)
    disparador.focus()

    const { rerender } = render(<Lightbox images={[{}]} index={0} onClose={() => {}} />)
    expect(document.activeElement).toBe(screen.getByLabelText('Cerrar'))

    rerender(<Lightbox images={[{}]} index={null} onClose={() => {}} />)
    expect(document.activeElement).toBe(disparador)
    disparador.remove()
  })
})
