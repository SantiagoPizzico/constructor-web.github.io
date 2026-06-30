import type { GadgetDefinition, ProjectKind } from '../types'

// Deriva qué se está armando a partir de los componentes activos.
export function projectKind(defs: GadgetDefinition[]): ProjectKind {
  const hasPanel = defs.some((d) => d.meta.isPanel)
  const hasWeb = defs.some((d) => !d.meta.isPanel)
  if (hasPanel && hasWeb) return 'mixto'
  if (hasPanel) return 'panel'
  return 'web'
}

export const kindLabel: Record<ProjectKind, string> = {
  web: 'una web',
  panel: 'un panel de datos',
  mixto: 'una web + panel',
}
