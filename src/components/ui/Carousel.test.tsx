import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Carousel } from './Carousel'

describe('Carousel', () => {
  it('renderiza los slides y los controles de navegación', () => {
    const { getByText, getByLabelText } = render(
      <Carousel autoPlay={false}>
        <div>Slide A</div>
        <div>Slide B</div>
      </Carousel>,
    )
    expect(getByText('Slide A')).toBeTruthy()
    expect(getByText('Slide B')).toBeTruthy()
    expect(getByLabelText('Anterior')).toBeTruthy()
    expect(getByLabelText('Siguiente')).toBeTruthy()
  })
})
