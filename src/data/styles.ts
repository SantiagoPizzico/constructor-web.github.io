import type { StylePreset } from '../types'

export const STYLES: StylePreset[] = [
  {
    id: 'moderno',
    name: 'Moderno',
    description: 'Limpio, profesional y versátil.',
    fits: 'Comercio, servicios, startups',
    tokens: {
      bg: '#f5f7fa', surface: '#ffffff', surface2: '#eef1f6',
      text: '#0f172a', muted: '#64748b', border: 'rgba(15,23,42,0.10)',
      brand: '#2563eb', brandInk: '#ffffff', accent: '#10b981',
      fontHeading: "'Poppins', sans-serif", fontBody: "'Inter', sans-serif", radius: 12,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal / Fino',
    description: 'Mucho aire, refinado y sobrio.',
    fits: 'Portfolio, estética, profesionales',
    tokens: {
      bg: '#ffffff', surface: '#ffffff', surface2: '#f6f6f4',
      text: '#18181b', muted: '#6f6f6a', border: 'rgba(0,0,0,0.08)',
      brand: '#111111', brandInk: '#ffffff', accent: '#2563eb',
      fontHeading: "'Jost', sans-serif", fontBody: "'Inter', sans-serif", radius: 3,
    },
  },
  {
    id: 'oriental',
    name: 'Oriental',
    description: 'Calmo, con espacio (ma) y aire editorial.',
    fits: 'Gastronomía, estética, salud',
    tokens: {
      bg: '#efe9dd', surface: '#f7f2e8', surface2: '#e7dfcf',
      text: '#1c1a17', muted: '#6f6657', border: 'rgba(28,26,23,0.14)',
      brand: '#b23a2e', brandInk: '#faf6ee', accent: '#4f7942',
      fontHeading: "'Shippori Mincho', serif", fontBody: "'Noto Sans JP', sans-serif", radius: 2,
    },
  },
  {
    id: 'oscuro',
    name: 'Oscuro',
    description: 'Elegante y nocturno, acento que resalta.',
    fits: 'Tecnología, gimnasio, eventos',
    tokens: {
      bg: '#0f1115', surface: '#181b22', surface2: '#21262f',
      text: '#e8eaed', muted: '#9aa3af', border: 'rgba(255,255,255,0.12)',
      brand: '#8b7bff', brandInk: '#0b0e14', accent: '#22d3ee',
      fontHeading: "'Space Grotesk', sans-serif", fontBody: "'Inter', sans-serif", radius: 10,
    },
  },
  {
    id: 'tecnologico',
    name: 'Tecnológico',
    description: 'Futurista, fondo profundo y acento neón.',
    fits: 'Tech, comercio, startups',
    tokens: {
      bg: '#07090e', surface: '#0d1219', surface2: '#121a24',
      text: '#d7e3f0', muted: '#7388a0', border: 'rgba(80,200,255,0.16)',
      brand: '#19e3c8', brandInk: '#05221d', accent: '#a855f7',
      fontHeading: "'Orbitron', sans-serif", fontBody: "'Space Grotesk', sans-serif", radius: 4,
    },
  },
  {
    id: 'calido',
    name: 'Cálido / Orgánico',
    description: 'Terroso, humano y redondeado.',
    fits: 'Gastronomía, estética, salud',
    tokens: {
      bg: '#fbf5ee', surface: '#fffdf9', surface2: '#f1e7d9',
      text: '#3b2f27', muted: '#79665a', border: 'rgba(59,47,39,0.10)',
      brand: '#b0532e', brandInk: '#fff8f2', accent: '#d9a441',
      fontHeading: "'Fraunces', serif", fontBody: "'Nunito Sans', sans-serif", radius: 18,
    },
  },
  {
    id: 'elegante',
    name: 'Elegante / Editorial',
    description: 'Lujo, alto contraste y serif de carácter.',
    fits: 'Inmobiliaria, alta gastronomía, eventos',
    tokens: {
      bg: '#ffffff', surface: '#ffffff', surface2: '#f6f3ee',
      text: '#1a1613', muted: '#7c7065', border: 'rgba(26,22,19,0.12)',
      brand: '#16110d', brandInk: '#f3ead9', accent: '#b08a4f',
      fontHeading: "'Playfair Display', serif", fontBody: "'Lato', sans-serif", radius: 0,
    },
  },
  {
    id: 'vibrante',
    name: 'Vibrante / Bold',
    description: 'Energía e impacto, tipografía protagonista.',
    fits: 'Gimnasio, deportes, eventos',
    tokens: {
      bg: '#fffdf7', surface: '#ffffff', surface2: '#fff0ea',
      text: '#15120f', muted: '#6f6b66', border: 'rgba(0,0,0,0.10)',
      brand: '#ff4d2e', brandInk: '#1a0f08', accent: '#ffd23f',
      fontHeading: "'Anton', sans-serif", fontBody: "'Inter', sans-serif", radius: 14,
    },
  },
  {
    id: 'moderno-oscuro',
    name: 'Moderno Oscuro',
    description: 'Versión nocturna del Moderno, azul que resalta.',
    fits: 'Comercio, tech, startups (modo noche)',
    tokens: {
      bg: '#0d1117', surface: '#161b22', surface2: '#20262e',
      text: '#e6edf3', muted: '#8b97a5', border: 'rgba(255,255,255,0.12)',
      brand: '#4d8dff', brandInk: '#06122b', accent: '#34d399',
      fontHeading: "'Poppins', sans-serif", fontBody: "'Inter', sans-serif", radius: 12,
    },
  },
  {
    id: 'minimal-oscuro',
    name: 'Minimal Oscuro',
    description: 'Minimalismo en negro, acento casi blanco.',
    fits: 'Portfolio, moda, lujo minimalista',
    tokens: {
      bg: '#0a0a0a', surface: '#111111', surface2: '#1a1a1a',
      text: '#f2f2f2', muted: '#9a9a9a', border: 'rgba(255,255,255,0.10)',
      brand: '#f2f2f2', brandInk: '#0a0a0a', accent: '#f43f5e',
      fontHeading: "'Jost', sans-serif", fontBody: "'Inter', sans-serif", radius: 3,
    },
  },
  {
    id: 'oriental-oscuro',
    name: 'Oriental Oscuro',
    description: 'Tinta sumi de noche, bermellón encendido.',
    fits: 'Gastronomía, estética, lujo (modo noche)',
    tokens: {
      bg: '#14110d', surface: '#1c1814', surface2: '#241f19',
      text: '#ece3d4', muted: '#a99a82', border: 'rgba(236,227,212,0.14)',
      brand: '#e0533f', brandInk: '#1a0f0a', accent: '#7faa6b',
      fontHeading: "'Shippori Mincho', serif", fontBody: "'Noto Sans JP', sans-serif", radius: 2,
    },
  },
  {
    id: 'elegante-oscuro',
    name: 'Elegante Oscuro',
    description: 'Negro y oro, lujo de alta gama.',
    fits: 'Inmobiliaria, alta gastronomía, joyería (modo noche)',
    tokens: {
      bg: '#0f0d0b', surface: '#17140f', surface2: '#211c15',
      text: '#f0e9dd', muted: '#b3a892', border: 'rgba(240,233,221,0.14)',
      brand: '#c9a35a', brandInk: '#1a1408', accent: '#6f9e8f',
      fontHeading: "'Playfair Display', serif", fontBody: "'Lato', sans-serif", radius: 0,
    },
  },
]

export const DEFAULT_STYLE_ID = 'moderno'

export const getStyle = (id: string): StylePreset =>
  STYLES.find((s) => s.id === id) ?? STYLES[0]
