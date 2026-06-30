import type { BusinessType } from '../types'

export interface BusinessInfo {
  id: BusinessType
  label: string
  brand: string
}

export const BUSINESSES: BusinessInfo[] = [
  { id: 'gimnasio', label: 'Gimnasio / Fitness', brand: 'Iron Gym' },
  { id: 'restaurante', label: 'Restaurante / Café', brand: 'La Trattoria' },
  { id: 'comercio', label: 'Comercio / Tienda', brand: 'Mi Tienda' },
  { id: 'salud', label: 'Salud / Clínica', brand: 'Centro Salud' },
  { id: 'estetica', label: 'Estética / Spa', brand: 'Bella Spa' },
  { id: 'servicios', label: 'Servicios profesionales', brand: 'Estudio Pro' },
  { id: 'inmobiliaria', label: 'Inmobiliaria', brand: 'Inmo Plus' },
  { id: 'portfolio', label: 'Portfolio', brand: 'Mi Portfolio' },
]

export const brandName = (b: BusinessType): string =>
  BUSINESSES.find((x) => x.id === b)?.brand ?? 'Mi negocio'

export const businessLabel = (b: BusinessType): string =>
  BUSINESSES.find((x) => x.id === b)?.label ?? b
