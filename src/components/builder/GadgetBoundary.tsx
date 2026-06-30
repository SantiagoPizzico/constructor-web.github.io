import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  name: string
  children: ReactNode
}

interface State {
  hasError: boolean
}

// Aísla el fallo de un gadget para que no se caiga toda la preview.
export default class GadgetBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error en gadget:', this.props.name, error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-6 py-8 text-center text-sm text-muted bg-surface2">
          No se pudo mostrar el componente «{this.props.name}».
        </div>
      )
    }
    return this.props.children
  }
}
