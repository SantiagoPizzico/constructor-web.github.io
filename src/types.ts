import type { FC } from 'react'

export type BusinessType =
  | 'gimnasio'
  | 'restaurante'
  | 'comercio'
  | 'salud'
  | 'estetica'
  | 'servicios'
  | 'inmobiliaria'
  | 'portfolio'

export type Category =
  | 'navegacion'
  | 'hero'
  | 'oferta'
  | 'prueba-social'
  | 'conversion'
  | 'funcional'
  | 'analisis'

export type Tier = 'base' | 'pro' | 'tienda' | 'panel'
export type ProjectKind = 'web' | 'panel' | 'mixto'
export type Device = 'desktop' | 'mobile'

export interface StyleTokens {
  bg: string
  surface: string
  surface2: string
  text: string
  muted: string
  border: string
  brand: string
  brandInk: string
  accent: string
  fontHeading: string
  fontBody: string
  radius: number
}

export interface StylePreset {
  id: string
  name: string
  description: string
  fits: string
  tokens: StyleTokens
}

export interface GadgetMeta {
  id: string
  category: Category
  name: string
  description: string
  fitsBusiness: BusinessType[] | 'all'
  tier: Tier
  isPanel?: boolean
  variants?: { id: string; name: string }[]
}

export interface GadgetProps<TContent = unknown> {
  business: BusinessType
  content: TContent
  variant?: string
}

export interface GadgetDefinition<TContent = unknown> {
  meta: GadgetMeta
  Component: FC<GadgetProps<TContent>>
  defaultContent: (b: BusinessType) => TContent
}

export interface Project {
  business: BusinessType
  styleId: string
  order: string[]
  device: Device
}
